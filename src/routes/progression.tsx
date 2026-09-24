import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { listMyProgress } from "@/lib/server/fns";

export const Route = createFileRoute("/progression")({ component: ProgressionPage });

function ProgressionPage() {
  return (
    <AppShell>
      <ProgressionBody />
    </AppShell>
  );
}

function ProgressionBody() {
  const q = useQuery({ queryKey: ["progress"], queryFn: () => listMyProgress() });
  if (q.isLoading) return <Skeleton className="h-64 w-full" />;
  const rows = q.data ?? [];
  const done = rows.filter((r) => r.progress.completed).length;
  const scores = rows.map((r) => r.progress.qcmScore).filter((n): n is number => n != null);
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Tableau</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Progression</h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Stat label="Modules faits" value={`${done}/${rows.length}`} />
        <Stat label="Moyenne QCM" value={avg == null ? "—" : `${avg}%`} />
      </div>
      <ul className="mt-6 space-y-3">
        {rows.map((row) => {
          const bits = [
            row.progress.viewedCourse,
            row.progress.viewedResume,
            row.progress.viewedExercises,
            row.progress.viewedQcm,
          ];
          const pct = Math.round((bits.filter(Boolean).length / 4) * 100);
          return (
            <li key={row.course.id} className="rounded-[1.4rem] bg-cream p-4 shadow-paper">
              <div className="flex items-baseline justify-between gap-3">
                <Link
                  to="/modules/$courseId"
                  params={{ courseId: String(row.course.id) }}
                  className="font-display text-lg font-semibold text-ink"
                >
                  {row.course.title}
                </Link>
                <span className="tabular-nums text-sm text-muted">
                  {row.progress.qcmScore != null ? `${row.progress.qcmScore}%` : "—"}
                </span>
              </div>
              <ProgressBar value={pct} className="mt-3" />
              <p className="mt-2 text-[0.75rem] uppercase tracking-[0.12em] text-faint">
                {row.progress.completed
                  ? "Terminé"
                  : `${row.progress.qcmAttempts} tentative${row.progress.qcmAttempts > 1 ? "s" : ""}`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] bg-cream p-4 shadow-paper">
      <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-ink">{value}</p>
    </div>
  );
}
