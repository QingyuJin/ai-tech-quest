import { cn } from "../utils/cn.js";

const variantClasses = {
  primary: "bg-ink text-white hover:bg-slate-800",
  secondary: "border border-line bg-white text-ink hover:border-slate-400",
  subtle: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  success: "bg-signal-green text-white hover:bg-teal-800",
};

export default function Button({
  children,
  className,
  icon: Icon,
  type = "button",
  variant = "primary",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-55",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
