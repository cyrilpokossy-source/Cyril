import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { p as markProgress, s as getCourseBundle } from "./fns-D-CkUNCM.mjs";
import { r as useCourseId } from "./router-Cn1Zpie7.mjs";
import { t as NoteBody } from "./note-body-DE6j8rxH.mjs";
import { t as Paywall } from "./paywall-7dKhqqCw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modules._courseId.index-pmOba-Au.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursePage() {
	const courseId = useCourseId();
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["course", courseId],
		queryFn: () => getCourseBundle({ data: { courseId } })
	});
	const mark = useMutation({
		mutationFn: () => markProgress({ data: {
			courseId,
			field: "course"
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["course", courseId] });
			qc.invalidateQueries({ queryKey: ["progress"] });
		}
	});
	const data = q.data;
	(0, import_react.useEffect)(() => {
		if (data && !data.locked && !data.progress.viewedCourse) mark.mutate();
	}, [data?.course.id, data?.locked]);
	if (!data) return null;
	if (data.locked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paywall, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "rounded-[1.6rem] bg-cream px-5 py-6 shadow-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBody, { text: data.course.content })
	});
}
//#endregion
export { CoursePage as component };
