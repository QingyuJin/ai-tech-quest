import { Building2, Send } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import StatusPill from "../components/common/StatusPill.jsx";
import AIGuide from "../components/mission/AIGuide.jsx";
import TechExplanation from "../components/mission/TechExplanation.jsx";
import { techExplanations } from "../data/missions.js";
import FaqManager from "../features/business/FaqManager.jsx";
import { askBusinessAssistant } from "../services/mockApi.js";
import { useMissionStore } from "../stores/useMissionStore.js";

export default function BusinessMissionPage() {
  const [question, setQuestion] = useState("請問可以預約座位嗎？");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const faqs = useMissionStore((state) => state.faqs);
  const addFaq = useMissionStore((state) => state.addFaq);
  const completeMission = useMissionStore((state) => state.completeMission);
  const completed = useMissionStore((state) => state.completedMissionIds.includes("business"));

  async function handleAsk(event) {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }
    setLoading(true);
    const response = await askBusinessAssistant({ question, faqs });
    setAnswer(response);
    completeMission("business");
    setLoading(false);
  }

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Level 3"
        title="AI 店家助手"
        description="玩家扮演店家管理者，維護 FAQ 後台並測試顧客提問。這一層未來可接 SQLite、LINE Bot 與 OpenAI API。"
        actions={<StatusPill status={completed ? "completed" : "active"}>{completed ? "Completed" : "In Progress"}</StatusPill>}
      />

      <AIGuide message="這關是最接近接案產品的一關。MVP 不急著接大模型，先把店家資料、問答流程、後台管理與 API 邊界做穩。" />

      <FaqManager faqs={faqs} onAddFaq={addFaq} />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <form className="panel p-5" onSubmit={handleAsk}>
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="section-label">Customer Question</p>
              <h2 className="mt-2 text-xl font-bold text-ink">顧客提問</h2>
            </div>
          </div>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-700">問題</span>
            <textarea
              className="focus-ring mt-2 min-h-28 w-full rounded-md border border-line px-3 py-3"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </label>
          <Button type="submit" icon={Send} className="mt-4 w-full sm:w-auto" disabled={loading}>
            {loading ? "Answering..." : "Ask Assistant"}
          </Button>
        </form>

        <section className="panel p-5">
          <p className="section-label">AI Answer</p>
          {answer ? (
            <div className="mt-5 space-y-4">
              <p className="rounded-md border border-line bg-slate-50 p-4 text-base leading-7 text-slate-700">
                {answer.answer}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-line bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Matched FAQ</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{answer.matchedQuestion ?? "No exact match"}</p>
                </div>
                <div className="rounded-md border border-line bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Confidence</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{answer.confidence}</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-slate-600">{answer.action}</p>
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-slate-600">
              系統會根據 FAQ 關鍵字比對回覆，並保留未來接 AI fallback 的位置。
            </p>
          )}
        </section>
      </div>

      <section className="panel p-6">
        <p className="section-label">Freelance Application</p>
        <h2 className="mt-2 text-xl font-bold text-ink">接案應用說明</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["Basic", "一頁式店家網站、資訊整理、LINE / IG / Google Map 入口。"],
            ["Standard", "FAQ 後台、顧客問答紀錄、簡易 AI 回覆。"],
            ["Pro", "LINE Bot、正式資料庫、AI API、部署與維護。"],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-md border border-line bg-slate-50 p-4">
              <h3 className="font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <TechExplanation explanation={techExplanations.business} />
    </div>
  );
}
