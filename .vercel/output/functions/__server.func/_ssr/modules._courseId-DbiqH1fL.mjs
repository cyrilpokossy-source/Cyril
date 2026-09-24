import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useParams, f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { s as getCourseBundle, t as askModuleAi } from "./fns-D-CkUNCM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { f as ArrowLeft, i as Sparkles, t as X } from "../_libs/lucide-react.mjs";
import { n as Skeleton, t as AppShell } from "./app-shell-BkCc_335.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
import { t as Textarea } from "./textarea-BCe6Af0V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modules._courseId-DbiqH1fL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		to: (id) => `/modules/${id}`,
		key: "cours",
		label: "Cours"
	},
	{
		to: (id) => `/modules/${id}/resume`,
		key: "resume",
		label: "Résumé"
	},
	{
		to: (id) => `/modules/${id}/exercices`,
		key: "exercices",
		label: "Exercices"
	},
	{
		to: (id) => `/modules/${id}/qcm`,
		key: "qcm",
		label: "QCM"
	},
	{
		to: (id) => `/modules/${id}/epreuves`,
		key: "epreuves",
		label: "Épreuves"
	}
];
function ModuleChrome({ course }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/modules",
				className: "inline-flex min-h-11 items-center gap-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Modules"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-[0.72rem] tracking-[0.16em] text-signal",
				children: course.code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-ink",
				children: course.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					course.hours,
					" h · ",
					course.description
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex gap-1 overflow-x-auto pb-1",
				children: TABS.map((tab) => {
					const href = tab.to(course.id);
					const active = tab.key === "cours" ? path === href : path.startsWith(href);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: href,
						className: cn("shrink-0 rounded-full px-3.5 py-2 text-sm transition-colors duration-150", active ? "bg-ink text-cream" : "text-muted hover:bg-paper-2"),
						children: tab.label
					}, tab.key);
				})
			})
		]
	});
}
function AiDock({ courseId, unlocked }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)(null);
	const mut = useMutation({
		mutationFn: () => askModuleAi({ data: {
			courseId,
			question
		} }),
		onSuccess: (res) => {
			if (res.ok) setAnswer(res.text);
			else setAnswer(res.error);
		},
		onError: (err) => setAnswer(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: "fixed bottom-24 right-4 z-30 flex size-11 items-center justify-center rounded-full bg-ink text-cream shadow-[0_8px_24px_rgb(16_36_63/0.28)] md:right-[calc(50%-11.5rem)]",
		"aria-label": "Question d’approfondissement",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
			className: "size-4",
			strokeWidth: 1.6
		})
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-[1.75rem] bg-cream p-5 shadow-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.68rem] uppercase tracking-[0.16em] text-muted",
					children: "Dernier recours"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-semibold text-ink",
					children: "Approfondir"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					className: "grid size-10 place-items-center rounded-xl text-muted",
					"aria-label": "Fermer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Une question précise, après le cours et les corrigés — pas un substitut."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-4",
					rows: 3,
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					placeholder: "Ex. Pourquoi la RuBisCO confond-elle O2 et CO2 ?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					disabled: mut.isPending || question.trim().length < 8,
					onClick: () => {
						setAnswer(null);
						mut.mutate();
					},
					children: mut.isPending ? "Réflexion…" : "Demander"
				}),
				answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[0.95rem] leading-relaxed text-fg",
					children: answer
				}) : null
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 text-sm leading-relaxed text-muted"),
				children: "L’assistant s’ouvre après lecture du cours, du résumé, et d’un corrigé (QCM ou exercice)."
			})]
		})
	}) : null] });
}
function useCourseId() {
	const { courseId } = useParams({ from: "/modules/$courseId" });
	return Number(courseId);
}
function CourseLayout() {
	const courseId = useCourseId();
	const q = useQuery({
		queryKey: ["course", courseId],
		queryFn: () => getCourseBundle({ data: { courseId } }),
		enabled: Number.isFinite(courseId)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: q.isLoading || !q.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" })
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleChrome, { course: q.data.course }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiDock, {
			courseId,
			unlocked: q.data.progress.viewedCourse && q.data.progress.viewedResume && q.data.progress.viewedCorrections
		})
	] }) });
}
//#endregion
export { CourseLayout as component, useCourseId };
