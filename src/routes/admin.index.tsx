import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getMe, listAdminCourses, listAdminStudents, setStudentRole, setSubscriptionStatus } from "@/lib/server/fns";
import { formatDateFr } from "@/lib/format";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  const me = useQuery({ queryKey: ["me"], queryFn: () => getMe() });
  const students = useQuery({
    queryKey: ["admin-students"],
    queryFn: () => listAdminStudents(),
    enabled: me.data?.profile.role === "admin",
  });
  const courses = useQuery({
    queryKey: ["admin-courses"],
    queryFn: () => listAdminCourses(),
    enabled: me.data?.profile.role === "admin",
  });
  const qc = useQueryClient();
  const subMut = useMutation({
    mutationFn: (input: { userId: string; status: "active" | "expired" }) => setSubscriptionStatus({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-students"] }),
  });
  const roleMut = useMutation({
    mutationFn: (input: { userId: string; role: "student" | "admin" }) => setStudentRole({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-students"] }),
  });

  if (me.isSuccess && me.data.profile.role !== "admin") {
    return <Navigate to="/profil" />;
  }

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Gestion</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Administration</h1>
      <p className="mt-2 text-sm text-muted">Catalogue, étudiants, abonnements.</p>

      <h2 className="mt-8 font-display text-xl font-semibold text-ink">Modules</h2>
      <Link to="/admin/module/$courseId" params={{ courseId: "new" }} className="mt-3 inline-flex min-h-11 items-center text-sm text-signal">
        Ajouter un module
      </Link>
      <ul className="mt-3 space-y-2">
        {(courses.data ?? []).map((c) => (
          <li key={c.id}>
            <Link
              to="/admin/module/$courseId"
              params={{ courseId: String(c.id) }}
              className="flex items-start justify-between gap-3 rounded-[1.25rem] bg-cream px-4 py-3 shadow-paper"
            >
              <span>
                <span className="block font-mono text-[0.68rem] tracking-[0.12em] text-muted">
                  {c.filiere_name} · N{c.niveau}S{c.semestre} · {c.code}
                </span>
                <span className="font-display text-lg font-semibold text-ink">{c.title}</span>
              </span>
              <span className="shrink-0 text-right text-[0.7rem] text-muted">
                {c.qcm} QCM
                <br />
                {c.exercices} ex. · {c.exams} épr.
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Étudiants</h2>
      <ul className="mt-3 space-y-3">
        {(students.data ?? []).map((s) => (
          <li key={s.userId} className="rounded-[1.35rem] bg-cream p-4 shadow-paper">
            <p className="font-display text-lg font-semibold text-ink">{s.displayName ?? s.email ?? s.userId.slice(0, 8)}</p>
            <p className="text-sm text-muted">
              {s.filiereName ?? "Parcours incomplet"} · N{s.niveau ?? "—"} S{s.semestre ?? "—"} · {s.completed}/{s.modules} modules
            </p>
            <p className="mt-1 text-sm">
              {s.subStatus === "active"
                ? `Abonnement actif${s.subExpires ? ` · ${formatDateFr(s.subExpires)}` : ""}`
                : s.subStatus === "expired"
                  ? "Expiré"
                  : "Sans abonnement"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  subMut.mutate({
                    userId: s.userId,
                    status: s.subStatus === "active" ? "expired" : "active",
                  })
                }
              >
                {s.subStatus === "active" ? "Expirer" : "Activer 6 mois"}
              </Button>
              {s.role !== "admin" ? (
                <Button size="sm" variant="ghost" onClick={() => roleMut.mutate({ userId: s.userId, role: "admin" })}>
                  Promouvoir admin
                </Button>
              ) : (
                <span className="px-2 py-2 text-xs uppercase tracking-[0.12em] text-muted">Admin</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
