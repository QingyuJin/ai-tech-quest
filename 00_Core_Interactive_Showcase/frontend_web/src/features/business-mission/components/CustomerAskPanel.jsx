import { Send } from "lucide-react";
import Button from "../../../components/Button.jsx";

export default function CustomerAskPanel({
  question,
  setQuestion,
  samples,
  loading,
  onAsk,
}) {
  return (
    <section className="panel p-5">
      <p className="section-label">Customer Question</p>
      <h2 className="mt-2 text-xl font-bold text-ink">顧客提問區</h2>
      <form className="mt-5" onSubmit={onAsk}>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">顧客問題</span>
          <textarea
            className="focus-ring mt-2 min-h-28 w-full rounded-md border border-line px-3 py-3 text-sm leading-6"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="例如：可以用 LINE 預約嗎？"
          />
        </label>
        <Button className="mt-4 w-full sm:w-auto" icon={Send} type="submit" disabled={loading || !question.trim()}>
          {loading ? "Answering..." : "Ask Assistant"}
        </Button>
      </form>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700">範例提問</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {samples.map((sample) => (
            <button
              key={sample}
              type="button"
              className="focus-ring rounded-full border border-line bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-signal-green hover:text-signal-green"
              onClick={() => setQuestion(sample)}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
