import { BotMessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function AIGuide({ title = "Qingyu AI Guide", message, tone = "neutral" }) {
  const toneClasses = {
    neutral: "border-lab-cyan",
    success: "border-lab-green",
    warning: "border-lab-amber",
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`surface border-l-4 ${toneClasses[tone]} p-5`}
    >
      <div className="flex gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-white">
          <BotMessageSquare className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
        </div>
      </div>
    </motion.aside>
  );
}
