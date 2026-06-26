import { Check, CircleDashed, LockKeyhole } from "lucide-react";
import { cn } from "../../utils/cn.js";

const styles = {
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  active: "border-cyan-200 bg-cyan-50 text-cyan-800",
  locked: "border-slate-200 bg-slate-100 text-slate-600",
};

const icons = {
  completed: Check,
  active: CircleDashed,
  locked: LockKeyhole,
};

export default function StatusPill({ status = "active", children }) {
  const Icon = icons[status] ?? CircleDashed;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        styles[status],
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
