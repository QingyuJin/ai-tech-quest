import { BriefcaseBusiness } from "lucide-react";
import { businessUseCases } from "../data/businessData.js";

export default function BusinessUseCases() {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green/10 text-green">
          <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">接案產品化</p>
          <h2 className="mt-2 text-xl font-black text-ink">可以服務的客戶場景</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            這個 demo 故意設計成小型 SaaS 後台，未來可以包裝成店家客服或文件客服服務。
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {businessUseCases.map((useCase) => (
          <article key={useCase.title} className="rounded-xl border border-line bg-slate-50 p-4">
            <h3 className="text-sm font-black text-ink">{useCase.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{useCase.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
