import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { SynapseMark } from "@/components/synapse-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: Login });

function explainAuthError(err: unknown): string {
  const raw =
    err && typeof err === "object" && "message" in err && typeof err.message === "string"
      ? err.message
      : "";
  const status =
    err && typeof err === "object" && "status" in err && typeof err.status === "number"
      ? err.status
      : undefined;
  const lower = raw.toLowerCase();
  if (status === 403 || lower.includes("invalid origin") || lower.includes("forbidden")) {
    return "Connexion bloquée pour cette adresse. Utilisez Google, ou ouvrez l’app depuis son lien officiel.";
  }
  if (lower.includes("invalid email") || lower.includes("invalid password")) {
    return "E-mail ou mot de passe incorrect.";
  }
  if (lower.includes("unable to get user info") || lower.includes("oauth")) {
    return "Google n’a pas pu finaliser la session. Réessayez, ou créez un compte e-mail.";
  }
  return raw || "Une erreur est survenue";
}

function Login() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isPending && user) {
    void navigate({ to: "/dashboard" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0],
        });
        if (res.error) throw Object.assign(new Error(res.error.message || "Inscription impossible"), { status: res.error.status });
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw Object.assign(new Error(res.error.message || "Identifiants incorrects"), { status: res.error.status });
      }
      await navigate({ to: "/dashboard" });
    } catch (err) {
      setError(explainAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  async function onSocial(providerId: string) {
    setError(null);
    setBusy(true);
    try {
      await signIn(providerId, { callbackURL: "/dashboard", errorCallbackURL: "/login" });
    } catch (err) {
      setError(explainAuthError(err));
      setBusy(false);
    }
  }

  const google = GROK_PROVIDERS.find((p) => p.idp === "google");
  const others = GROK_PROVIDERS.filter((p) => p.idp !== "google");

  return (
    <main className="min-h-dvh bg-paper px-6 py-10">
      <div className="mx-auto w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-ink">
          <SynapseMark className="size-7" />
          <span className="font-display text-lg font-semibold">Synapse</span>
        </Link>
        <h1 className="mt-10 font-display text-3xl font-semibold tracking-tight text-ink">
          {mode === "in" ? "Connexion" : "Créer un compte"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {mode === "in"
            ? "Google en un clic, ou votre e-mail. Puis le semestre s’ouvre."
            : "Un e-mail suffit. Vous choisirez filière et niveau ensuite."}
        </p>

        {authEnabled ? (
          <>
            {google ? (
              <Button
                type="button"
                className="mt-8 w-full"
                disabled={busy}
                onClick={() => void onSocial(google.providerId)}
              >
                Continuer avec Google
              </Button>
            ) : null}

            {others.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="mt-2 w-full"
                disabled={busy}
                onClick={() => void onSocial(p.providerId)}
              >
                Continuer avec {p.label}
              </Button>
            ))}

            <div className="mt-8 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-faint">
              <span className="h-px flex-1 bg-line" />
              ou e-mail
              <span className="h-px flex-1 bg-line" />
            </div>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              {mode === "up" ? (
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              ) : null}
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" variant="outline" className="w-full" disabled={busy}>
                {busy ? "Veuillez patienter…" : mode === "in" ? "Entrer avec e-mail" : "S’inscrire"}
              </Button>
            </form>

            <button
              type="button"
              className="mt-4 w-full text-center text-sm text-muted"
              onClick={() => {
                setMode(mode === "in" ? "up" : "in");
                setError(null);
              }}
            >
              {mode === "in" ? "Pas encore de compte ? Inscription" : "Déjà inscrit ? Connexion"}
            </button>
          </>
        ) : (
          <p className="mt-8 text-sm text-muted">Connexion indisponible.</p>
        )}
      </div>
    </main>
  );
}
