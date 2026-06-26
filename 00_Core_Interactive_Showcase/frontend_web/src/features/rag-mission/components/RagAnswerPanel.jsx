import { BotMessageSquare, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import TechBadge from "../../../components/TechBadge.jsx";

const confidenceStyles = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-rose-200 bg-rose-50 text-rose-800",
};

export default function RagAnswerPanel({ result, loading }) {
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
          <h2 className="mt-2 text-xl font-bold text-ink">RAG 回答區</h2>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 rounded-md border border-dashed border-line bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">Retrieving relevant chunks...</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full w-1/3 rounded-full bg-signal-cyan"
              animate={{ x: ["-100%", "320%"] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      ) : result ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="mt-5"
        >
          <p className="text-sm leading-7 text-slate-700">{result.answer}</p>
          <div className="mt-5 rounded-md border border-line bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Cited snippets
            </p>
            <div className="mt-3 grid gap-2">
              {result.citedSnippets.map((snippet) => (
                <p key={`${snippet.sourceId}-${snippet.text}`} className="text-sm leading-6 text-slate-600">
                  <span className="font-bold text-ink">{snippet.sourceId}:</span> {snippet.text}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
                confidenceStyles[result.confidence]
              }`}
            >
              confidence: {result.confidence}
            </span>
            <TechBadge>{result.retrievalTrace.method}</TechBadge>
            <TechBadge>top-k: {result.retrievalTrace.topK}</TechBadge>
          </div>
        </motion.div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          輸入問題後，這裡會顯示 answer、confidence、sources 和 cited snippets。
        </p>
      )}
    </section>
  );
}
