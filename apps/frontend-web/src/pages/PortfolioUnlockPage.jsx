import { LockKeyhole, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "../components/common/MetricCard.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import AIGuide from "../components/mission/AIGuide.jsx";
import PortfolioCard from "../features/portfolio/PortfolioCard.jsx";
import { missionOrder, portfolioProjects } from "../data/missions.js";
import { useMissionStore } from "../stores/useMissionStore.js";

export default function PortfolioUnlockPage() {
  const completedMissionIds = useMissionStore((state) => state.completedMissionIds);
  const unlocked = useMissionStore((state) => state.isPortfolioUnlocked)();
  const missing = missionOrder.length - completedMissionIds.length;

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Portfolio Unlock"
        title={unlocked ? "作品集已解鎖" : "作品集房間尚未完全解鎖"}
        description={
          unlocked
            ? "五張作品卡已開啟，之後可逐步補上真 Demo、GitHub、case study 與截圖。"
            : `還需要完成 ${missing} 個任務。這裡先保留作品卡結構，方便未來直接接到作品集網站。`
        }
        actions={
          <Link
            to="/missions"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            {unlocked ? <Trophy className="h-4 w-4" aria-hidden="true" /> : <LockKeyhole className="h-4 w-4" aria-hidden="true" />}
            Missions
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Unlock Status" value={unlocked ? "Open" : "Locked"} detail="由三個任務完成狀態控制" />
        <MetricCard label="Projects" value={portfolioProjects.length} detail="主力作品卡數量" />
        <MetricCard label="Next Asset" value="Demo Links" detail="placeholder 之後換成真連結" />
      </div>

      <AIGuide
        tone={unlocked ? "success" : "warning"}
        message={
          unlocked
            ? "這個頁面會把遊戲流量導回履歷與接案。下一步最值得先補的是 RAG 關卡，因為它最能展示高技術可信回答。"
            : "作品集卡已經先建立好，等任務完成後就能呈現完整解鎖狀態。"
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {portfolioProjects.map((project) => (
          <PortfolioCard key={project.id} project={project} locked={!unlocked} />
        ))}
      </div>
    </div>
  );
}
