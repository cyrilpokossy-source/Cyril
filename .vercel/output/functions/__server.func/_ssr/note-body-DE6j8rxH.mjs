import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/note-body-DE6j8rxH.js
var import_jsx_runtime = require_jsx_runtime();
function inline(text) {
	return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) => p.startsWith("**") && p.endsWith("**") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.slice(2, -2) }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p }, i));
}
function NoteBody({ text, className }) {
	const blocks = text.trim().split(/\n{2,}/);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("prose-note", className),
		children: blocks.map((block, i) => {
			const lines = block.split("\n");
			if (lines[0]?.startsWith("## ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: lines[0].slice(3) }), lines.slice(1).join(" ").trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: inline(lines.slice(1).join(" ")) }) : null] }, i);
			if (lines.every((l) => l.trim().startsWith("- "))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: lines.map((l, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(l.replace(/^- /, "")) }, j)) }, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: inline(block.replace(/\n/g, " ")) }, i);
		})
	});
}
//#endregion
export { NoteBody as t };
