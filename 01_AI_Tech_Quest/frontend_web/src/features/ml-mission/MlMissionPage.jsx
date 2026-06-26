import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../../components/Button.jsx";
import { useQuestStore } from "../../store/useQuestStore.js";
import MlClassSelector from "./components/MlClassSelector.jsx";
import MlEvaluationPanel from "./components/MlEvaluationPanel.jsx";
import MlResultPanel from "./components/MlResultPanel.jsx";
import MlScatterPlot from "./components/MlScatterPlot.jsx";
import MlTechExplanation from "./components/MlTechExplanation.jsx";
import { mlService } from "./services/mlService.js";

export default function MlMissionPage() {
  const [selectedSample, setSelectedSample] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completionPulse, setCompletionPulse] = useState(false);
  const completeMission = useQuestStore((state) => state.completeMission);
  const completed = useQuestStore((state) => state.completedMissionIds.includes("ml"));

  async function handleSubmitPrediction() {
    setError("");

    if (!selectedSample) {
      setError("請先點選未知資料點。");
      return;
    }

    if (!selectedLabel) {
      setError("請先選擇 A、B 或 C 再送出。");
      return;
    }

    setLoading(true);

    try {
      const prediction = await mlService.predict(selectedSample);
      setResult({
        ...prediction,
        playerChoice: selectedLabel,
        isCorrect: selectedLabel === prediction.correctLabel,
      });
    } catch (predictError) {
      setResult(null);
      setError(predictError.message || "模型分類服務暫時無法回應，請再試一次。");
    } finally {
      setLoading(false);
    }
  }

  function handleResetAttempt() {
    setSelectedSample(null);
    setSelectedLabel("");
    setResult(null);
    setError("");
  }

  function handleCompleteMission() {
    completeMission("ml");
    setCompletionPulse(true);
    window.setTimeout(() => setCompletionPulse(false), 1300);
  }

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">第 2 關</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              模型分類挑戰
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              點選未知使用者資料點，判斷它屬於 A / B / C 哪一類，再和 mock 模型預測與評估報告比較。
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button icon={RotateCcw} variant="secondary" onClick={handleResetAttempt}>
              重新作答
            </Button>
            <Button
              icon={completed ? CheckCircle2 : Sparkles}
              variant={completed ? "success" : "primary"}
              disabled={!result || completed}
              onClick={handleCompleteMission}
            >
              {completed ? "任務已完成" : "完成任務"}
            </Button>
          </div>
        </div>

        {completionPulse ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800"
          >
            第 2 關已完成，模型任務進度已儲存在 localStorage。
          </motion.div>
        ) : null}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <MlScatterPlot
          selectedSample={selectedSample}
          onSelectSample={setSelectedSample}
          result={result}
        />
        <MlClassSelector
          selectedSample={selectedSample}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          loading={loading}
          error={error}
          onSubmit={handleSubmitPrediction}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <MlResultPanel result={result} loading={loading} />
        <MlEvaluationPanel result={result} />
      </section>

      <MlTechExplanation />
    </div>
  );
}
