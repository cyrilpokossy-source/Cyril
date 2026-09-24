import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { listFilieres, saveParcours } from "@/lib/server/fns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parcours")({ component: ParcoursPage });

function ParcoursPage() {
  return (
    <AppShell requireParcours={false}>
      <ParcoursForm />
    </AppShell>
  );
}

function ParcoursForm() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const filieres = useQuery({ queryKey: ["filieres"], queryFn: () => listFilieres() });
  const [filiereId, setFiliereId] = useState<number | null>(null);
  const [niveau, setNiveau] = useState<1 | 2 | null>(null);
  const [semestre, setSemestre] = useState<1 | 2 | null>(null);
  const save = useMutation({
    mutationFn: () =>
      saveParcours({
        data: { filiereId: filiereId!, niveau: niveau!, semestre: semestre! },
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
      await navigate({ to: "/dashboard" });
    },
  });

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Étape obligatoire</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
        Votre parcours
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Filière, niveau, semestre — le catalogue et les QCM s’alignent dessus.
      </p>

      <section className="mt-8">
        <h2 className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">Filière</h2>
        <div className="mt-3 space-y-2">
          {(filieres.data ?? []).map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiliereId(f.id)}
              className={cn(
                "w-full rounded-[1.35rem] px-4 py-4 text-left transition-colors duration-150",
                filiereId === f.id ? "bg-ink text-cream" : "bg-cream text-fg shadow-paper",
              )}
            >
              <span className="font-mono text-[0.68rem] tracking-[0.14em] opacity-70">
                0{i + 1} · {f.shortName}
              </span>
              <span className="mt-1 block font-display text-lg font-semibold leading-snug">{f.name}</span>
              <span className={cn("mt-1 block text-sm leading-relaxed", filiereId === f.id ? "text-cream/70" : "text-muted")}>
                {f.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">Niveau</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {([1, 2] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNiveau(n)}
              className={cn(
                "rounded-[1.25rem] px-4 py-5 text-left",
                niveau === n ? "bg-ink text-cream" : "bg-cream shadow-paper",
              )}
            >
              <span className="font-display text-2xl font-semibold">{n}</span>
              <span className="mt-1 block text-sm opacity-70">{n === 1 ? "Fondations" : "Approfondissement"}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">Semestre</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {([1, 2] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setSemestre(n)}
              className={cn(
                "rounded-[1.25rem] px-4 py-5 text-left",
                semestre === n ? "bg-ink text-cream" : "bg-cream shadow-paper",
              )}
            >
              <span className="font-display text-2xl font-semibold">S{n}</span>
              <span className="mt-1 block text-sm opacity-70">{n === 1 ? "Octobre — février" : "Mars — juillet"}</span>
            </button>
          ))}
        </div>
      </section>

      {save.error ? <p className="mt-4 text-sm text-danger">{save.error.message}</p> : null}

      <Button
        className="mt-8 w-full"
        disabled={!filiereId || !niveau || !semestre || save.isPending}
        onClick={() => save.mutate()}
      >
        {save.isPending ? "Enregistrement…" : "Ouvrir l’atelier"}
      </Button>
    </div>
  );
}
