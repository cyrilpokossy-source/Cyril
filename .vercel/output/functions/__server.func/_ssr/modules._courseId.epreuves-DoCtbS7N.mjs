import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { p as markProgress, s as getCourseBundle } from "./fns-D-CkUNCM.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
import { r as useCourseId } from "./router-Cn1Zpie7.mjs";
import { t as NoteBody } from "./note-body-DE6j8rxH.mjs";
import { t as Paywall } from "./paywall-7dKhqqCw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modules._courseId.epreuves-DoCtbS7N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExamsPage() {
	const courseId = useCourseId();
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["course", courseId],
		queryFn: () => getCourseBundle({ data: { courseId } })
	});
	const [show, setShow] = (0, import_react.useState)({});
	const mark = useMutation({
		mutationFn: (field) => markProgress({ data: {
			courseId,
			field
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["course", courseId] });
			qc.invalidateQueries({ queryKey: ["progress"] });
		}
	});
	const data = q.data;
	(0, import_react.useEffect)(() => {
		if (data && !data.locked && !data.progress.viewedExams && data.exams.length) mark.mutate("exams");
	}, [data?.course.id, data?.locked]);
	if (!data) return null;
	if (data.locked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {});
	if (!data.exams.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-[1.5rem] bg-cream p-6 text-sm leading-relaxed text-muted shadow-paper",
		children: "Aucune ancienne épreuve n’est encore versée pour ce module."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-4",
		children: data.exams.map((exam) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-[1.5rem] bg-cream p-5 shadow-paper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.68rem] tracking-[0.14em] text-signal",
					children: exam.year
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-xl font-semibold text-ink",
					children: exam.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBody, {
					className: "mt-4",
					text: exam.content
				}),
				show[exam.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-2xl bg-paper-2 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.68rem] uppercase tracking-[0.14em] text-muted",
						children: "Corrigé"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBody, {
						className: "mt-2",
						text: exam.correction
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-4",
					onClick: () => {
						setShow((s) => ({
							...s,
							[exam.id]: true
						}));
						mark.mutate("corrections");
					},
					children: "Afficher le corrigé"
				})
			]
		}, exam.id))
	});
}
//#endregion
export { ExamsPage as component };
