import { BotMessageSquare, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import TechBadge from "../../../components/TechBadge.jsx";

const confidenceClass = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-rose-200 bg-rose-50 text-rose-800",
};

export default function AssistantAnswerPanel({ result, loading, serviceMode }) {
  return (
    <section className="panel min-h-64 p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <BotMessageSquare className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="section-label">AI Answer</p>
          <h2 className="mt-2 text-xl font-bold text-ink">AI 回答</h2>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 rounded-md border border-dashed border-line bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">Matching customer question with FAQ tags...</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full w-1/3 rounded-full bg-signal-green"
              animate={{ x: ["-100%", "320%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      ) : result ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5"
        >
          <p className="rounded-md border border-line bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            {result.answer}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-line bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                matched FAQ
              </p>
              <p className="mt-2 text-sm font-bold text-ink">
                {result.matchedFaq?.question ?? "No exact match"}
              </p>
            </div>
            <div className={`rounded-md border p-4 ${confidenceClass[result.confidence]}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">confidence</p>
              <p className="mt-2 text-sm font-black">{result.confidence}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <TechBadge>service: {serviceMode}</TechBadge>
            {result.matchedTags.map((tag) => (
              <TechBadge key={tag}>matched: {tag}</TechBadge>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">{result.action}</p>
        </motion.div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          顧客提問後，這裡會顯示 FAQ matching 結果、AI 回答、confidence 與命中的 FAQ。
        </p>
      )}
    </section>
  );
}
