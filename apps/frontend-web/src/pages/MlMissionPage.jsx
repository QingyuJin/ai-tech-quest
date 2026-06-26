import { Brain, Send } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button.jsx";
import MetricCard from "../components/common/MetricCard.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import StatusPill from "../components/common/StatusPill.jsx";
import AIGuide from "../components/mission/AIGuide.jsx";
import TechExplanation from "../components/mission/TechExplanation.jsx";
import DataPointScatter from "../features/ml/DataPointScatter.jsx";
import { mlDataset, techExplanations } from "../data/missions.js";
import { predictMlLabels } from "../services/mockApi.js";
import { useMissionStore } from "../stores/useMissionStore.js";
import { cn } from "../utils/cn.js";

const labels = ["A", "B", "C"];

export default function MlMissionPage() {
  const [selections, setSelections] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const completeMission = useMissionStore((state) => state.completeMission);
  const completed = useMissionStore((state) => state.completedMissionIds.includes("ml"));
  const allSelected = mlDataset.every((point) => selections[point.id]);

  async function handleSubmit() {
    if (!allSelected) {
      return;
    }
    setLoading(true);
    const response = await predictMlLabels({ selections });
    setResult(response);
    completeMission("ml");
    setLoading(false);
  }

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Level 2"
        title="ML 分類挑戰"
        description="觀察資料點特徵，先做玩家分類，再揭曉模型結果與簡化 confusion matrix。"
        actions={<StatusPill status={completed ? "completed" : "active"}>{completed ? "Completed" : "In Progress"}</StatusPill>}
      />

      <AIGuide message="這一關的目標是把 ML 評估變成可視化體驗。當玩家選錯時，錯誤本身會變成解釋 feature、decision boundary 與 evaluation 的素材。" />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="grid gap-5">
          <DataPointScatter selections={selections} resultRows={result?.rows ?? []} />
          <div className="panel p-5">
            <p className="section-label">Player Classification</p>
            <h2 className="mt-2 text-xl font-bold text-ink">資料點分類</h2>
            <div className="mt-5 grid gap-3">
              {mlDataset.map((point) => (
                <div key={point.id} className="grid gap-3 rounded-md border border-line bg-slate-50 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-semibold text-ink">{point.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{point.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {labels.map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelections((current) => ({ ...current, [point.id]: label }))}
                        className={cn(
                          "focus-ring h-10 rounded-md border px-3 text-sm font-bold",
                          selections[point.id] === label
                            ? "border-ink bg-ink text-white"
                            : "border-line bg-white text-slate-700",
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button
              icon={Send}
              className="mt-5 w-full sm:w-auto"
              disabled={!allSelected || loading}
              onClick={handleSubmit}
            >
              {loading ? "Predicting..." : "Submit Classification"}
            </Button>
          </div>
        </section>

        <section className="grid gap-5">
          <div className="panel p-5">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
                <Brain className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="section-label">Model Result</p>
                <h2 className="mt-2 text-xl font-bold text-ink">模型結果展示</h2>
              </div>
            </div>

            {result ? (
              <div className="mt-5 space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <MetricCard label="Accuracy" value={`${result.accuracy}%`} detail="玩家分類與模型標籤一致率" />
                  <MetricCard label="Samples" value={result.rows.length} detail="目前 mock dataset 資料點數" />
                </div>
                <p className="rounded-md border border-line bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {result.insight}
                </p>
                <div className="overflow-hidden rounded-md border border-line">
                  <table className="w-full border-collapse bg-white text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-3 py-3 text-left">Data</th>
                        <th className="px-3 py-3 text-left">Player</th>
                        <th className="px-3 py-3 text-left">Model</th>
                        <th className="px-3 py-3 text-left">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row) => (
                        <tr key={row.id} className="border-t border-line">
                          <td className="px-3 py-3 font-semibold">{row.name}</td>
                          <td className="px-3 py-3">{row.selectedLabel}</td>
                          <td className="px-3 py-3">{row.modelLabel}</td>
                          <td className="px-3 py-3">{row.isCorrect ? "Correct" : "Review"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-slate-600">
                選完所有資料點後，模型結果與 accuracy 會顯示在這裡。
              </p>
            )}
          </div>

          <div className="panel p-5">
            <p className="section-label">Confusion Matrix</p>
            <h2 className="mt-2 text-xl font-bold text-ink">簡化矩陣</h2>
            {result ? (
              <div className="mt-5 overflow-hidden rounded-md border border-line">
                <table className="w-full border-collapse bg-white text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-3 py-3 text-left">Actual</th>
                      {labels.map((label) => (
                        <th key={label} className="px-3 py-3 text-left">Pred {label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.confusionMatrix.map((row) => (
                      <tr key={row.actual} className="border-t border-line">
                        <td className="px-3 py-3 font-semibold">{row.actual}</td>
                        {labels.map((label) => (
                          <td key={label} className="px-3 py-3">{row.predicted[label]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-slate-600">提交後顯示 A / B / C 的分類混淆狀態。</p>
            )}
          </div>
        </section>
      </div>

      <TechExplanation explanation={techExplanations.ml} />
    </div>
  );
}
