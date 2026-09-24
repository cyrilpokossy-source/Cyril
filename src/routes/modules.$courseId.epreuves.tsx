import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NoteBody } from "@/components/note-body";
import { Paywall } from "@/components/paywall";
import { Button } from "@/components/ui/button";
import { getCourseBundle, markProgress } from "@/lib/server/fns";
import { useCourseId } from "./modules.$courseId";

export const Route = createFileRoute("/modules/$courseId/epreuves")({ component: ExamsPage });

function ExamsPage() {
  const courseId = useCourseId();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseBundle({ data: { courseId } }),
  });
  const [show, setShow] = useState<Record<number, boolean>>({});
  const mark = useMutation({
    mutationFn: (field: "exams" | "corrections") => markProgress({ data: { courseId, field } }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["course", courseId] });
      void qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
  const data = q.data;
  useEffect(() => {
    if (data && !data.locked && !data.progress.viewedExams && data.exams.length) mark.mutate("exams");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.course.id, data?.locked]);
  if (!data) return null;
  if (data.locked) return <Paywall />;
  if (!data.exams.length) {
    return (
      <p className="rounded-[1.5rem] bg-cream p-6 text-sm leading-relaxed text-muted shadow-paper">
        Aucune ancienne épreuve n’est encore versée pour ce module.
      </p>
    );
  }
  return (
    <ul className="space-y-4">
      {data.exams.map((exam) => (
        <li key={exam.id} className="rounded-[1.5rem] bg-cream p-5 shadow-paper">
          <p className="font-mono text-[0.68rem] tracking-[0.14em] text-signal">{exam.year}</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-ink">{exam.title}</h2>
          <NoteBody className="mt-4" text={exam.content} />
          {show[exam.id] ? (
            <div className="mt-4 rounded-2xl bg-paper-2 px-4 py-3">
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">Corrigé</p>
              <NoteBody className="mt-2" text={exam.correction} />
            </div>
          ) : (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setShow((s) => ({ ...s, [exam.id]: true }));
                mark.mutate("corrections");
              }}
            >
              Afficher le corrigé
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
