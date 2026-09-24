import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NoteBody } from "@/components/note-body";
import { Paywall } from "@/components/paywall";
import { Button } from "@/components/ui/button";
import { getCourseBundle, markProgress } from "@/lib/server/fns";
import { useCourseId } from "./modules.$courseId";

export const Route = createFileRoute("/modules/$courseId/exercices")({ component: ExercisesPage });

function ExercisesPage() {
  const courseId = useCourseId();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseBundle({ data: { courseId } }),
  });
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const mark = useMutation({
    mutationFn: (field: "exercises" | "corrections") => markProgress({ data: { courseId, field } }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["course", courseId] });
      void qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
  const data = q.data;
  useEffect(() => {
    if (data && !data.locked && !data.progress.viewedExercises) mark.mutate("exercises");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.course.id, data?.locked]);
  if (!data) return null;
  if (data.locked) return <Paywall />;
  return (
    <ol className="space-y-4">
      {data.exercises.map((ex, i) => (
        <li key={ex.id} className="rounded-[1.5rem] bg-cream p-5 shadow-paper">
          <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted">Exercice {i + 1}</p>
          <p className="mt-2 text-[1.02rem] leading-relaxed text-fg">{ex.prompt}</p>
          {open[ex.id] ? (
            <div className="mt-4 rounded-2xl bg-signal-soft px-4 py-3">
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-signal">Corrigé</p>
              <NoteBody className="mt-2" text={ex.solution} />
            </div>
          ) : (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setOpen((s) => ({ ...s, [ex.id]: true }));
                mark.mutate("corrections");
              }}
            >
              Voir le corrigé
            </Button>
          )}
        </li>
      ))}
    </ol>
  );
}
