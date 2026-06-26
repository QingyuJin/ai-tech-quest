import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../../utils/cn.js";

export default function SourceCitationCard({ source }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-md border border-line bg-white">
      <button
        type="button"
        className="focus-ring flex w-full items-start justify-between gap-4 rounded-md p-4 text-left"
        onClick={() => setExpanded((current) => !current)}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal-cyan">
            {source.sourceId}
          </p>
          <h3 className="mt-1 font-bold text-ink">{source.heading}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{source.snippet}</p>
        </div>
        <ChevronDown
          className={cn("mt-1 h-5 w-5 shrink-0 text-slate-500 transition", expanded && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-line bg-slate-50"
          >
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Expanded source text
              </p>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                {source.fullText}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
