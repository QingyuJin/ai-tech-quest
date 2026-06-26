import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import { useQuestStore } from "../../store/useQuestStore.js";
import AssistantAnswerPanel from "./components/AssistantAnswerPanel.jsx";
import BusinessTechExplanation from "./components/BusinessTechExplanation.jsx";
import BusinessUseCases from "./components/BusinessUseCases.jsx";
import CustomerAskPanel from "./components/CustomerAskPanel.jsx";
import FaqAdminPanel from "./components/FaqAdminPanel.jsx";
import QuestionLogPanel from "./components/QuestionLogPanel.jsx";
import { sampleCustomerQuestions } from "./data/businessData.js";
import { businessService } from "./services/businessService.js";

export default function BusinessMissionPage() {
  const [faqs, setFaqs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [question, setQuestion] = useState(sampleCustomerQuestions[0]);
  const [answerResult, setAnswerResult] = useState(null);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [savingFaq, setSavingFaq] = useState(false);
  const [asking, setAsking] = useState(false);
  const [faqError, setFaqError] = useState("");
  const [askError, setAskError] = useState("");
  const [completionPulse, setCompletionPulse] = useState(false);
  const completeMission = useQuestStore((state) => state.completeMission);
  const completed = useQuestStore((state) => state.completedMissionIds.includes("business"));

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [loadedFaqs, loadedLogs] = await Promise.all([
          businessService.getFaqs(),
          businessService.getLogs(),
        ]);

        if (mounted) {
          setFaqs(loadedFaqs);
          setLogs(loadedLogs);
        }
      } catch {
        if (mounted) {
          setFaqError("讀取本機 FAQ 資料失敗。");
        }
      } finally {
        if (mounted) {
          setLoadingFaqs(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleAddFaq(payload) {
    setFaqError("");
    setSavingFaq(true);

    try {
      const createdFaq = await businessService.addFaq(payload);
      setFaqs((current) => [createdFaq, ...current]);
      return true;
    } catch (error) {
      setFaqError(error.message || "新增 FAQ 失敗。");
      return false;
    } finally {
      setSavingFaq(false);
    }
  }

  async function handleAsk(event) {
    event.preventDefault();
    setAskError("");
    setAsking(true);

    try {
      const response = await businessService.ask(question);
      const nextLogs = await businessService.getLogs();
      setAnswerResult(response);
      setLogs(nextLogs);
    } catch (error) {
      setAnswerResult(null);
      setAskError(error.message || "店家 AI 助手暫時無法配對答案。");
    } finally {
      setAsking(false);
    }
  }

  function handleCompleteMission() {
    completeMission("business");
    setCompletionPulse(true);
    window.setTimeout(() => setCompletionPulse(false), 1300);
  }

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">第 3 關</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              店家 AI 助手
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              管理店家 FAQ、模擬顧客提問，觀察這個 mock 助手如何升級成可接案的店家自動化產品。
            </p>
          </div>
          <Button
            icon={completed ? CheckCircle2 : Sparkles}
            variant={completed ? "success" : "primary"}
            disabled={!answerResult || completed}
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
            第 3 關已完成，店家助手任務進度已儲存在 localStorage。
          </motion.div>
        ) : null}
      </section>

      {loadingFaqs ? (
        <section className="panel p-6">
          <div className="grid gap-3">
            <div className="h-4 w-4/6 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-3/6 animate-pulse rounded bg-slate-100" />
          </div>
        </section>
      ) : (
        <>
          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <FaqAdminPanel faqs={faqs} onAddFaq={handleAddFaq} saving={savingFaq} error={faqError} />
            <div className="grid content-start gap-6">
              <CustomerAskPanel
                question={question}
                setQuestion={setQuestion}
                loading={asking}
                error={askError}
                onAsk={handleAsk}
              />
              <AssistantAnswerPanel result={answerResult} loading={asking} />
            </div>
          </section>

          <QuestionLogPanel logs={logs} />
          <BusinessUseCases />
          <BusinessTechExplanation />
        </>
      )}
    </div>
  );
}
