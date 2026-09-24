import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { o as Lock } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paywall-7dKhqqCw.js
var import_jsx_runtime = require_jsx_runtime();
function Paywall({ title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[1.75rem] bg-ink px-6 py-8 text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
				className: "size-5 text-signal-soft",
				strokeWidth: 1.6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-2xl font-semibold tracking-tight",
				children: title ?? "Contenu réservé aux abonnés"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[0.95rem] leading-relaxed text-cream/70",
				children: "Les cours, résumés, QCM et épreuves s’ouvrent après activation d’un accès — 2 000 FCFA / mois ou 10 000 FCFA le semestre, via Orange Money ou MTN MoMo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "paper",
				className: "mt-6 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/abonnement",
					children: "Activer mon semestre"
				})
			})
		]
	});
}
//#endregion
export { Paywall as t };
