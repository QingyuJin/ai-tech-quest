import { Clock3 } from "lucide-react";

export default function QuestionHistoryPanel({ history }) {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          <Clock3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">Question Log</p>
          <h2 className="mt-2 text-xl font-bold text-ink">問答紀錄</h2>
        </div>
      </div>

      {history.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {history.map((item) => (
            <article key={item.id} className="rounded-md border border-line bg-slate-50 p-4">
              <p className="text-sm font-bold text-ink">{item.question}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                matched FAQ: {item.matchedFaq?.question ?? "No match"} · confidence: {item.confidence}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          最近幾次顧客問題會顯示在這裡，包含命中的 FAQ。
        </p>
      )}
    </section>
  );
}
