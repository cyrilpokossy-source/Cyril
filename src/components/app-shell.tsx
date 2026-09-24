import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { BookOpen, Compass, LayoutGrid, LineChart, Shield, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/server/fns";
import { SynapseMark } from "./synapse-mark";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export function AppShell({
  children,
  requireParcours = true,
}: {
  children: ReactNode;
  requireParcours?: boolean;
}) {
  const { user, isPending } = useCurrentUserState();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const me = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    enabled: Boolean(user),
  });

  if (isPending) {
    return (
      <div className="min-h-dvh bg-paper px-5 pt-10">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="mt-8 h-40 w-full" />
        <Skeleton className="mt-4 h-24 w-full" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const profile = me.data?.profile;
  const needsParcours =
    requireParcours && profile && (!profile.filiereId || !profile.niveau || !profile.semestre);
  if (me.isSuccess && needsParcours && path !== "/parcours") {
    return <Navigate to="/parcours" />;
  }

  const isAdmin = profile?.role === "admin";

  return (
    <div className="min-h-dvh bg-paper pb-28">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-paper/90 px-5 py-3.5 backdrop-blur-md">
        <Link to="/dashboard" className="flex items-center gap-2 text-ink">
          <SynapseMark className="size-7" />
          <span className="font-display text-lg font-semibold tracking-tight">Synapse</span>
        </Link>
        {profile?.filiere ? (
          <p className="max-w-[46%] truncate text-right text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            {profile.filiere.shortName} · N{profile.niveau} · S{profile.semestre}
          </p>
        ) : (
          <span className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">FS · Douala</span>
        )}
      </header>
      <div className="mx-auto w-full max-w-lg px-5 pt-2">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))]">
        <div className="flex w-full max-w-lg items-center justify-around rounded-[22px] bg-ink px-2 py-2 text-cream shadow-[0_12px_40px_rgb(16_36_63/0.35)]">
          <DockLink to="/dashboard" label="Atelier" icon={Compass} active={path === "/dashboard"} />
          <DockLink to="/modules" label="Modules" icon={LayoutGrid} active={path.startsWith("/modules")} />
          <DockLink to="/progression" label="Suivi" icon={LineChart} active={path === "/progression"} />
          {isAdmin ? (
            <DockLink to="/admin" label="Admin" icon={Shield} active={path.startsWith("/admin")} />
          ) : (
            <DockLink to="/abonnement" label="Accès" icon={BookOpen} active={path === "/abonnement"} />
          )}
          <DockLink to="/profil" label="Profil" icon={UserRound} active={path === "/profil"} />
        </div>
      </nav>
    </div>
  );
}

function DockLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Compass;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[0.62rem] tracking-wide transition-colors duration-150",
        active ? "bg-cream/12 text-cream" : "text-cream/55 hover:text-cream",
      )}
    >
      <Icon className="size-4" strokeWidth={1.7} />
      {label}
    </Link>
  );
}
