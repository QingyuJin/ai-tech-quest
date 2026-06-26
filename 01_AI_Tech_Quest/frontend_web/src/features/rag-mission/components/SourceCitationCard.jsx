import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../../utils/cn.js";

export default function SourceCitationCard({ source }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="focus-ring flex w-full items-start justify-between gap-4 p-4 text-left"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-cyan">{source.sourceId}</p>
          <h3 className="mt-1 text-sm font-black text-ink">{source.heading}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            相關度 {(source.relevance * 100).toFixed(0)}%
          </p>
        </div>
        <ChevronDown
          className={cn("h-5 w-5 text-slate-400 transition", expanded && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {expanded ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-line bg-slate-50"
        >
          <p className="p-4 text-sm leading-6 text-slate-600">{source.snippet}</p>
        </motion.div>
      ) : null}
    </article>
  );
}
