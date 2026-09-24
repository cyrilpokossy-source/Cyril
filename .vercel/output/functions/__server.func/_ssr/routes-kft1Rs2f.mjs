import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useCurrentUserState, t as SynapseMark } from "./synapse-mark-DdDw2HWf.mjs";
import { n as SignedIn, r as SignedOut } from "./gates-BuYEgT5c.mjs";
import { d as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kft1Rs2f.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-ink text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute -right-24 top-16 size-80 rounded-full bg-ink-soft/50"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-lg flex-col px-6 pb-10 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SynapseMark, {
							inverted: true,
							className: "size-8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-semibold",
							children: "Synapse"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.68rem] uppercase tracking-[0.18em] text-cream/55",
						children: "FS · Udla"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-16 text-[0.72rem] uppercase tracking-[0.22em] text-signal-soft",
					children: "Faculté des Sciences"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 font-display text-[3.15rem] font-semibold leading-[0.95] tracking-[-0.03em]",
					children: [
						"Réviser",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"autrement."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-[34ch] text-[1.05rem] leading-relaxed text-cream/72",
					children: "Cours, résumés, exercices, QCM et anciennes épreuves — pour les étudiants de Douala, filière par filière, semestre par semestre."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-10 space-y-0 border-t border-cream/15",
					children: [
						["01", "Biologie des organismes animaux"],
						["02", "Biologie des organismes végétaux"],
						["03", "Biochimie"]
					].map(([n, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-4 border-b border-cream/15 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[0.7rem] tracking-[0.16em] text-signal-soft",
							children: n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 font-display text-lg font-medium leading-snug",
							children: name
						})]
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-cream/50",
					children: "Niveaux 1 et 2 · deux semestres"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto pt-12",
					children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-full animate-pulse rounded-[14px] bg-cream/10" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						className: "flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-cream text-ink font-medium",
						children: ["Entrer dans l’atelier", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard",
						className: "flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-cream text-ink font-medium",
						children: ["Continuer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
					}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-[0.72rem] text-cream/40",
						children: "Université de Douala · accès 2 000 FCFA / mois"
					})]
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
