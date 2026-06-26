import { Network } from "lucide-react";
import { mlTechPoints } from "../data/mlDataset.js";

export default function MlTechExplanation() {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber/10 text-amber">
          <Network className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">關卡背後技術</p>
          <h2 className="mt-2 text-xl font-black text-ink">機器學習（ML）技術說明</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            這一關把原本只能在 notebook 裡看的模型概念，轉成可以操作的產品展示。
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {mlTechPoints.map((point) => (
          <article key={point.title} className="rounded-xl border border-line bg-slate-50 p-4">
            <h3 className="text-sm font-black text-ink">{point.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
