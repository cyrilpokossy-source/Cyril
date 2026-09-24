import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/ui/progress";
import { getMe, listMyProgress } from "@/lib/server/fns";
import { formatDateFr, niveauLabel, semestreLabel } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function DashboardPage() {
  return (
    <AppShell>
      <DashboardBody />
    </AppShell>
  );
}

function DashboardBody() {
  const me = useQuery({ queryKey: ["me"], queryFn: () => getMe() });
  const progress = useQuery({ queryKey: ["progress"], queryFn: () => listMyProgress() });
  const profile = me.data?.profile;
  const sub = me.data?.subscription;
  const rows = progress.data ?? [];
  const done = rows.filter((r) => r.progress.completed).length;
  const pct = rows.length ? Math.round((done / rows.length) * 100) : 0;
  const n1 = profile?.niveau === 1;

  if (me.isLoading || progress.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        {n1 ? "Fondations" : "Approfondissement"}
      </p>
      <h1 className="mt-2 font-display text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-ink">
        {n1 ? "Niveau 1" : "Niveau 2"}
        <span className="block text-[1.35rem] font-medium text-ink-soft">
          {semestreLabel(profile?.semestre ?? null)}
        </span>
      </h1>
      <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted">
        {profile?.filiere?.name}.{" "}
        {n1
          ? "Posez les bases : lisez, résumez, puis affrontez le QCM."
          : "Visez l’épreuve : cas, anciennes copies, et scores au-dessus de 50 %."}
      </p>

      <div className="mt-8 rounded-[1.6rem] bg-cream p-5 shadow-paper">
        <div className="flex items-end justify-between">
          <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">Semestre</p>
          <p className="font-display text-3xl font-semibold tabular-nums text-ink">{pct}%</p>
        </div>
        <ProgressBar value={pct} className="mt-3" />
        <p className="mt-3 text-sm text-muted">
          {done} module{done > 1 ? "s" : ""} terminé{done > 1 ? "s" : ""} sur {rows.length}
        </p>
      </div>

      {!sub && profile?.role !== "admin" ? (
        <Link
          to="/abonnement"
          className="mt-4 flex items-center justify-between rounded-[1.4rem] bg-ink px-5 py-4 text-cream"
        >
          <span>
            <span className="block text-[0.68rem] uppercase tracking-[0.14em] text-cream/55">Accès</span>
            <span className="font-display text-lg font-semibold">Activer le semestre</span>
          </span>
          <span className="text-sm text-cream/70">2 000 FCFA</span>
        </Link>
      ) : sub ? (
        <p className="mt-4 text-sm text-signal">
          Accès actif jusqu’au {formatDateFr(sub.expiresAt)}
        </p>
      ) : null}

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Fil d’étude</h2>
      <ol className="relative mt-4 ml-3 border-l border-line">
        {rows.map((row, i) => (
          <li key={row.course.id} className="relative pb-7 pl-6 last:pb-0">
            <span
              className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full ${
                row.progress.completed ? "bg-signal" : "bg-paper-2 shadow-[0_0_0_1px_var(--color-line)]"
              }`}
            />
            <Link to="/modules/$courseId" params={{ courseId: String(row.course.id) }} className="block">
              <span className="font-mono text-[0.68rem] tracking-[0.14em] text-faint">
                {String(i + 1).padStart(2, "0")} · {row.course.code}
              </span>
              <span className="mt-0.5 block font-display text-lg font-semibold leading-snug text-ink">
                {row.course.title}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {row.progress.completed
                  ? "Terminé"
                  : row.progress.qcmScore != null
                    ? `QCM ${row.progress.qcmScore} %`
                    : "À ouvrir"}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
