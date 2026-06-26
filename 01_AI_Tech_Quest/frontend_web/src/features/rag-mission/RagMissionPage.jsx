import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../../components/Button.jsx";
import { useQuestStore } from "../../store/useQuestStore.js";
import RagAnswerPanel from "./components/RagAnswerPanel.jsx";
import RagAskPanel from "./components/RagAskPanel.jsx";
import RagDocumentCard from "./components/RagDocumentCard.jsx";
import RagSourcesPanel from "./components/RagSourcesPanel.jsx";
import RagTechExplanation from "./components/RagTechExplanation.jsx";
import { suggestedQuestions } from "./data/ragDocument.js";
import { ragService } from "./services/ragService.js";

export default function RagMissionPage() {
  const [question, setQuestion] = useState(suggestedQuestions[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completionPulse, setCompletionPulse] = useState(false);
  const completeMission = useQuestStore((state) => state.completeMission);
  const completed = useQuestStore((state) => state.completedMissionIds.includes("rag"));

  async function handleAsk(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await ragService.ask(question);
      setResult(response);
    } catch (askError) {
      setResult(null);
      setError(askError.message || "文件問答服務暫時無法回應，請再試一次。");
    } finally {
      setLoading(false);
    }
  }

  function handleCompleteMission() {
    completeMission("rag");
    setCompletionPulse(true);
    window.setTimeout(() => setCompletionPulse(false), 1300);
  }

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">第 1 關</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              文件問答調查員
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              針對晴宇咖啡文件提問，查看系統取回哪些來源，理解引用如何讓 AI 回答更可信。
            </p>
          </div>
          <Button
            icon={completed ? CheckCircle2 : Sparkles}
            variant={completed ? "success" : "primary"}
            disabled={!result || completed}
            onClick={handleCompleteMission}
          >
            {completed ? "任務已完成" : "完成任務"}
          </Button>
        </div>

        {completionPulse ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800"
          >
            第 1 關已完成，進度已儲存在 localStorage。
          </motion.div>
        ) : null}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <RagDocumentCard />
        <div className="grid content-start gap-6">
          <RagAskPanel
            question={question}
            setQuestion={setQuestion}
            loading={loading}
            onAsk={handleAsk}
            error={error}
          />
          <RagAnswerPanel result={result} loading={loading} />
        </div>
      </section>

      <RagSourcesPanel sources={result?.sources} />
      <RagTechExplanation />
    </div>
  );
}
