import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { SynapseMark } from "@/components/synapse-mark";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { isPending } = useCurrentUserState();
  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-16 size-80 rounded-full bg-ink-soft/50"
      />
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-6 pb-10 pt-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SynapseMark inverted className="size-8" />
            <span className="font-display text-xl font-semibold">Synapse</span>
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cream/55">FS · Udla</p>
        </header>

        <p className="mt-16 text-[0.72rem] uppercase tracking-[0.22em] text-signal-soft">
          Faculté des Sciences
        </p>
        <h1 className="mt-4 font-display text-[3.15rem] font-semibold leading-[0.95] tracking-[-0.03em]">
          Réviser
          <br />
          autrement.
        </h1>
        <p className="mt-6 max-w-[34ch] text-[1.05rem] leading-relaxed text-cream/72">
          Cours, résumés, exercices, QCM et anciennes épreuves — pour les
          étudiants de Douala, filière par filière, semestre par semestre.
        </p>

        <ol className="mt-10 space-y-0 border-t border-cream/15">
          {[
            ["01", "Biologie des organismes animaux"],
            ["02", "Biologie des organismes végétaux"],
            ["03", "Biochimie"],
          ].map(([n, name]) => (
            <li
              key={n}
              className="flex items-baseline justify-between gap-4 border-b border-cream/15 py-4"
            >
              <span className="font-mono text-[0.7rem] tracking-[0.16em] text-signal-soft">{n}</span>
              <span className="flex-1 font-display text-lg font-medium leading-snug">{name}</span>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-cream/50">Niveaux 1 et 2 · deux semestres</p>

        <div className="mt-auto pt-12">
          {isPending ? (
            <div className="h-12 w-full animate-pulse rounded-[14px] bg-cream/10" />
          ) : (
            <>
              <SignedOut>
                <Link
                  to="/login"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-cream text-ink font-medium"
                >
                  Entrer dans l’atelier
                  <ArrowUpRight className="size-4" />
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  to="/dashboard"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-cream text-ink font-medium"
                >
                  Continuer
                  <ArrowUpRight className="size-4" />
                </Link>
              </SignedIn>
            </>
          )}
          <p className="mt-4 text-center text-[0.72rem] text-cream/40">
            Université de Douala · accès 2 000 FCFA / mois
          </p>
        </div>
      </div>
    </main>
  );
}
