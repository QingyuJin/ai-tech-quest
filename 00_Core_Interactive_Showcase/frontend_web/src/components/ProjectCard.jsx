import { BookOpenText, ExternalLink, Github, LockKeyhole, MonitorPlay } from "lucide-react";
import TechBadge from "./TechBadge.jsx";
import { cn } from "../utils/cn.js";

export default function ProjectCard({ project, locked }) {
  return (
    <article className={cn("panel flex h-full flex-col p-5", locked && "opacity-55")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-label">Portfolio Project</p>
          <h2 className="mt-2 text-xl font-bold text-ink">{project.title}</h2>
        </div>
        {locked ? <LockKeyhole className="h-5 w-5 text-slate-400" aria-hidden="true" /> : null}
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{project.summary}</p>
      <div className="mt-4 rounded-md border border-line bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          What it demonstrates
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{project.demonstrates}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        <a
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-signal-cyan hover:text-signal-cyan"
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MonitorPlay className="h-3.5 w-3.5" aria-hidden="true" />
          Demo
        </a>
        <a
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-signal-cyan hover:text-signal-cyan"
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          GitHub
        </a>
        <a
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-signal-cyan hover:text-signal-cyan"
          href={project.caseStudyUrl}
          target="_blank"
          rel="noreferrer"
        >
          <BookOpenText className="h-3.5 w-3.5" aria-hidden="true" />
          Case
        </a>
      </div>
      {locked ? (
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Complete all missions to unlock the portfolio room.
        </p>
      ) : null}
    </article>
  );
}
