import { BriefcaseBusiness } from "lucide-react";
import { businessUseCases } from "../data/businessData.js";

export default function BusinessUseCases() {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">Freelance Productization</p>
          <h2 className="mt-2 text-xl font-bold text-ink">接案應用說明</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {businessUseCases.map((useCase) => (
          <article key={useCase.title} className="rounded-md border border-line bg-slate-50 p-4">
            <h3 className="font-bold text-ink">{useCase.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{useCase.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
