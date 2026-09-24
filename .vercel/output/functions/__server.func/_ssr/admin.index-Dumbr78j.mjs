import { b as Navigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { c as getMe, l as listAdminCourses, u as listAdminStudents, v as setStudentRole, y as setSubscriptionStatus } from "./fns-D-CkUNCM.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
import { t as formatDateFr } from "./format-o_P4hdYy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-Dumbr78j.js
var import_jsx_runtime = require_jsx_runtime();
function AdminHome() {
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe()
	});
	const students = useQuery({
		queryKey: ["admin-students"],
		queryFn: () => listAdminStudents(),
		enabled: me.data?.profile.role === "admin"
	});
	const courses = useQuery({
		queryKey: ["admin-courses"],
		queryFn: () => listAdminCourses(),
		enabled: me.data?.profile.role === "admin"
	});
	const qc = useQueryClient();
	const subMut = useMutation({
		mutationFn: (input) => setSubscriptionStatus({ data: input }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-students"] })
	});
	const roleMut = useMutation({
		mutationFn: (input) => setStudentRole({ data: input }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-students"] })
	});
	if (me.isSuccess && me.data.profile.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/profil" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.18em] text-muted",
			children: "Gestion"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight text-ink",
			children: "Administration"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Catalogue, étudiants, abonnements."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-xl font-semibold text-ink",
			children: "Modules"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/module/$courseId",
			params: { courseId: "new" },
			className: "mt-3 inline-flex min-h-11 items-center text-sm text-signal",
			children: "Ajouter un module"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: (courses.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/module/$courseId",
				params: { courseId: String(c.id) },
				className: "flex items-start justify-between gap-3 rounded-[1.25rem] bg-cream px-4 py-3 shadow-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block font-mono text-[0.68rem] tracking-[0.12em] text-muted",
					children: [
						c.filiere_name,
						" · N",
						c.niveau,
						"S",
						c.semestre,
						" · ",
						c.code
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg font-semibold text-ink",
					children: c.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-right text-[0.7rem] text-muted",
					children: [
						c.qcm,
						" QCM",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						c.exercices,
						" ex. · ",
						c.exams,
						" épr."
					]
				})]
			}) }, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-xl font-semibold text-ink",
			children: "Étudiants"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: (students.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[1.35rem] bg-cream p-4 shadow-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold text-ink",
						children: s.displayName ?? s.email ?? s.userId.slice(0, 8)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							s.filiereName ?? "Parcours incomplet",
							" · N",
							s.niveau ?? "—",
							" S",
							s.semestre ?? "—",
							" · ",
							s.completed,
							"/",
							s.modules,
							" modules"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: s.subStatus === "active" ? `Abonnement actif${s.subExpires ? ` · ${formatDateFr(s.subExpires)}` : ""}` : s.subStatus === "expired" ? "Expiré" : "Sans abonnement"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => subMut.mutate({
								userId: s.userId,
								status: s.subStatus === "active" ? "expired" : "active"
							}),
							children: s.subStatus === "active" ? "Expirer" : "Activer 6 mois"
						}), s.role !== "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => roleMut.mutate({
								userId: s.userId,
								role: "admin"
							}),
							children: "Promouvoir admin"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 py-2 text-xs uppercase tracking-[0.12em] text-muted",
							children: "Admin"
						})]
					})
				]
			}, s.userId))
		})
	] });
}
//#endregion
export { AdminHome as component };
