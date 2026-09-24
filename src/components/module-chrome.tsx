import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { CourseSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS = [
  { to: (id: number) => `/modules/${id}`, key: "cours", label: "Cours" },
  { to: (id: number) => `/modules/${id}/resume`, key: "resume", label: "Résumé" },
  { to: (id: number) => `/modules/${id}/exercices`, key: "exercices", label: "Exercices" },
  { to: (id: number) => `/modules/${id}/qcm`, key: "qcm", label: "QCM" },
  { to: (id: number) => `/modules/${id}/epreuves`, key: "epreuves", label: "Épreuves" },
] as const;

export function ModuleChrome({ course }: { course: CourseSummary }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mb-6">
      <Link
        to="/modules"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted"
      >
        <ArrowLeft className="size-4" />
        Modules
      </Link>
      <p className="mt-4 font-mono text-[0.72rem] tracking-[0.16em] text-signal">{course.code}</p>
      <h1 className="mt-1 font-display text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-ink">
        {course.title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {course.hours} h · {course.description}
      </p>
      <div className="mt-5 flex gap-1 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const href = tab.to(course.id);
          const active = tab.key === "cours" ? path === href : path.startsWith(href);
          return (
            <Link
              key={tab.key}
              to={href}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-sm transition-colors duration-150",
                active ? "bg-ink text-cream" : "text-muted hover:bg-paper-2",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
