import { LockKeyhole, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "../components/common/MetricCard.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import AIGuide from "../components/mission/AIGuide.jsx";
import MissionCard from "../components/mission/MissionCard.jsx";
import { missions, missionOrder } from "../data/missions.js";
import { useMissionStore } from "../stores/useMissionStore.js";

export default function MissionSelectPage() {
  const completedMissionIds = useMissionStore((state) => state.completedMissionIds);
  const isPortfolioUnlocked = useMissionStore((state) => state.isPortfolioUnlocked);
  const completedCount = completedMissionIds.length;
  const unlocked = isPortfolioUnlocked();

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Mission Select"
        title="選擇 AI Tech Quest 任務"
        description="三個任務分別對應 RAG、ML 與可接案 AI Business Assistant。每一關完成後都會累積解鎖進度。"
        actions={
          <Link
            to="/portfolio-unlock"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            {unlocked ? <Trophy className="h-4 w-4" aria-hidden="true" /> : <LockKeyhole className="h-4 w-4" aria-hidden="true" />}
            Portfolio
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Completed" value={`${completedCount}/${missionOrder.length}`} detail="任務完成數" />
        <MetricCard label="Unlock Rule" value="3 Missions" detail="完成三關後開啟作品集房間" />
        <MetricCard label="Data Mode" value="Mock" detail="先驗證互動與架構，再接真服務" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            completed={completedMissionIds.includes(mission.id)}
          />
        ))}
      </div>

      <AIGuide
        tone={unlocked ? "success" : "neutral"}
        message={
          unlocked
            ? "三個任務都完成了。作品集房間現在可以展示四個主力作品卡，下一步可以把 Demo placeholder 換成真連結。"
            : "先跑完整個任務流程。現在所有回答都來自 mock service，但前端頁面、狀態管理與未來 API 邊界已經先分好了。"
        }
      />
    </div>
  );
}
