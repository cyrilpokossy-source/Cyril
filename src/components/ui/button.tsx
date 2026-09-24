import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,opacity,background-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-cream hover:bg-ink-soft active:scale-[0.98]",
        signal:
          "bg-signal text-signal-fg hover:opacity-90 active:scale-[0.98]",
        outline:
          "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--color-ink)] hover:bg-ink hover:text-cream",
        ghost: "bg-transparent text-ink hover:bg-ink/8",
        paper:
          "bg-cream text-ink hover:bg-paper-2 active:scale-[0.98]",
        danger:
          "bg-danger text-cream hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 rounded-[10px] px-3 text-sm",
        md: "h-11 rounded-xl px-4 text-[0.95rem]",
        lg: "h-12 rounded-[14px] px-5 text-base",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
