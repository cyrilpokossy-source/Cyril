import { useMutation } from "@tanstack/react-query";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { askModuleAi } from "@/lib/server/fns";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

export function AiDock({
  courseId,
  unlocked,
}: {
  courseId: number;
  unlocked: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const mut = useMutation({
    mutationFn: () => askModuleAi({ data: { courseId, question } }),
    onSuccess: (res) => {
      if (res.ok) setAnswer(res.text);
      else setAnswer(res.error);
    },
    onError: (err: Error) => setAnswer(err.message),
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-30 flex size-11 items-center justify-center rounded-full bg-ink text-cream shadow-[0_8px_24px_rgb(16_36_63/0.28)] md:right-[calc(50%-11.5rem)]"
        aria-label="Question d’approfondissement"
      >
        <Sparkles className="size-4" strokeWidth={1.6} />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="w-full max-w-lg rounded-[1.75rem] bg-cream p-5 shadow-paper">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">Dernier recours</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink">Approfondir</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-xl text-muted"
                aria-label="Fermer"
              >
                <X className="size-4" />
              </button>
            </div>
            {unlocked ? (
              <>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Une question précise, après le cours et les corrigés — pas un substitut.
                </p>
                <Textarea
                  className="mt-4"
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex. Pourquoi la RuBisCO confond-elle O2 et CO2 ?"
                />
                <Button
                  className="mt-3 w-full"
                  disabled={mut.isPending || question.trim().length < 8}
                  onClick={() => {
                    setAnswer(null);
                    mut.mutate();
                  }}
                >
                  {mut.isPending ? "Réflexion…" : "Demander"}
                </Button>
                {answer ? (
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-fg">{answer}</p>
                ) : null}
              </>
            ) : (
              <p className={cn("mt-3 text-sm leading-relaxed text-muted")}>
                L’assistant s’ouvre après lecture du cours, du résumé, et d’un corrigé (QCM ou exercice).
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
