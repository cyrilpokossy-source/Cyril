import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as getMe, f as listMyProgress } from "./fns-D-CkUNCM.mjs";
import { n as Skeleton, t as AppShell } from "./app-shell-BkCc_335.mjs";
import { a as semestreLabel, t as formatDateFr } from "./format-o_P4hdYy.mjs";
import { t as ProgressBar } from "./progress-DBkZymfX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-zWXrNY4o.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardBody, {}) });
}
function DashboardBody() {
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe()
	});
	const progress = useQuery({
		queryKey: ["progress"],
		queryFn: () => listMyProgress()
	});
	const profile = me.data?.profile;
	const sub = me.data?.subscription;
	const rows = progress.data ?? [];
	const done = rows.filter((r) => r.progress.completed).length;
	const pct = rows.length ? Math.round(done / rows.length * 100) : 0;
	const n1 = profile?.niveau === 1;
	if (me.isLoading || progress.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full" })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.18em] text-muted",
			children: n1 ? "Fondations" : "Approfondissement"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-2 font-display text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-ink",
			children: [n1 ? "Niveau 1" : "Niveau 2", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[1.35rem] font-medium text-ink-soft",
				children: semestreLabel(profile?.semestre ?? null)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 max-w-[40ch] text-sm leading-relaxed text-muted",
			children: [
				profile?.filiere?.name,
				".",
				" ",
				n1 ? "Posez les bases : lisez, résumez, puis affrontez le QCM." : "Visez l’épreuve : cas, anciennes copies, et scores au-dessus de 50 %."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-[1.6rem] bg-cream p-5 shadow-paper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.68rem] uppercase tracking-[0.16em] text-muted",
						children: "Semestre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-3xl font-semibold tabular-nums text-ink",
						children: [pct, "%"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
					value: pct,
					className: "mt-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						done,
						" module",
						done > 1 ? "s" : "",
						" terminé",
						done > 1 ? "s" : "",
						" sur ",
						rows.length
					]
				})
			]
		}),
		!sub && profile?.role !== "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/abonnement",
			className: "mt-4 flex items-center justify-between rounded-[1.4rem] bg-ink px-5 py-4 text-cream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[0.68rem] uppercase tracking-[0.14em] text-cream/55",
				children: "Accès"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg font-semibold",
				children: "Activer le semestre"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-cream/70",
				children: "2 000 FCFA"
			})]
		}) : sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-signal",
			children: ["Accès actif jusqu’au ", formatDateFr(sub.expiresAt)]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-xl font-semibold text-ink",
			children: "Fil d’étude"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative mt-4 ml-3 border-l border-line",
			children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative pb-7 pl-6 last:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -left-[5px] top-1.5 size-2.5 rounded-full ${row.progress.completed ? "bg-signal" : "bg-paper-2 shadow-[0_0_0_1px_var(--color-line)]"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/modules/$courseId",
					params: { courseId: String(row.course.id) },
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[0.68rem] tracking-[0.14em] text-faint",
							children: [
								String(i + 1).padStart(2, "0"),
								" · ",
								row.course.code
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block font-display text-lg font-semibold leading-snug text-ink",
							children: row.course.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: row.progress.completed ? "Terminé" : row.progress.qcmScore != null ? `QCM ${row.progress.qcmScore} %` : "À ouvrir"
						})
					]
				})]
			}, row.course.id))
		})
	] });
}
//#endregion
export { DashboardPage as component };
