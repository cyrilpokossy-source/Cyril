import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMe, startSubscription } from "@/lib/server/fns";
import { PLANS, type PayProvider, type Plan } from "@/lib/types";
import { formatDateFr, formatFcfa } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/abonnement")({ component: SubPage });

function SubPage() {
  return (
    <AppShell>
      <SubBody />
    </AppShell>
  );
}

function SubBody() {
  const qc = useQueryClient();
  const me = useQuery({ queryKey: ["me"], queryFn: () => getMe() });
  const [plan, setPlan] = useState<Plan>("semester");
  const [provider, setProvider] = useState<PayProvider>("orange_money");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const pay = useMutation({
    mutationFn: () => startSubscription({ data: { plan, provider, phone } }),
    onSuccess: async () => {
      setDone(true);
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
  const sub = me.data?.subscription;

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Orange Money · MTN MoMo</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Abonnement</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Paiement mobile money (Campay / CinetPay en production). Ici, la confirmation du numéro active
        immédiatement l’accès au semestre choisi.
      </p>

      {sub ? (
        <div className="mt-6 rounded-[1.5rem] bg-signal px-5 py-5 text-signal-fg">
          <p className="text-[0.68rem] uppercase tracking-[0.14em] opacity-80">Actif</p>
          <p className="mt-1 font-display text-2xl font-semibold">
            Jusqu’au {formatDateFr(sub.expiresAt)}
          </p>
          <p className="mt-1 text-sm opacity-80">{formatFcfa(sub.amountFcfa)} · {sub.plan === "monthly" ? "mensuel" : "semestriel"}</p>
        </div>
      ) : null}

      {done ? (
        <p className="mt-6 text-sm text-signal">Paiement confirmé. Les modules sont ouverts.</p>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-3">
        {PLANS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlan(p.id)}
            className={cn(
              "rounded-[1.45rem] px-5 py-5 text-left",
              plan === p.id ? "bg-ink text-cream" : "bg-cream shadow-paper",
            )}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-xl font-semibold">{p.label}</span>
              <span className="tabular-nums">{formatFcfa(p.price)}</span>
            </div>
            <p className={cn("mt-1 text-sm", plan === p.id ? "text-cream/70" : "text-muted")}>{p.hint}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setProvider("orange_money")}
          className={cn(
            "rounded-[1.25rem] px-3 py-4 text-sm font-medium",
            provider === "orange_money" ? "bg-orange-money text-cream" : "bg-cream shadow-paper",
          )}
        >
          Orange Money
        </button>
        <button
          type="button"
          onClick={() => setProvider("mtn_momo")}
          className={cn(
            "rounded-[1.25rem] px-3 py-4 text-sm font-medium",
            provider === "mtn_momo" ? "bg-mtn text-ink" : "bg-cream shadow-paper",
          )}
        >
          MTN MoMo
        </button>
      </div>

      <div className="mt-6">
        <Label htmlFor="phone">Numéro (6XX XXX XXX)</Label>
        <Input
          id="phone"
          inputMode="numeric"
          placeholder="6XX XXX XXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {pay.error ? <p className="mt-3 text-sm text-danger">{pay.error.message}</p> : null}
      <Button className="mt-6 w-full" disabled={pay.isPending} onClick={() => pay.mutate()}>
        {pay.isPending ? "Confirmation…" : `Payer ${formatFcfa(PLANS.find((p) => p.id === plan)?.price ?? 0)}`}
      </Button>
    </div>
  );
}
