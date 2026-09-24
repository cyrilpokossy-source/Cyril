import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DBkZymfX.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressBar({ value, className, trackClassName }) {
	const v = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-paper-2", className),
		role: "progressbar",
		"aria-valuenow": Math.round(v),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full bg-signal transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", trackClassName),
			style: { width: `${v}%` }
		})
	});
}
//#endregion
export { ProgressBar as t };
