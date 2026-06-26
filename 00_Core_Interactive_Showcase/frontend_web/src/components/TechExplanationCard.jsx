import { Cpu } from "lucide-react";
import TechBadge from "./TechBadge.jsx";

export default function TechExplanationCard({ explanation }) {
  return (
    <article className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
          <Cpu className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">Tech Explanation</p>
          <h3 className="mt-2 text-lg font-bold text-ink">{explanation.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{explanation.body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {explanation.bullets.map((item) => (
          <TechBadge key={item}>{item}</TechBadge>
        ))}
      </div>
    </article>
  );
}
