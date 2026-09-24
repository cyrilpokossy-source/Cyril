import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { claimAdmin, getMe, updateProfile } from "@/lib/server/fns";
import { formatDateFr, initials, niveauLabel, semestreLabel } from "@/lib/format";

export const Route = createFileRoute("/profil")({ component: ProfilPage });

function ProfilPage() {
  return (
    <AppShell requireParcours={false}>
      <ProfilBody />
    </AppShell>
  );
}

function ProfilBody() {
  const user = useCurrentUser();
  const qc = useQueryClient();
  const me = useQuery({ queryKey: ["me"], queryFn: () => getMe() });
  const profile = me.data?.profile;
  const [name, setName] = useState("");
  const save = useMutation({
    mutationFn: () => updateProfile({ data: { displayName: name } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });
  const claim = useMutation({
    mutationFn: () => claimAdmin(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Compte</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Profil</h1>

      <div className="mt-6 flex items-center gap-4 rounded-[1.5rem] bg-cream p-5 shadow-paper">
        <div className="grid size-14 place-items-center rounded-full bg-ink font-display text-lg text-cream">
          {initials(profile?.displayName ?? user?.displayName)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-semibold text-ink">
            {profile?.displayName ?? user?.displayName ?? "Étudiant"}
          </p>
          <p className="truncate text-sm text-muted">{profile?.email ?? user?.primaryEmail}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-2 text-sm">
        <Row k="Filière" v={profile?.filiere?.name ?? "—"} />
        <Row k="Niveau" v={niveauLabel(profile?.niveau ?? null)} />
        <Row k="Semestre" v={semestreLabel(profile?.semestre ?? null)} />
        <Row
          k="Abonnement"
          v={
            me.data?.subscription
              ? `Actif jusqu’au ${formatDateFr(me.data.subscription.expiresAt)}`
              : profile?.role === "admin"
                ? "Admin — accès ouvert"
                : "Aucun accès actif"
          }
        />
      </dl>

      <Link to="/parcours" className="mt-4 inline-flex min-h-11 items-center text-sm text-ink underline-offset-4 hover:underline">
        Modifier le parcours
      </Link>

      <div className="mt-8">
        <Label htmlFor="display">Nom affiché</Label>
        <Input
          id="display"
          value={name}
          placeholder={profile?.displayName ?? ""}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="mt-3" disabled={save.isPending || name.trim().length < 2} onClick={() => save.mutate()}>
          Enregistrer
        </Button>
      </div>

      {profile?.role !== "admin" ? (
        <div className="mt-10 rounded-[1.4rem] border border-line px-4 py-4">
          <p className="text-sm text-muted">
            Premier administrateur du catalogue ? Activez l’espace de gestion (une seule fois).
          </p>
          {claim.error ? <p className="mt-2 text-sm text-danger">{claim.error.message}</p> : null}
          <Button variant="outline" className="mt-3" disabled={claim.isPending} onClick={() => claim.mutate()}>
            Activer l’espace admin
          </Button>
        </div>
      ) : (
        <Link to="/admin" className="mt-8 block text-sm text-signal">
          Ouvrir l’administration →
        </Link>
      )}

      <div className="mt-10 border-t border-line pt-6">
        <p className="mb-3 text-[0.68rem] uppercase tracking-[0.14em] text-muted">Session</p>
        <UserButton />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line py-3">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right text-ink">{v}</dd>
    </div>
  );
}
