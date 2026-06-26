import { BrainCircuit, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const confidenceClass = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-slate-200 bg-slate-50 text-slate-600",
};

const confidenceLabel = {
  high: "高",
  medium: "中",
  low: "低",
};

export default function RagAnswerPanel({ result, loading }) {
  return (
    <section className="panel min-h-72 p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-white">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <BrainCircuit className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="section-label">AI 回答</p>
          <h2 className="mt-2 text-xl font-black text-ink">根據來源產生的回答</h2>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-3">
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-3/6 animate-pulse rounded bg-slate-100" />
        </div>
      ) : null}

      {!loading && !result ? (
        <div className="mt-8 rounded-xl border border-dashed border-line bg-slate-50 p-5 text-sm leading-6 text-slate-500">
          請先提出問題，系統會檢索文件片段並產生附引用的回答。
        </div>
      ) : null}

      {!loading && result ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          <div
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${
              confidenceClass[result.confidence]
            }`}
          >
            信心分數：{confidenceLabel[result.confidence] ?? result.confidence}
          </div>
          <p className="mt-4 text-base leading-8 text-slate-700">{result.answer}</p>
          <div className="mt-5 rounded-xl border border-line bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              檢索紀錄
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{result.retrievalTrace}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              引用片段
            </p>
            <ul className="mt-3 grid gap-2">
              {result.citedSnippets.map((snippet) => (
                <li
                  key={snippet}
                  className="rounded-lg border border-line bg-white px-4 py-3 text-sm leading-6 text-slate-600"
                >
                  {snippet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}
