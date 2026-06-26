import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import AIMessageBox from "../../components/AIMessageBox.jsx";
import Button from "../../components/Button.jsx";
import { useMissionStore } from "../../store/useMissionStore.js";
import { challengeSample } from "./data/mlDataset.js";
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
  const [completionPulse, setCompletionPulse] = useState(false);
  const completeMission = useMissionStore((state) => state.completeMission);
  const completed = useMissionStore((state) => state.completedMissionIds.includes("ml"));

  async function handleSubmit() {
    if (!selectedSample || !selectedLabel) {
      return;
    }
    setLoading(true);
    const response = await mlService.predict({
      ...selectedSample,
      playerChoice: selectedLabel,
    });
    setResult(response);
    setLoading(false);
  }

  function handleCompleteMission() {
    completeMission("ml");
    setCompletionPulse(true);
    window.setTimeout(() => setCompletionPulse(false), 1300);
  }

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Level 2</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              ML 分類挑戰
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              點擊未知資料點，根據 activity score 與 consistency score 判斷它屬於哪個使用者群。
              提交後會揭曉玩家選擇、模型預測、正確答案與評估指標。
            </p>
          </div>
          <Button
            icon={completed ? CheckCircle2 : Sparkles}
            variant={completed ? "success" : "primary"}
            disabled={!result || completed}
            onClick={handleCompleteMission}
          >
            {completed ? "Mission Completed" : "Complete Mission"}
          </Button>
        </div>
        {completionPulse ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
          >
            Level 2 completed. ML mission progress saved to localStorage.
          </motion.div>
        ) : null}
      </section>

      <AIMessageBox message="這一關不是要背公式，而是看懂 ML 流程：資料點有 feature，模型會依照 feature 做預測，最後用 evaluation 找出模型哪裡強、哪裡會錯。" />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <MlScatterPlot
          sample={challengeSample}
          selectedSample={selectedSample}
          onSelectSample={(sample) => {
            setSelectedSample(sample);
            setResult(null);
          }}
          result={result}
        />
        <div className="grid content-start gap-6">
          <MlClassSelector
            selectedSample={selectedSample}
            selectedLabel={selectedLabel}
            setSelectedLabel={(label) => {
              setSelectedLabel(label);
              setResult(null);
            }}
            loading={loading}
            onSubmit={handleSubmit}
          />
          <MlResultPanel result={result} loading={loading} />
        </div>
      </section>

      <MlEvaluationPanel result={result} />
      <MlTechExplanation />
    </div>
  );
}
