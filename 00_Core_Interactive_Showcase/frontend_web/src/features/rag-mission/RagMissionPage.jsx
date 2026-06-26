import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../../components/Button.jsx";
import AIMessageBox from "../../components/AIMessageBox.jsx";
import { useMissionStore } from "../../store/useMissionStore.js";
import { qingyuCafeDocument, suggestedQuestions } from "./data/ragDocument.js";
import RagAnswerPanel from "./components/RagAnswerPanel.jsx";
import RagAskPanel from "./components/RagAskPanel.jsx";
import RagDocumentCard from "./components/RagDocumentCard.jsx";
import RagSourcesPanel from "./components/RagSourcesPanel.jsx";
import RagTechExplanation from "./components/RagTechExplanation.jsx";
import { ragService } from "./services/ragService.js";

export default function RagMissionPage() {
  const [question, setQuestion] = useState(suggestedQuestions[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completionPulse, setCompletionPulse] = useState(false);
  const completeMission = useMissionStore((state) => state.completeMission);
  const completed = useMissionStore((state) => state.completedMissionIds.includes("rag"));

  async function handleAsk(event) {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }
    setLoading(true);
    const response = await ragService.ask(question.trim());
    setResult(response);
    setLoading(false);
  }

  function handleCompleteMission() {
    completeMission("rag");
    setCompletionPulse(true);
    window.setTimeout(() => setCompletionPulse(false), 1300);
  }

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Level 1</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              RAG 文件調查員
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              選取文件、提出問題、取得帶有 confidence 與 source citation 的回答。第一版使用 mock
              data，但 service 介面已保留未來接後端 RAG API 的位置。
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
            exit={{ opacity: 0 }}
            className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
          >
            Level 1 completed. Portfolio progress updated in localStorage.
          </motion.div>
        ) : null}
      </section>

      <AIMessageBox message="先問一個具體問題。RAG 的核心不是只給答案，而是讓答案附上來源，讓使用者可以檢查它是不是根據文件回答。" />

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <RagDocumentCard document={qingyuCafeDocument} />
        <div className="grid content-start gap-6">
          <RagAskPanel
            question={question}
            setQuestion={setQuestion}
            suggestedQuestions={suggestedQuestions}
            loading={loading}
            onAsk={handleAsk}
          />
          <RagAnswerPanel result={result} loading={loading} />
        </div>
      </section>

      <RagSourcesPanel result={result} />
      <RagTechExplanation />
    </div>
  );
}
