import { Github, LockKeyhole, Mail, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { portfolioLinks, projects } from "../data/mockData.js";
import { useMissionStore } from "../store/useMissionStore.js";

export default function PortfolioUnlockPage() {
  const unlocked = useMissionStore((state) => state.isPortfolioUnlocked)();
  const completedMissionIds = useMissionStore((state) => state.completedMissionIds);

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Portfolio Unlock</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              {unlocked ? "作品集已解鎖" : "作品集房間尚未解鎖"}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {unlocked
                ? "三個任務都完成了。這裡展示 Qingyu 的 AI / RAG / ML / Unity 技術作品路線，以及未來可拆分 repo 的作品卡。"
                : `目前完成 ${completedMissionIds.length}/3 個任務。完成所有任務後，作品卡會從 locked 狀態變成正式展示狀態。`}
            </p>
          </div>
          <Link to="/missions">
            <Button icon={unlocked ? Trophy : LockKeyhole} variant={unlocked ? "success" : "secondary"}>
              Back to Missions
            </Button>
          </Link>
        </div>
      </section>

      <section className="panel p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="section-label">Main Repository</p>
            <h2 className="mt-2 text-2xl font-black text-ink">AI Tech Quest</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              The unlocked portfolio is powered by the main AI Tech Quest repository, with future
              modules split into focused repos for client-ready AI products and technical demos.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 md:min-w-80">
            <a
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-signal-cyan hover:text-signal-cyan"
              href={portfolioLinks.mainRepo}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Main Repo
            </a>
            <a
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-signal-cyan hover:text-signal-cyan"
              href={portfolioLinks.webStudio}
              target="_blank"
              rel="noreferrer"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Web Studio
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locked={!unlocked} />
        ))}
      </section>

      <section className="panel border-t-4 border-signal-cyan p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="section-label">Hire Me / Contact</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Build AI products that people can actually try.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              I build interactive AI applications, RAG systems, full-stack demos, and Unity-based
              technical showcases.
            </p>
          </div>
          <a
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            href={portfolioLinks.contact}
            target="_blank"
            rel="noreferrer"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact Qingyu
          </a>
        </div>
      </section>
    </div>
  );
}
