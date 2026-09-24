import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "./ui/button";

export function Paywall({ title }: { title?: string }) {
  return (
    <div className="rounded-[1.75rem] bg-ink px-6 py-8 text-cream">
      <Lock className="size-5 text-signal-soft" strokeWidth={1.6} />
      <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        {title ?? "Contenu réservé aux abonnés"}
      </h2>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/70">
        Les cours, résumés, QCM et épreuves s’ouvrent après activation d’un accès
        — 2 000 FCFA / mois ou 10 000 FCFA le semestre, via Orange Money ou MTN MoMo.
      </p>
      <Button asChild variant="paper" className="mt-6 w-full">
        <Link to="/abonnement">Activer mon semestre</Link>
      </Button>
    </div>
  );
}
