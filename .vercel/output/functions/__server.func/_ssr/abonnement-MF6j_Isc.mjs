import { o as __toESM } from "../_runtime.mjs";
import { t as PLANS } from "./types-DnLBLQDg.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { b as startSubscription, c as getMe } from "./fns-D-CkUNCM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as AppShell } from "./app-shell-BkCc_335.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
import { n as Label, t as Input } from "./label-Dlz-_maa.mjs";
import { n as formatFcfa, t as formatDateFr } from "./format-o_P4hdYy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/abonnement-MF6j_Isc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SubPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubBody, {}) });
}
function SubBody() {
	const qc = useQueryClient();
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe()
	});
	const [plan, setPlan] = (0, import_react.useState)("semester");
	const [provider, setProvider] = (0, import_react.useState)("orange_money");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const pay = useMutation({
		mutationFn: () => startSubscription({ data: {
			plan,
			provider,
			phone
		} }),
		onSuccess: async () => {
			setDone(true);
			await qc.invalidateQueries({ queryKey: ["me"] });
		}
	});
	const sub = me.data?.subscription;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.18em] text-muted",
			children: "Orange Money · MTN MoMo"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight text-ink",
			children: "Abonnement"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "Paiement mobile money (Campay / CinetPay en production). Ici, la confirmation du numéro active immédiatement l’accès au semestre choisi."
		}),
		sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-[1.5rem] bg-signal px-5 py-5 text-signal-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.68rem] uppercase tracking-[0.14em] opacity-80",
					children: "Actif"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-2xl font-semibold",
					children: ["Jusqu’au ", formatDateFr(sub.expiresAt)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm opacity-80",
					children: [
						formatFcfa(sub.amountFcfa),
						" · ",
						sub.plan === "monthly" ? "mensuel" : "semestriel"
					]
				})
			]
		}) : null,
		done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-signal",
			children: "Paiement confirmé. Les modules sont ouverts."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-1 gap-3",
			children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setPlan(p.id),
				className: cn("rounded-[1.45rem] px-5 py-5 text-left", plan === p.id ? "bg-ink text-cream" : "bg-cream shadow-paper"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold",
						children: p.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: formatFcfa(p.price)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 text-sm", plan === p.id ? "text-cream/70" : "text-muted"),
					children: p.hint
				})]
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setProvider("orange_money"),
				className: cn("rounded-[1.25rem] px-3 py-4 text-sm font-medium", provider === "orange_money" ? "bg-orange-money text-cream" : "bg-cream shadow-paper"),
				children: "Orange Money"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setProvider("mtn_momo"),
				className: cn("rounded-[1.25rem] px-3 py-4 text-sm font-medium", provider === "mtn_momo" ? "bg-mtn text-ink" : "bg-cream shadow-paper"),
				children: "MTN MoMo"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "phone",
				children: "Numéro (6XX XXX XXX)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "phone",
				inputMode: "numeric",
				placeholder: "6XX XXX XXX",
				value: phone,
				onChange: (e) => setPhone(e.target.value)
			})]
		}),
		pay.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-danger",
			children: pay.error.message
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-6 w-full",
			disabled: pay.isPending,
			onClick: () => pay.mutate(),
			children: pay.isPending ? "Confirmation…" : `Payer ${formatFcfa(PLANS.find((p) => p.id === plan)?.price ?? 0)}`
		})
	] });
}
//#endregion
export { SubPage as component };
