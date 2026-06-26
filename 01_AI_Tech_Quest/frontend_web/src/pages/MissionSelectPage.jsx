import { Presentation, RotateCcw, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import MissionCard from "../components/MissionCard.jsx";
import { missions } from "../data/mockData.js";
import { questService } from "../services/questService.js";
import { useQuestStore } from "../store/useQuestStore.js";

export default function MissionSelectPage() {
  const activeMissionId = useQuestStore((state) => state.activeMissionId);
  const setActiveMission = useQuestStore((state) => state.setActiveMission);
  const completeMission = useQuestStore((state) => state.completeMission);
  const resetQuest = useQuestStore((state) => state.resetQuest);
  const completedMissionIds = useQuestStore((state) => state.completedMissionIds);
  const portfolioUnlocked = useQuestStore((state) => state.isPortfolioUnlocked)();

  async function handleComplete(missionId) {
    await questService.completeMission(missionId);
    completeMission(missionId);
  }

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">任務選擇</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              選擇一個產品任務
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              每個任務都代表晴宇 AI Lab 的一條產品路線。完成五個任務後，就能解鎖產品展示室。
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/demo">
              <Button icon={Presentation} variant="secondary">
                展示模式
              </Button>
            </Link>
            <Button icon={RotateCcw} variant="secondary" onClick={resetQuest}>
              重置進度
            </Button>
            <Link to="/portfolio">
              <Button icon={Trophy} variant={portfolioUnlocked ? "success" : "primary"}>
                產品展示室
              </Button>
            </Link>
          </div>
        </div>
        <AnimatePresence>
          {portfolioUnlocked ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800"
            >
              任務已全部完成，產品展示室已解鎖。
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            active={mission.id === activeMissionId}
            completed={completedMissionIds.includes(mission.id)}
            onActivate={setActiveMission}
            onComplete={handleComplete}
          />
        ))}
      </section>
    </div>
  );
}
