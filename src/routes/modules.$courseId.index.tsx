import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { NoteBody } from "@/components/note-body";
import { Paywall } from "@/components/paywall";
import { getCourseBundle, markProgress } from "@/lib/server/fns";
import { useCourseId } from "./modules.$courseId";

export const Route = createFileRoute("/modules/$courseId/")({ component: CoursePage });

function CoursePage() {
  const courseId = useCourseId();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseBundle({ data: { courseId } }),
  });
  const mark = useMutation({
    mutationFn: () => markProgress({ data: { courseId, field: "course" } }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["course", courseId] });
      void qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
  const data = q.data;
  useEffect(() => {
    if (data && !data.locked && !data.progress.viewedCourse) mark.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.course.id, data?.locked]);

  if (!data) return null;
  if (data.locked) return <Paywall />;
  return (
    <article className="rounded-[1.6rem] bg-cream px-5 py-6 shadow-paper">
      <NoteBody text={data.course.content} />
    </article>
  );
}
