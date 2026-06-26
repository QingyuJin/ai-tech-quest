import { ExternalLink, FileText, Github, LockKeyhole } from "lucide-react";
import TechBadge from "./TechBadge.jsx";
import { cn } from "../utils/cn.js";

export default function ProductCard({ product, locked }) {
  return (
    <article className={cn("panel flex h-full flex-col p-5", locked && "opacity-55")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label">產品卡</p>
          <h2 className="mt-2 text-xl font-black text-ink">{product.name}</h2>
        </div>
        {locked ? <LockKeyhole className="h-5 w-5 text-slate-400" aria-hidden="true" /> : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>
      <div className="mt-4 rounded-lg border border-line bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
          產品展示重點
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{product.demonstrates}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {product.stack.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        <a
          href={product.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan hover:text-cyan"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          線上展示
        </a>
        <a
          href={product.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan hover:text-cyan"
        >
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          GitHub 原始碼
        </a>
        <a
          href={product.caseStudyUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan hover:text-cyan"
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          案例說明
        </a>
      </div>
    </article>
  );
}
