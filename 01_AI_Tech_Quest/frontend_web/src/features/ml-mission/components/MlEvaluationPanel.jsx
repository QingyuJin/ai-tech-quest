import { BarChart3 } from "lucide-react";

export default function MlEvaluationPanel({ result }) {
  const evaluation = result?.evaluation;

  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber/10 text-amber">
          <BarChart3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">模型評估（Model Evaluation）</p>
          <h2 className="mt-2 text-xl font-black text-ink">評估報告</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            評估報告用來判斷模型是否穩定，而不是只看單次預測是否答對。
          </p>
        </div>
      </div>

      {!evaluation ? (
        <div className="mt-5 rounded-xl border border-dashed border-line bg-slate-50 p-5 text-sm leading-6 text-slate-500">
          送出分類後，這裡會顯示準確率、信心分數、混淆矩陣與錯誤分析。
        </div>
      ) : (
        <div className="mt-5 grid gap-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard label="準確率" value={`${evaluation.accuracy}%`} />
            <StatCard label="信心分數" value={`${Math.round(result.confidence * 100)}%`} />
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <div className="border-b border-line bg-slate-50 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                混淆矩陣（Confusion Matrix）
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-white text-xs font-black uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">實際類別</th>
                    <th className="px-4 py-3">預測 A</th>
                    <th className="px-4 py-3">預測 B</th>
                    <th className="px-4 py-3">預測 C</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {evaluation.confusionMatrix.map((row) => (
                    <tr key={row.actual}>
                      <td className="px-4 py-3 font-black text-ink">{row.actual}</td>
                      <td className="px-4 py-3 text-slate-700">{row.predicted.A}</td>
                      <td className="px-4 py-3 text-slate-700">{row.predicted.B}</td>
                      <td className="px-4 py-3 text-slate-700">{row.predicted.C}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              錯誤分析（Error Analysis）
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{evaluation.errorAnalysis}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
    </div>
  );
}
