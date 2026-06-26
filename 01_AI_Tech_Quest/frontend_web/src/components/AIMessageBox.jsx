import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function AIMessageBox({ message }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel flex items-start gap-4 p-4"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-white">
        <Bot className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-black text-ink">晴宇 AI 導覽員</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{message}</p>
      </div>
    </motion.aside>
  );
}
