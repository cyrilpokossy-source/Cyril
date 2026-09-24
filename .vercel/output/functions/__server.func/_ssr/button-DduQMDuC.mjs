import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DduQMDuC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,opacity,background-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0 select-none", {
	variants: {
		variant: {
			primary: "bg-ink text-cream hover:bg-ink-soft active:scale-[0.98]",
			signal: "bg-signal text-signal-fg hover:opacity-90 active:scale-[0.98]",
			outline: "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--color-ink)] hover:bg-ink hover:text-cream",
			ghost: "bg-transparent text-ink hover:bg-ink/8",
			paper: "bg-cream text-ink hover:bg-paper-2 active:scale-[0.98]",
			danger: "bg-danger text-cream hover:opacity-90 active:scale-[0.98]"
		},
		size: {
			sm: "h-9 rounded-[10px] px-3 text-sm",
			md: "h-11 rounded-xl px-4 text-[0.95rem]",
			lg: "h-12 rounded-[14px] px-5 text-base",
			icon: "size-11 rounded-xl"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, asChild, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { Button as t };
