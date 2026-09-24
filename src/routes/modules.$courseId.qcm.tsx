import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Paywall } from "@/components/paywall";
import { Button } from "@/components/ui/button";
import { getCourseBundle, submitQcm } from "@/lib/server/fns";
import type { QcmSubmitResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCourseId } from "./modules.$courseId";

export const Route = createFileRoute("/modules/$courseId/qcm")({ component: QcmPage });

const LETTERS = ["A", "B", "C", "D"];

function QcmPage() {
  const courseId = useCourseId();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseBundle({ data: { courseId } }),
  });
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QcmSubmitResult | null>(null);
  const submit = useMutation({
    mutationFn: () =>
      submitQcm({
        data: {
          courseId,
          answers: Object.entries(picks).map(([questionId, selectedIndex]) => ({
            questionId: Number(questionId),
            selectedIndex,
          })),
        },
      }),
    onSuccess: (res) => {
      setResult(res);
      void qc.invalidateQueries({ queryKey: ["course", courseId] });
      void qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
  const data = q.data;
  if (!data) return null;
  if (data.locked) return <Paywall />;

  if (result) {
    return (
      <div>
        <div className={cn("rounded-[1.6rem] px-5 py-6", result.passed ? "bg-signal text-signal-fg" : "bg-ink text-cream")}>
          <p className="text-[0.68rem] uppercase tracking-[0.16em] opacity-80">
            Tentative {result.attempt}
          </p>
          <p className="mt-2 font-display text-4xl font-semibold tabular-nums">{result.percent}%</p>
          <p className="mt-1 text-sm opacity-80">
            {result.score} / {result.total} — {result.passed ? "Seuil atteint" : "En dessous du seuil (50 %)"}
          </p>
        </div>
        {result.showCorrection ? (
          <ol className="mt-5 space-y-4">
            {result.items.map((item, i) => (
              <li key={item.questionId} className="rounded-[1.5rem] bg-cream p-5 shadow-paper">
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted">Question {i + 1}</p>
                <p className="mt-2 font-medium text-ink">{item.prompt}</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {item.options.map((opt, idx) => {
                    const isRight = idx === item.correctIndex;
                    const isPick = idx === item.selectedIndex;
                    return (
                      <li
                        key={idx}
                        className={cn(
                          "rounded-xl px-3 py-2",
                          isRight ? "bg-signal-soft text-signal" : isPick ? "bg-danger/10 text-danger" : "text-muted",
                        )}
                      >
                        <span className="mr-2 font-mono text-[0.7rem]">{LETTERS[idx]}</span>
                        {opt}
                      </li>
                    );
                  })}
                </ul>
                {!item.isCorrect ? (
                  <p className="mt-3 text-sm leading-relaxed text-fg">{item.explanation}</p>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-5 text-sm text-muted">Sans faute — les corrigés restent masqués.</p>
        )}
        <Button
          variant="outline"
          className="mt-6 w-full"
          onClick={() => {
            setResult(null);
            setPicks({});
          }}
        >
          Recommencer
        </Button>
      </div>
    );
  }

  const allAnswered = data.qcm.every((item) => picks[item.id] != null);

  return (
    <div>
      <p className="text-sm text-muted">
        Répondez à chaque item. Score automatique — corrigé si échec ou 1 à 3 erreurs.
      </p>
      <ol className="mt-5 space-y-5">
        {data.qcm.map((item, i) => (
          <li key={item.id} className="rounded-[1.5rem] bg-cream p-5 shadow-paper">
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted">
              {String(i + 1).padStart(2, "0")} / {String(data.qcm.length).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[1.05rem] font-medium leading-snug text-ink">{item.prompt}</p>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {item.options.map((opt, idx) => {
                const selected = picks[item.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPicks((s) => ({ ...s, [item.id]: idx }))}
                    className={cn(
                      "flex min-h-12 items-start gap-3 rounded-2xl px-3 py-3 text-left text-sm leading-snug",
                      selected ? "bg-ink text-cream" : "bg-paper text-fg",
                    )}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-black/10 font-mono text-[0.7rem] font-medium">
                      {LETTERS[idx]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      {submit.error ? <p className="mt-3 text-sm text-danger">{submit.error.message}</p> : null}
      <Button className="mt-6 w-full" disabled={!allAnswered || submit.isPending} onClick={() => submit.mutate()}>
        {submit.isPending ? "Calcul du score…" : "Valider le QCM"}
      </Button>
    </div>
  );
}
