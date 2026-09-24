import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { ModuleChrome } from "@/components/module-chrome";
import { AiDock } from "@/components/ai-dock";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourseBundle } from "@/lib/server/fns";

export const Route = createFileRoute("/modules/$courseId")({
  component: CourseLayout,
});

export function useCourseId() {
  const { courseId } = useParams({ from: "/modules/$courseId" });
  return Number(courseId);
}

function CourseLayout() {
  const courseId = useCourseId();
  const q = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseBundle({ data: { courseId } }),
    enabled: Number.isFinite(courseId),
  });

  return (
    <AppShell>
      {q.isLoading || !q.data ? (
        <div className="space-y-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <>
          <ModuleChrome course={q.data.course} />
          <Outlet />
          <AiDock
            courseId={courseId}
            unlocked={
              q.data.progress.viewedCourse &&
              q.data.progress.viewedResume &&
              q.data.progress.viewedCorrections
            }
          />
        </>
      )}
    </AppShell>
  );
}
