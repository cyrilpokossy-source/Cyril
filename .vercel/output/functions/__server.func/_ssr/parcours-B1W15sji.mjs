import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { d as listFilieres, g as saveParcours } from "./fns-D-CkUNCM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as AppShell } from "./app-shell-BkCc_335.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parcours-B1W15sji.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ParcoursPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		requireParcours: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParcoursForm, {})
	});
}
function ParcoursForm() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const filieres = useQuery({
		queryKey: ["filieres"],
		queryFn: () => listFilieres()
	});
	const [filiereId, setFiliereId] = (0, import_react.useState)(null);
	const [niveau, setNiveau] = (0, import_react.useState)(null);
	const [semestre, setSemestre] = (0, import_react.useState)(null);
	const save = useMutation({
		mutationFn: () => saveParcours({ data: {
			filiereId,
			niveau,
			semestre
		} }),
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: ["me"] });
			await navigate({ to: "/dashboard" });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.18em] text-muted",
			children: "Étape obligatoire"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight text-ink",
			children: "Votre parcours"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "Filière, niveau, semestre — le catalogue et les QCM s’alignent dessus."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[0.68rem] uppercase tracking-[0.16em] text-muted",
				children: "Filière"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: (filieres.data ?? []).map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFiliereId(f.id),
					className: cn("w-full rounded-[1.35rem] px-4 py-4 text-left transition-colors duration-150", filiereId === f.id ? "bg-ink text-cream" : "bg-cream text-fg shadow-paper"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[0.68rem] tracking-[0.14em] opacity-70",
							children: [
								"0",
								i + 1,
								" · ",
								f.shortName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block font-display text-lg font-semibold leading-snug",
							children: f.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-1 block text-sm leading-relaxed", filiereId === f.id ? "text-cream/70" : "text-muted"),
							children: f.description
						})
					]
				}, f.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[0.68rem] uppercase tracking-[0.16em] text-muted",
				children: "Niveau"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [1, 2].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setNiveau(n),
					className: cn("rounded-[1.25rem] px-4 py-5 text-left", niveau === n ? "bg-ink text-cream" : "bg-cream shadow-paper"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-semibold",
						children: n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm opacity-70",
						children: n === 1 ? "Fondations" : "Approfondissement"
					})]
				}, n))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[0.68rem] uppercase tracking-[0.16em] text-muted",
				children: "Semestre"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [1, 2].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSemestre(n),
					className: cn("rounded-[1.25rem] px-4 py-5 text-left", semestre === n ? "bg-ink text-cream" : "bg-cream shadow-paper"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-2xl font-semibold",
						children: ["S", n]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm opacity-70",
						children: n === 1 ? "Octobre — février" : "Mars — juillet"
					})]
				}, n))
			})]
		}),
		save.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-danger",
			children: save.error.message
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-8 w-full",
			disabled: !filiereId || !niveau || !semestre || save.isPending,
			onClick: () => save.mutate(),
			children: save.isPending ? "Enregistrement…" : "Ouvrir l’atelier"
		})
	] });
}
//#endregion
export { ParcoursPage as component };
