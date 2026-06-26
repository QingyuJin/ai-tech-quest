import { Bot, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import TechBadge from "../../../components/TechBadge.jsx";
import { clusterDefinitions } from "../data/mlDataset.js";

export default function MlResultPanel({ result, loading }) {
  return (
    <section className="panel min-h-72 p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Bot className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="section-label">Model Reveal</p>
          <h2 className="mt-2 text-xl font-bold text-ink">模型揭曉</h2>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 rounded-md border border-dashed border-line bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">
            Running mock classifier against cluster centroids...
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full w-1/3 rounded-full bg-signal-amber"
              animate={{ x: ["-100%", "320%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      ) : result ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="mt-5 grid gap-5"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCell label="玩家選擇" value={result.playerChoice} />
            <ResultCell label="模型預測" value={result.modelPrediction} />
            <ResultCell label="正確答案" value={result.correctLabel} />
            <div
              className={`rounded-md border p-4 ${
                result.isCorrect
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-rose-200 bg-rose-50 text-rose-800"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">結果</p>
              <p className="mt-2 flex items-center gap-2 font-black">
                {result.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                )}
                {result.isCorrect ? "答對" : "答錯"}
              </p>
            </div>
          </div>

          <div className="rounded-md border border-line bg-slate-50 p-4">
            <p className="section-label">Model Explanation</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{result.explanation}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TechBadge>feature 1: activity score</TechBadge>
              <TechBadge>feature 2: consistency score</TechBadge>
              <TechBadge>nearest centroid classifier</TechBadge>
            </div>
          </div>

          <div className="grid gap-2">
            {result.rankedClusters.map((cluster) => (
              <div key={cluster.label} className="flex items-center gap-3">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-md text-xs font-black text-white ${
                    clusterDefinitions[cluster.label].bgClass
                  }`}
                >
                  {cluster.label}
                </span>
                <div className="h-2 flex-1 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-700"
                    style={{ width: `${Math.max(12, 100 - cluster.distance)}%` }}
                  />
                </div>
                <span className="w-24 text-right text-xs font-semibold text-slate-500">
                  distance {cluster.distance.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          提交分類後，這裡會顯示玩家選擇、模型預測、正確答案與是否答對。
        </p>
      )}
    </section>
  );
}

function ResultCell({ label, value }) {
  const cluster = clusterDefinitions[value];
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className={`mt-2 text-xl font-black ${cluster?.textClass ?? "text-ink"}`}>
        {value} {cluster ? `· ${cluster.name}` : ""}
      </p>
    </div>
  );
}
