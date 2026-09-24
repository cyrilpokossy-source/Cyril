import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { s as getCourseBundle, x as submitQcm } from "./fns-D-CkUNCM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
import { r as useCourseId } from "./router-Cn1Zpie7.mjs";
import { t as Paywall } from "./paywall-7dKhqqCw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modules._courseId.qcm-By5W0coh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LETTERS = [
	"A",
	"B",
	"C",
	"D"
];
function QcmPage() {
	const courseId = useCourseId();
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["course", courseId],
		queryFn: () => getCourseBundle({ data: { courseId } })
	});
	const [picks, setPicks] = (0, import_react.useState)({});
	const [result, setResult] = (0, import_react.useState)(null);
	const submit = useMutation({
		mutationFn: () => submitQcm({ data: {
			courseId,
			answers: Object.entries(picks).map(([questionId, selectedIndex]) => ({
				questionId: Number(questionId),
				selectedIndex
			}))
		} }),
		onSuccess: (res) => {
			setResult(res);
			qc.invalidateQueries({ queryKey: ["course", courseId] });
			qc.invalidateQueries({ queryKey: ["progress"] });
		}
	});
	const data = q.data;
	if (!data) return null;
	if (data.locked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {});
	if (result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("rounded-[1.6rem] px-5 py-6", result.passed ? "bg-signal text-signal-fg" : "bg-ink text-cream"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[0.68rem] uppercase tracking-[0.16em] opacity-80",
					children: ["Tentative ", result.attempt]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-display text-4xl font-semibold tabular-nums",
					children: [result.percent, "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm opacity-80",
					children: [
						result.score,
						" / ",
						result.total,
						" — ",
						result.passed ? "Seuil atteint" : "En dessous du seuil (50 %)"
					]
				})
			]
		}),
		result.showCorrection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-5 space-y-4",
			children: result.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[1.5rem] bg-cream p-5 shadow-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[0.68rem] tracking-[0.14em] text-muted",
						children: ["Question ", i + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium text-ink",
						children: item.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5 text-sm",
						children: item.options.map((opt, idx) => {
							const isRight = idx === item.correctIndex;
							const isPick = idx === item.selectedIndex;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: cn("rounded-xl px-3 py-2", isRight ? "bg-signal-soft text-signal" : isPick ? "bg-danger/10 text-danger" : "text-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-2 font-mono text-[0.7rem]",
									children: LETTERS[idx]
								}), opt]
							}, idx);
						})
					}),
					!item.isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-fg",
						children: item.explanation
					}) : null
				]
			}, item.questionId))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 text-sm text-muted",
			children: "Sans faute — les corrigés restent masqués."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className: "mt-6 w-full",
			onClick: () => {
				setResult(null);
				setPicks({});
			},
			children: "Recommencer"
		})
	] });
	const allAnswered = data.qcm.every((item) => picks[item.id] != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Répondez à chaque item. Score automatique — corrigé si échec ou 1 à 3 erreurs."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-5 space-y-5",
			children: data.qcm.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[1.5rem] bg-cream p-5 shadow-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[0.68rem] tracking-[0.14em] text-muted",
						children: [
							String(i + 1).padStart(2, "0"),
							" / ",
							String(data.qcm.length).padStart(2, "0")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[1.05rem] font-medium leading-snug text-ink",
						children: item.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-1 gap-2",
						children: item.options.map((opt, idx) => {
							const selected = picks[item.id] === idx;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setPicks((s) => ({
									...s,
									[item.id]: idx
								})),
								className: cn("flex min-h-12 items-start gap-3 rounded-2xl px-3 py-3 text-left text-sm leading-snug", selected ? "bg-ink text-cream" : "bg-paper text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-7 shrink-0 place-items-center rounded-full bg-black/10 font-mono text-[0.7rem] font-medium",
									children: LETTERS[idx]
								}), opt]
							}, idx);
						})
					})
				]
			}, item.id))
		}),
		submit.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-danger",
			children: submit.error.message
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-6 w-full",
			disabled: !allAnswered || submit.isPending,
			onClick: () => submit.mutate(),
			children: submit.isPending ? "Calcul du score…" : "Valider le QCM"
		})
	] });
}
//#endregion
export { QcmPage as component };
