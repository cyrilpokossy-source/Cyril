import { cn } from "@/lib/utils";

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function NoteBody({ text, className }: { text: string; className?: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className={cn("prose-note", className)}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines[0]?.startsWith("## ")) {
          return (
            <div key={i}>
              <h3>{lines[0].slice(3)}</h3>
              {lines.slice(1).join(" ").trim() ? <p>{inline(lines.slice(1).join(" "))}</p> : null}
            </div>
          );
        }
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(block.replace(/\n/g, " "))}</p>;
      })}
    </div>
  );
}
