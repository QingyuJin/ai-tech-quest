import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import AIMessageBox from "../../components/AIMessageBox.jsx";
import Button from "../../components/Button.jsx";
import { useMissionStore } from "../../store/useMissionStore.js";
import AssistantAnswerPanel from "./components/AssistantAnswerPanel.jsx";
import BusinessTechExplanation from "./components/BusinessTechExplanation.jsx";
import BusinessUseCases from "./components/BusinessUseCases.jsx";
import CustomerAskPanel from "./components/CustomerAskPanel.jsx";
import FaqAdminPanel from "./components/FaqAdminPanel.jsx";
import QuestionHistoryPanel from "./components/QuestionHistoryPanel.jsx";
import { initialFaqs, sampleCustomerQuestions } from "./data/businessData.js";
import { businessService } from "./services/businessService.js";

export default function BusinessMissionPage() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [question, setQuestion] = useState(sampleCustomerQuestions[0]);
  const [answerResult, setAnswerResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingFaq, setSavingFaq] = useState(false);
  const [completionPulse, setCompletionPulse] = useState(false);
  const completeMission = useMissionStore((state) => state.completeMission);
  const completed = useMissionStore((state) => state.completedMissionIds.includes("business"));

  async function handleCreateFaq(payload) {
    setSavingFaq(true);
    const created = await businessService.createFaq(payload);
    setFaqs((current) => [created, ...current]);
    setSavingFaq(false);
  }

  async function handleAsk(event) {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }
    setLoading(true);
    const response = await businessService.ask(question.trim(), faqs);
    setAnswerResult(response);
    setHistory((current) => [
      {
        id: `log-${Date.now()}`,
        question: question.trim(),
        answer: response.answer,
        matchedFaq: response.matchedFaq,
        confidence: response.confidence,
      },
      ...current,
    ].slice(0, 5));
    setLoading(false);
  }

  function handleCompleteMission() {
    completeMission("business");
    setCompletionPulse(true);
    window.setTimeout(() => setCompletionPulse(false), 1300);
  }

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Level 3</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              AI 店家助手
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              管理 FAQ、模擬顧客提問、查看回答紀錄，理解一個小型 AI business assistant
              如何從 MVP 走向可接案產品。
            </p>
          </div>
          <Button
            icon={completed ? CheckCircle2 : Sparkles}
            variant={completed ? "success" : "primary"}
            disabled={!answerResult || completed}
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
            Level 3 completed. Business mission progress saved to localStorage.
          </motion.div>
        ) : null}
      </section>

      <AIMessageBox message="這一關是最接近接案的 AI 產品：先用 FAQ matching 做穩定 MVP，再逐步接 database、LINE Bot 與 LLM fallback。" />

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <FaqAdminPanel faqs={faqs} onCreateFaq={handleCreateFaq} saving={savingFaq} />
        <div className="grid content-start gap-6">
          <CustomerAskPanel
            question={question}
            setQuestion={setQuestion}
            samples={sampleCustomerQuestions}
            loading={loading}
            onAsk={handleAsk}
          />
          <AssistantAnswerPanel
            result={answerResult}
            loading={loading}
            serviceMode={businessService.mode}
          />
        </div>
      </section>

      <QuestionHistoryPanel history={history} />
      <BusinessUseCases />
      <BusinessTechExplanation />
    </div>
  );
}
