export function formatFcfa(n: number) {
  return `${n.toLocaleString("fr-FR")} FCFA`;
}

export function formatDateFr(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function niveauLabel(n: number | null) {
  if (n === 1) return "Niveau 1";
  if (n === 2) return "Niveau 2";
  return "Niveau";
}

export function semestreLabel(n: number | null) {
  if (n === 1) return "Semestre 1";
  if (n === 2) return "Semestre 2";
  return "Semestre";
}

export function initials(name: string | null | undefined) {
  if (!name) return "S";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "S";
}
