import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminFinance, getMe, listAdminCourses, listAdminStudents, setSubscriptionStatus } from "@/lib/server/fns";
import { formatDateFr, formatFcfa, planLabel, providerLabel, subStatusLabel } from "@/lib/format";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  const me = useQuery({ queryKey: ["me"], queryFn: () => getMe() });
  const isAdmin = me.data?.profile.role === "admin";
  const finance = useQuery({
    queryKey: ["admin-finance"],
    queryFn: () => getAdminFinance(),
    enabled: isAdmin,
  });
  const students = useQuery({
    queryKey: ["admin-students"],
    queryFn: () => listAdminStudents(),
    enabled: isAdmin,
  });
  const courses = useQuery({
    queryKey: ["admin-courses"],
    queryFn: () => listAdminCourses(),
    enabled: isAdmin,
  });
  const qc = useQueryClient();
  const subMut = useMutation({
    mutationFn: (input: { userId: string; status: "active" | "expired" }) => setSubscriptionStatus({ data: input }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin-students"] });
      void qc.invalidateQueries({ queryKey: ["admin-finance"] });
    },
  });

  if (me.isSuccess && me.data.profile.role !== "admin") {
    return <Navigate to="/profil" />;
  }

  const f = finance.data;
  const people = (students.data ?? []).filter((s) => s.role !== "admin");

  return (
    <div className="pb-8">
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Espace privé</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Comptes</h1>
      <p className="mt-2 text-sm text-muted">Abonnés, statuts, encaissements. Visible uniquement par vous.</p>

      <section className="mt-6 rounded-[1.6rem] bg-ink px-5 py-6 text-cream">
        <p className="text-[0.68rem] uppercase tracking-[0.16em] text-cream/55">Encaissé</p>
        <p className="mt-1 font-display text-[2.4rem] font-semibold leading-none tabular-nums">
          {formatFcfa(f?.collected ?? 0)}
        </p>
        <p className="mt-3 text-sm text-cream/70">Paiements Orange Money et MTN MoMo, hors accès offerts.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-cream/55">Orange Money</p>
            <p className="font-display text-lg tabular-nums">{formatFcfa(f?.orange ?? 0)}</p>
          </div>
          <div>
            <p className="text-cream/55">MTN MoMo</p>
            <p className="font-display text-lg tabular-nums">{formatFcfa(f?.mtn ?? 0)}</p>
          </div>
        </div>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Stat k="Abonnés actifs" v={String(f?.active ?? 0)} />
        <Stat k="Expirés" v={String(f?.expired ?? 0)} />
        <Stat k="Sans accès" v={String(f?.none ?? 0)} />
        <Stat k="Étudiants" v={String(f?.students ?? 0)} />
      </div>

      <div className="mt-3 rounded-[1.4rem] bg-cream px-4 py-4 shadow-paper">
        <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">Formules payées</p>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-ink">Mensuel · {f?.monthlyCount ?? 0}</span>
          <span className="tabular-nums text-ink">{formatFcfa(f?.monthlySum ?? 0)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-ink">Semestriel · {f?.semesterCount ?? 0}</span>
          <span className="tabular-nums text-ink">{formatFcfa(f?.semesterSum ?? 0)}</span>
        </div>
        {(f?.adminGift ?? 0) > 0 ? (
          <p className="mt-3 text-xs text-muted">Accès offerts (non comptés) : {formatFcfa(f?.adminGift ?? 0)}</p>
        ) : null}
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Abonnés</h2>
      <p className="mt-1 text-sm text-muted">Statut de chaque compte étudiant.</p>
      {people.length === 0 ? (
        <p className="mt-3 rounded-[1.25rem] bg-cream px-4 py-4 text-sm text-muted shadow-paper">
          Aucun étudiant pour le moment.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {people.map((s) => (
            <li key={s.userId} className="rounded-[1.35rem] bg-cream p-4 shadow-paper">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold text-ink">
                    {s.displayName ?? s.email ?? s.userId.slice(0, 8)}
                  </p>
                  <p className="text-sm text-muted">
                    {s.filiereName ?? "Parcours incomplet"} · N{s.niveau ?? "—"} S{s.semestre ?? "—"}
                  </p>
                </div>
                <StatusPill status={s.subStatus} />
              </div>
              <p className="mt-2 text-sm text-ink">
                {s.subStatus === "active"
                  ? `${planLabel(s.subPlan)} · ${formatFcfa(s.subAmount ?? 0)} · jusqu’au ${formatDateFr(s.subExpires)}`
                  : s.subStatus === "expired"
                    ? `Expiré${s.subExpires ? ` le ${formatDateFr(s.subExpires)}` : ""} · ${planLabel(s.subPlan)}`
                    : "Aucun paiement"}
              </p>
              {s.subProvider ? <p className="text-xs text-muted">{providerLabel(s.subProvider)}</p> : null}
              <p className="mt-1 text-xs text-muted">
                {s.completed}/{s.modules} modules terminés
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() =>
                  subMut.mutate({
                    userId: s.userId,
                    status: s.subStatus === "active" ? "expired" : "active",
                  })
                }
              >
                {s.subStatus === "active" ? "Expirer l’accès" : "Offrir 6 mois"}
              </Button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Mouvements</h2>
      {(f?.payments.length ?? 0) === 0 ? (
        <p className="mt-3 text-sm text-muted">Aucun paiement enregistré.</p>
      ) : (
        <ul className="mt-3 divide-y divide-line overflow-hidden rounded-[1.35rem] bg-cream shadow-paper">
          {(f?.payments ?? []).map((p) => (
            <li key={p.id} className="flex items-start justify-between gap-3 px-4 py-3">
              <span>
                <span className="block font-display text-base font-semibold text-ink">
                  {p.displayName ?? p.email ?? "Étudiant"}
                </span>
                <span className="text-xs text-muted">
                  {planLabel(p.plan)} · {providerLabel(p.provider)} · {formatDateFr(p.createdAt)}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block tabular-nums text-sm text-ink">{formatFcfa(p.amountFcfa)}</span>
                <span className="text-[0.68rem] uppercase tracking-[0.1em] text-muted">{subStatusLabel(p.status)}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Catalogue</h2>
      <Link to="/admin/module/$courseId" params={{ courseId: "new" }} className="mt-3 inline-flex min-h-11 items-center text-sm text-signal">
        Ajouter un module
      </Link>
      <ul className="mt-3 space-y-2">
        {(courses.data ?? []).map((c) => (
          <li key={c.id}>
            <Link
              to="/admin/module/$courseId"
              params={{ courseId: String(c.id) }}
              className="flex items-start justify-between gap-3 rounded-[1.25rem] bg-cream px-4 py-3 shadow-paper"
            >
              <span>
                <span className="block font-mono text-[0.68rem] tracking-[0.12em] text-muted">
                  {c.filiere_name} · N{c.niveau}S{c.semestre} · {c.code}
                </span>
                <span className="font-display text-lg font-semibold text-ink">{c.title}</span>
              </span>
              <span className="shrink-0 text-right text-[0.7rem] text-muted">
                {c.qcm} QCM
                <br />
                {c.exercices} ex. · {c.exams} épr.
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-[1.3rem] bg-cream px-4 py-4 shadow-paper">
      <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">{k}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-ink">{v}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string | null }) {
  if (status === "active") return <Badge tone="signal">Actif</Badge>;
  if (status === "expired") return <Badge tone="warn">Expiré</Badge>;
  return <Badge tone="muted">Sans accès</Badge>;
}
