import { Send } from "lucide-react";
import Button from "../../../components/Button.jsx";
import TechBadge from "../../../components/TechBadge.jsx";

export default function RagAskPanel({
  question,
  setQuestion,
  suggestedQuestions,
  loading,
  onAsk,
}) {
  return (
    <section className="panel p-5">
      <p className="section-label">Ask the Document</p>
      <h2 className="mt-2 text-xl font-bold text-ink">問答輸入框</h2>
      <form className="mt-5" onSubmit={onAsk}>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">你的問題</span>
          <textarea
            className="focus-ring mt-2 min-h-28 w-full rounded-md border border-line px-3 py-3 text-sm leading-6"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="例如：有插座嗎？"
          />
        </label>
        <Button className="mt-4 w-full sm:w-auto" icon={Send} type="submit" disabled={loading || !question.trim()}>
          {loading ? "Retrieving..." : "Ask RAG System"}
        </Button>
      </form>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700">範例問題</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((item) => (
            <button
              key={item}
              type="button"
              className="focus-ring rounded-full border border-line bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-signal-cyan hover:text-signal-cyan"
              onClick={() => setQuestion(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <TechBadge>Mock retrieval</TechBadge>
        <TechBadge>API-ready service</TechBadge>
      </div>
    </section>
  );
}
