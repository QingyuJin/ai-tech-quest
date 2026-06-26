import { Cpu } from "lucide-react";

export default function TechExplanation({ explanation }) {
  return (
    <section className="panel p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          <Cpu className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">{explanation.title}</p>
          <h2 className="mt-2 text-xl font-bold text-ink">{explanation.headline}</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {explanation.points.map((point) => (
          <div key={point} className="rounded-md border border-line bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {point}
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-md border border-dashed border-slate-300 bg-white p-4 text-sm font-medium text-slate-700">
        Future upgrade: {explanation.futureUpgrade}
      </p>
    </section>
  );
}
