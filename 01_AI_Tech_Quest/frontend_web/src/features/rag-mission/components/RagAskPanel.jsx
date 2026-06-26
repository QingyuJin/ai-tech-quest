import { Search } from "lucide-react";
import Button from "../../../components/Button.jsx";
import { suggestedQuestions } from "../data/ragDocument.js";

export default function RagAskPanel({ question, setQuestion, loading, onAsk, error }) {
  return (
    <section className="panel p-5">
      <p className="section-label">詢問文件</p>
      <h2 className="mt-2 text-xl font-black text-ink">文件問答輸入</h2>
      <form onSubmit={onAsk} className="mt-4 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">問題</span>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="例如：有插座嗎？"
            className="focus-ring min-h-28 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm leading-6 text-ink"
          />
        </label>
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setQuestion(sample)}
                className="focus-ring rounded-full border border-line bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-cyan hover:text-cyan"
              >
                {sample}
              </button>
            ))}
          </div>
          <Button type="submit" icon={Search} disabled={loading} className={loading ? "opacity-70" : ""}>
            {loading ? "檢索文件中..." : "送出問題"}
          </Button>
        </div>
      </form>
    </section>
  );
}
