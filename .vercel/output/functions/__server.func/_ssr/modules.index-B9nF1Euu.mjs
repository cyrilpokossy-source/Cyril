import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { f as listMyProgress } from "./fns-D-CkUNCM.mjs";
import { n as Skeleton, t as AppShell } from "./app-shell-BkCc_335.mjs";
import { t as ProgressBar } from "./progress-DBkZymfX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modules.index-B9nF1Euu.js
var import_jsx_runtime = require_jsx_runtime();
function ModulesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulesBody, {}) });
}
function ModulesBody() {
	const q = useQuery({
		queryKey: ["progress"],
		queryFn: () => listMyProgress()
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full" })]
	});
	const rows = q.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.18em] text-muted",
			children: "Catalogue"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight text-ink",
			children: "Modules"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Cours, résumé, entraînement, QCM, copies."
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
				const pct = Math.round(bits.filter(Boolean).length / bits.length * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/modules/$courseId",
					params: { courseId: String(row.course.id) },
					className: "block rounded-[1.5rem] bg-cream p-5 shadow-paper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.68rem] tracking-[0.14em] text-signal",
								children: row.course.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-xl font-semibold leading-snug text-ink",
								children: row.course.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-sm text-muted",
								children: [row.course.hours, " h"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: row.course.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
							value: pct,
							className: "mt-4"
						})
					]
				}) }, row.course.id);
			})
		})
	] });
}
//#endregion
export { ModulesPage as component };
