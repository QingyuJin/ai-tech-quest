import { Activity, BarChart3 } from "lucide-react";
import { clusterDefinitions } from "../data/mlDataset.js";

const labels = ["A", "B", "C"];

export default function MlEvaluationPanel({ result }) {
  const evaluation = result?.evaluation;

  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          <BarChart3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">Model Evaluation</p>
          <h2 className="mt-2 text-xl font-bold text-ink">評估展示</h2>
        </div>
      </div>

      {evaluation ? (
        <div className="mt-5 grid gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric label="accuracy" value={`${evaluation.accuracy}%`} />
            <Metric label="model confidence" value={`${Math.round(result.confidence * 100)}%`} />
            <Metric label="model status" value={result.modelIsCorrect ? "correct" : "review"} />
          </div>

          <div className="overflow-hidden rounded-md border border-line bg-white">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-3 text-left">Actual</th>
                  {labels.map((label) => (
                    <th key={label} className="px-3 py-3 text-left">Pred {label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evaluation.confusionMatrix.map((row) => (
                  <tr key={row.actual} className="border-t border-line">
                    <td className={`px-3 py-3 font-black ${clusterDefinitions[row.actual].textClass}`}>
                      {row.actual}
                    </td>
                    {labels.map((label) => (
                      <td key={label} className="px-3 py-3">
                        {row.predicted[label]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <Activity className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
              <div>
                <p className="font-bold text-amber-900">Error analysis</p>
                <p className="mt-2 text-sm leading-6 text-amber-900">{evaluation.errorAnalysis}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          模型揭曉後會顯示 accuracy、confusion matrix、model confidence 與 error analysis。
        </p>
      )}
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-md border border-line bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-ink">{value}</p>
    </div>
  );
}
