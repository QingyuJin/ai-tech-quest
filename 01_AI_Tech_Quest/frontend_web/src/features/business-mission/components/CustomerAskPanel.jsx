import { MessageCircleQuestion } from "lucide-react";
import Button from "../../../components/Button.jsx";
import { sampleCustomerQuestions } from "../data/businessData.js";

export default function CustomerAskPanel({ question, setQuestion, loading, error, onAsk }) {
  return (
    <section className="panel p-5">
      <p className="section-label">顧客提問區</p>
      <h2 className="mt-2 text-xl font-black text-ink">模擬顧客問題</h2>
      <form onSubmit={onAsk} className="mt-4 grid gap-4">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="例如：可以用 LINE 預約嗎？"
          className="focus-ring min-h-28 resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm leading-6"
        />
        <div className="flex flex-wrap gap-2">
          {sampleCustomerQuestions.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setQuestion(sample)}
              className="focus-ring rounded-full border border-line bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-green hover:text-green"
            >
              {sample}
            </button>
          ))}
        </div>
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}
        <Button type="submit" icon={MessageCircleQuestion} disabled={loading}>
          {loading ? "配對 FAQ 中..." : "詢問店家 AI 助手"}
        </Button>
      </form>
    </section>
  );
}
