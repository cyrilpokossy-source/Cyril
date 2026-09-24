import { cn } from "@/lib/utils";

export function SynapseMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const stroke = inverted ? "var(--color-cream)" : "var(--color-ink)";
  const fill = inverted ? "var(--color-signal)" : "var(--color-signal)";
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <path
        d="M6 10c6-1 9 3 10 6"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M26 22c-6 1-9-3-10-6"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.1" fill={fill} />
      <circle cx="6" cy="10" r="1.5" fill={stroke} />
      <circle cx="26" cy="22" r="1.5" fill={stroke} />
    </svg>
  );
}
