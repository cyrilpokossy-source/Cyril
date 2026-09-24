import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { listMyProgress } from "@/lib/server/fns";

export const Route = createFileRoute("/modules/")({ component: ModulesPage });

function ModulesPage() {
  return (
    <AppShell>
      <ModulesBody />
    </AppShell>
  );
}

function ModulesBody() {
  const q = useQuery({ queryKey: ["progress"], queryFn: () => listMyProgress() });
  if (q.isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }
  const rows = q.data ?? [];
  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Catalogue</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Modules</h1>
      <p className="mt-2 text-sm text-muted">Cours, résumé, entraînement, QCM, copies.</p>
      <ul className="mt-6 space-y-3">
        {rows.map((row) => {
          const bits = [
            row.progress.viewedCourse,
            row.progress.viewedResume,
            row.progress.viewedExercises,
            row.progress.viewedQcm,
          ];
          const pct = Math.round((bits.filter(Boolean).length / bits.length) * 100);
          return (
            <li key={row.course.id}>
              <Link
                to="/modules/$courseId"
                params={{ courseId: String(row.course.id) }}
                className="block rounded-[1.5rem] bg-cream p-5 shadow-paper"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.68rem] tracking-[0.14em] text-signal">{row.course.code}</p>
                    <h2 className="mt-1 font-display text-xl font-semibold leading-snug text-ink">
                      {row.course.title}
                    </h2>
                  </div>
                  <span className="tabular-nums text-sm text-muted">{row.course.hours} h</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.course.description}</p>
                <ProgressBar value={pct} className="mt-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
