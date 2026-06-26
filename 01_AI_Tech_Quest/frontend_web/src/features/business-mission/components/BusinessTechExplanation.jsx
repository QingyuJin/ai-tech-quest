import { Network } from "lucide-react";
import { businessTechPoints } from "../data/businessData.js";

export default function BusinessTechExplanation() {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green/10 text-green">
          <Network className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">關卡背後技術</p>
          <h2 className="mt-2 text-xl font-black text-ink">店家 AI 助手技術說明</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            第 3 關示範 FAQ、API、資料庫與 AI 助手如何組合成可接案的自動化產品。
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {businessTechPoints.map((point) => (
          <article key={point.title} className="rounded-xl border border-line bg-slate-50 p-4">
            <h3 className="text-sm font-black text-ink">{point.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
