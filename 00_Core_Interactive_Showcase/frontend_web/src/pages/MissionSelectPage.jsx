import { LockKeyhole, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import MissionCard from "../components/MissionCard.jsx";
import TechExplanationCard from "../components/TechExplanationCard.jsx";
import { missions, techExplanations } from "../data/mockData.js";
import { useMissionStore } from "../store/useMissionStore.js";

export default function MissionSelectPage() {
  const completedMissionIds = useMissionStore((state) => state.completedMissionIds);
  const completeMission = useMissionStore((state) => state.completeMission);
  const unlocked = useMissionStore((state) => state.isPortfolioUnlocked)();

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Mission Select</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              選擇 AI 技術任務
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              三個任務分別展示 RAG、ML 與 AI Business Assistant。每一關都有獨立互動流程，
              完成後會更新進度並解鎖作品集房間。
            </p>
          </div>
          <Link to="/portfolio">
            <Button icon={unlocked ? Trophy : LockKeyhole} variant={unlocked ? "success" : "secondary"}>
              {unlocked ? "Portfolio Unlocked" : "Portfolio Locked"}
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            completed={completedMissionIds.includes(mission.id)}
            onComplete={completeMission}
          />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {missions.map((mission) => (
          <TechExplanationCard
            key={mission.id}
            explanation={techExplanations[mission.id]}
          />
        ))}
      </section>
    </div>
  );
}
