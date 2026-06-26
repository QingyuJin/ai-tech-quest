import { Clock3 } from "lucide-react";

const confidenceLabel = {
  high: "高",
  medium: "中",
  low: "低",
};

export default function QuestionLogPanel({ logs }) {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green/10 text-green">
          <Clock3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">問答紀錄</p>
          <h2 className="mt-2 text-xl font-black text-ink">最近的顧客問題</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {logs.length ? (
          logs.map((log) => (
            <article key={log.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-sm font-black text-ink">{log.question}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-500">
                  信心 {confidenceLabel[log.confidence] ?? log.confidence}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{log.answer}</p>
              <p className="mt-3 text-xs font-semibold text-slate-500">
                命中 FAQ：{log.matchedFaq ? log.matchedFaq.question : "沒有命中的 FAQ"}
              </p>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-line bg-slate-50 p-5 text-sm leading-6 text-slate-500">
            回答第一個顧客問題後，問答紀錄會顯示在這裡。
          </div>
        )}
      </div>
    </section>
  );
}
