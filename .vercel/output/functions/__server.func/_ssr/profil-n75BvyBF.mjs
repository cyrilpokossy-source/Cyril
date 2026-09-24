import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { S as updateProfile, c as getMe, n as claimAdmin } from "./fns-D-CkUNCM.mjs";
import { n as useCurrentUser } from "./synapse-mark-DdDw2HWf.mjs";
import { i as UserButton } from "./gates-BuYEgT5c.mjs";
import { t as AppShell } from "./app-shell-BkCc_335.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
import { n as Label, t as Input } from "./label-Dlz-_maa.mjs";
import { a as semestreLabel, i as niveauLabel, r as initials, t as formatDateFr } from "./format-o_P4hdYy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-n75BvyBF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		requireParcours: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilBody, {})
	});
}
function ProfilBody() {
	const user = useCurrentUser();
	const qc = useQueryClient();
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe()
	});
	const profile = me.data?.profile;
	const [name, setName] = (0, import_react.useState)("");
	const save = useMutation({
		mutationFn: () => updateProfile({ data: { displayName: name } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] })
	});
	const claim = useMutation({
		mutationFn: () => claimAdmin(),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.18em] text-muted",
			children: "Compte"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight text-ink",
			children: "Profil"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex items-center gap-4 rounded-[1.5rem] bg-cream p-5 shadow-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-14 place-items-center rounded-full bg-ink font-display text-lg text-cream",
				children: initials(profile?.displayName ?? user?.displayName)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-display text-xl font-semibold text-ink",
					children: profile?.displayName ?? user?.displayName ?? "Étudiant"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm text-muted",
					children: profile?.email ?? user?.primaryEmail
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-5 space-y-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					k: "Filière",
					v: profile?.filiere?.name ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					k: "Niveau",
					v: niveauLabel(profile?.niveau ?? null)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					k: "Semestre",
					v: semestreLabel(profile?.semestre ?? null)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					k: "Abonnement",
					v: me.data?.subscription ? `Actif jusqu’au ${formatDateFr(me.data.subscription.expiresAt)}` : profile?.role === "admin" ? "Admin — accès ouvert" : "Aucun accès actif"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/parcours",
			className: "mt-4 inline-flex min-h-11 items-center text-sm text-ink underline-offset-4 hover:underline",
			children: "Modifier le parcours"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "display",
					children: "Nom affiché"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "display",
					value: name,
					placeholder: profile?.displayName ?? "",
					onChange: (e) => setName(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					disabled: save.isPending || name.trim().length < 2,
					onClick: () => save.mutate(),
					children: "Enregistrer"
				})
			]
		}),
		profile?.role !== "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-[1.4rem] border border-line px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Premier administrateur du catalogue ? Activez l’espace de gestion (une seule fois)."
				}),
				claim.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-danger",
					children: claim.error.message
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-3",
					disabled: claim.isPending,
					onClick: () => claim.mutate(),
					children: "Activer l’espace admin"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin",
			className: "mt-8 block text-sm text-signal",
			children: "Ouvrir l’administration →"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 border-t border-line pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-[0.68rem] uppercase tracking-[0.14em] text-muted",
				children: "Session"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
		})
	] });
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4 border-b border-line py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right text-ink",
			children: v
		})]
	});
}
//#endregion
export { ProfilPage as component };
