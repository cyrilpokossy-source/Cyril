import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl bg-cream px-3.5 text-[0.95rem] text-fg shadow-[inset_0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] duration-150 placeholder:text-faint focus:shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
