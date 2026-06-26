import { ShieldCheck } from "lucide-react";
import { ragTechPoints } from "../data/ragDocument.js";

export default function RagTechExplanation() {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">Behind the Mission</p>
          <h2 className="mt-2 text-xl font-bold text-ink">技術解說卡</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            這一關用 mock retrieval 模擬 RAG，但資料流刻意設計成未來可替換成真正後端。
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {ragTechPoints.map((point) => (
          <article key={point.title} className="rounded-md border border-line bg-slate-50 p-4">
            <h3 className="font-bold text-ink">{point.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{point.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
