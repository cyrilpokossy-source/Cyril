import { b as Navigate, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as getMe } from "./fns-D-CkUNCM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as useCurrentUserState, t as SynapseMark } from "./synapse-mark-DdDw2HWf.mjs";
import { t as RedirectToSignIn } from "./gates-BuYEgT5c.mjs";
import { a as Shield, c as Compass, l as ChartLine, n as UserRound, s as LayoutGrid, u as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BkCc_335.js
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse rounded-xl bg-paper-2", className) });
}
function AppShell({ children, requireParcours = true }) {
	const { user, isPending } = useCurrentUserState();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
		enabled: Boolean(user)
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper px-5 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-36" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-8 h-40 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-24 w-full" })
		]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const profile = me.data?.profile;
	const needsParcours = requireParcours && profile && (!profile.filiereId || !profile.niveau || !profile.semestre);
	if (me.isSuccess && needsParcours && path !== "/parcours") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/parcours" });
	const isAdmin = profile?.role === "admin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex items-center justify-between bg-paper/90 px-5 py-3.5 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "flex items-center gap-2 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SynapseMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold tracking-tight",
						children: "Synapse"
					})]
				}), profile?.filiere ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-[46%] truncate text-right text-[0.7rem] uppercase tracking-[0.14em] text-muted",
					children: [
						profile.filiere.shortName,
						" · N",
						profile.niveau,
						" · S",
						profile.semestre
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.7rem] uppercase tracking-[0.14em] text-muted",
					children: "FS · Douala"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full max-w-lg px-5 pt-2",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full max-w-lg items-center justify-around rounded-[22px] bg-ink px-2 py-2 text-cream shadow-[0_12px_40px_rgb(16_36_63/0.35)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockLink, {
							to: "/dashboard",
							label: "Atelier",
							icon: Compass,
							active: path === "/dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockLink, {
							to: "/modules",
							label: "Modules",
							icon: LayoutGrid,
							active: path.startsWith("/modules")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockLink, {
							to: "/progression",
							label: "Suivi",
							icon: ChartLine,
							active: path === "/progression"
						}),
						isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockLink, {
							to: "/admin",
							label: "Admin",
							icon: Shield,
							active: path.startsWith("/admin")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockLink, {
							to: "/abonnement",
							label: "Accès",
							icon: BookOpen,
							active: path === "/abonnement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockLink, {
							to: "/profil",
							label: "Profil",
							icon: UserRound,
							active: path === "/profil"
						})
					]
				})
			})
		]
	});
}
function DockLink({ to, label, icon: Icon, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[0.62rem] tracking-wide transition-colors duration-150", active ? "bg-cream/12 text-cream" : "text-cream/55 hover:text-cream"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			strokeWidth: 1.7
		}), label]
	});
}
//#endregion
export { Skeleton as n, AppShell as t };
