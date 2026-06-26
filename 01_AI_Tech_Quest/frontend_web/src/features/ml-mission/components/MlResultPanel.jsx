import { BrainCircuit, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { classDefinitions } from "../data/mlDataset.js";

export default function MlResultPanel({ result, loading }) {
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
          <p className="section-label">模型揭曉</p>
          <h2 className="mt-2 text-xl font-black text-ink">預測結果</h2>
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
          送出分類後，這裡會比較你的答案與 mock 模型的判斷。
        </div>
      ) : null}

      {!loading && result ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          <div
            className={`flex items-center gap-3 rounded-xl border p-4 ${
              result.isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {result.isCorrect ? (
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            ) : (
              <XCircle className="h-5 w-5" aria-hidden="true" />
            )}
            <p className="text-sm font-black">
              {result.isCorrect ? "分類正確" : "和正確答案不同"}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric
              label="你的選擇"
              value={`${result.playerChoice}: ${classDefinitions[result.playerChoice].label}`}
            />
            <Metric
              label="模型預測"
              value={`${result.modelPrediction}: ${classDefinitions[result.modelPrediction].label}`}
            />
            <Metric
              label="正確答案"
              value={`${result.correctLabel}: ${classDefinitions[result.correctLabel].label}`}
            />
          </div>

          <div className="mt-5 rounded-xl border border-line bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              模型解釋
            </p>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <p>
                <span className="font-black">活躍分數（activity score）：</span>{" "}
                {result.features.activityScore}
              </p>
              <p>
                <span className="font-black">穩定分數（consistency score）：</span>{" "}
                {result.features.consistencyScore}
              </p>
              <p className="leading-6">{result.explanation}</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-black leading-6 text-ink">{value}</p>
    </div>
  );
}
