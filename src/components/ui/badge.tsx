import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "ink",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "ink" | "signal" | "muted" | "danger" | "paper" | "warn" }) {
  const tones = {
    ink: "bg-ink text-cream",
    signal: "bg-signal-soft text-signal",
    muted: "bg-paper-2 text-muted",
    danger: "bg-danger/12 text-danger",
    paper: "bg-cream/15 text-cream",
    warn: "bg-warn/12 text-warn",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
