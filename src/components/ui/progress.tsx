import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  trackClassName,
}: {
  value: number;
  className?: string;
  trackClassName?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-paper-2", className)}
      role="progressbar"
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full bg-signal transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", trackClassName)}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
