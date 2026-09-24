//#region node_modules/.nitro/vite/services/ssr/assets/format-o_P4hdYy.js
function formatFcfa(n) {
	return `${n.toLocaleString("fr-FR")} FCFA`;
}
function formatDateFr(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "—";
	return d.toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function niveauLabel(n) {
	if (n === 1) return "Niveau 1";
	if (n === 2) return "Niveau 2";
	return "Niveau";
}
function semestreLabel(n) {
	if (n === 1) return "Semestre 1";
	if (n === 2) return "Semestre 2";
	return "Semestre";
}
function initials(name) {
	if (!name) return "S";
	return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "S";
}
//#endregion
export { semestreLabel as a, niveauLabel as i, formatFcfa as n, initials as r, formatDateFr as t };
