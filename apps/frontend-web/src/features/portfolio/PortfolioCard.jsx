import { ExternalLink, Github } from "lucide-react";

export default function PortfolioCard({ project, locked }) {
  return (
    <article className={`panel flex h-full flex-col p-5 ${locked ? "opacity-60" : ""}`}>
      <p className="section-label">Portfolio Project</p>
      <h2 className="mt-3 text-xl font-bold text-ink">{project.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="rounded-full border border-line bg-slate-50 px-3 py-1 text-xs text-slate-600">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        <a
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          href={project.demoUrl}
          aria-disabled={locked}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Demo
        </a>
        <a
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          href={project.githubUrl}
          aria-disabled={locked}
        >
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          GitHub
        </a>
        <a
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          href={project.caseStudyUrl}
          aria-disabled={locked}
        >
          Case
        </a>
      </div>
    </article>
  );
}
