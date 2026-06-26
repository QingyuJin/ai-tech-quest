import { Network } from "lucide-react";
import { ragTechPoints } from "../data/ragDocument.js";

export default function RagTechExplanation() {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
          <Network className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">關卡背後技術</p>
          <h2 className="mt-2 text-xl font-black text-ink">文件檢索增強生成（RAG）說明</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            這一關示範產品級文件問答系統如何先檢索、再回答，並用來源引用讓結果可檢查。
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {ragTechPoints.map((point) => (
          <article key={point.title} className="rounded-xl border border-line bg-slate-50 p-4">
            <h3 className="text-sm font-black text-ink">{point.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
