import { getSql } from "@/lib/db";
import { ensureCatalogSeeded } from "./seed";
import type { Filiere, Profile, Role, SubStatus, Plan } from "@/lib/types";

export async function requireAdmin(userId: string) {
  const sql = await getSql();
  const rows = await sql<{ role: string }>`select role from profiles where user_id = ${userId}`;
  if (rows[0]?.role !== "admin") {
    throw new Error("Accès réservé à l’administration");
  }
}

export function mapFiliere(row: {
  id: number;
  slug: string;
  name: string;
  short_name: string;
  description: string;
}): Filiere {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    description: row.description,
  };
}

export async function getOrCreateProfile(
  userId: string,
  meta: { displayName: string | null; email: string | null },
): Promise<Profile> {
  await ensureCatalogSeeded();
  const sql = await getSql();
  const existing = await sql<{
    user_id: string;
    role: Role;
    display_name: string | null;
    email: string | null;
    filiere_id: number | null;
    niveau: number | null;
    semestre: number | null;
  }>`select user_id, role, display_name, email, filiere_id, niveau, semestre from profiles where user_id = ${userId}`;

  if (!existing[0]) {
    await sql`
      insert into profiles (user_id, role, display_name, email)
      values (${userId}, 'student', ${meta.displayName}, ${meta.email})
    `;
  } else {
    await sql`
      update profiles
      set display_name = coalesce(display_name, ${meta.displayName}),
          email = coalesce(email, ${meta.email}),
          updated_at = now()
      where user_id = ${userId}
    `;
  }

  const rows = await sql<{
    user_id: string;
    role: Role;
    display_name: string | null;
    email: string | null;
    filiere_id: number | null;
    niveau: number | null;
    semestre: number | null;
    f_id: number | null;
    f_slug: string | null;
    f_name: string | null;
    f_short: string | null;
    f_desc: string | null;
  }>`
    select p.user_id, p.role, p.display_name, p.email, p.filiere_id, p.niveau, p.semestre,
           f.id as f_id, f.slug as f_slug, f.name as f_name, f.short_name as f_short, f.description as f_desc
    from profiles p
    left join filieres f on f.id = p.filiere_id
    where p.user_id = ${userId}
  `;
  const r = rows[0];
  if (!r) throw new Error("Profil introuvable");
  return {
    userId: r.user_id,
    role: r.role,
    displayName: r.display_name,
    email: r.email,
    filiereId: r.filiere_id,
    niveau: r.niveau,
    semestre: r.semestre,
    filiere: r.f_id
      ? {
          id: r.f_id,
          slug: r.f_slug ?? "",
          name: r.f_name ?? "",
          shortName: r.f_short ?? "",
          description: r.f_desc ?? "",
        }
      : null,
  };
}

export async function getActiveSubscription(userId: string) {
  const sql = await getSql();
  await sql`
    update subscriptions
    set status = 'expired'
    where user_id = ${userId} and status = 'active' and expires_at is not null and expires_at < now()
  `;
  const rows = await sql<{
    id: number;
    plan: Plan;
    amount_fcfa: number;
    provider: string;
    status: SubStatus;
    filiere_id: number | null;
    niveau: number | null;
    semestre: number | null;
    phone: string | null;
    starts_at: string | null;
    expires_at: string | null;
  }>`
    select id, plan, amount_fcfa, provider, status, filiere_id, niveau, semestre, phone,
           starts_at::text, expires_at::text
    from subscriptions
    where user_id = ${userId} and status = 'active'
    order by expires_at desc nulls last
    limit 1
  `;
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    plan: r.plan,
    amountFcfa: r.amount_fcfa,
    provider: r.provider,
    status: r.status,
    filiereId: r.filiere_id,
    niveau: r.niveau,
    semestre: r.semestre,
    phone: r.phone,
    startsAt: r.starts_at,
    expiresAt: r.expires_at,
  };
}

export function parseOptions(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") {
    try {
      const v = JSON.parse(raw) as unknown;
      return Array.isArray(v) ? v.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}
