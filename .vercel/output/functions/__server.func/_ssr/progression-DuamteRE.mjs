import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { f as listMyProgress } from "./fns-D-CkUNCM.mjs";
import { n as Skeleton, t as AppShell } from "./app-shell-BkCc_335.mjs";
import { t as ProgressBar } from "./progress-DBkZymfX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progression-DuamteRE.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressionPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressionBody, {}) });
}
function ProgressionBody() {
	const q = useQuery({
		queryKey: ["progress"],
		queryFn: () => listMyProgress()
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" });
	const rows = q.data ?? [];
	const done = rows.filter((r) => r.progress.completed).length;
	const scores = rows.map((r) => r.progress.qcmScore).filter((n) => n != null);
	const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.18em] text-muted",
			children: "Tableau"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight text-ink",
			children: "Progression"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Modules faits",
				value: `${done}/${rows.length}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Moyenne QCM",
				value: avg == null ? "—" : `${avg}%`
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: rows.map((row) => {
				const bits = [
					row.progress.viewedCourse,
					row.progress.viewedResume,
					row.progress.viewedExercises,
					row.progress.viewedQcm
				];
				const pct = Math.round(bits.filter(Boolean).length / 4 * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[1.4rem] bg-cream p-4 shadow-paper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/modules/$courseId",
								params: { courseId: String(row.course.id) },
								className: "font-display text-lg font-semibold text-ink",
								children: row.course.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-sm text-muted",
								children: row.progress.qcmScore != null ? `${row.progress.qcmScore}%` : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
							value: pct,
							className: "mt-3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[0.75rem] uppercase tracking-[0.12em] text-faint",
							children: row.progress.completed ? "Terminé" : `${row.progress.qcmAttempts} tentative${row.progress.qcmAttempts > 1 ? "s" : ""}`
						})
					]
				}, row.course.id);
			})
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[1.4rem] bg-cream p-4 shadow-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.14em] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl font-semibold tabular-nums text-ink",
			children: value
		})]
	});
}
//#endregion
export { ProgressionPage as component };
