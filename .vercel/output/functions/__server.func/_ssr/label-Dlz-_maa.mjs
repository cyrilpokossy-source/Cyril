import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-Dlz-_maa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("h-11 w-full rounded-xl bg-cream px-3.5 text-[0.95rem] text-fg shadow-[inset_0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] duration-150 placeholder:text-faint focus:shadow-[inset_0_0_0_1.5px_var(--color-ink)]", className),
	...props
}));
Input.displayName = "Input";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted", className),
		...props
	});
}
//#endregion
export { Label as n, Input as t };
