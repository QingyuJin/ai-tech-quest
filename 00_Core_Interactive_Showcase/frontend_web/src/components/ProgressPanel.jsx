import { Trophy } from "lucide-react";
import { missionOrder } from "../data/mockData.js";
import { useMissionStore } from "../store/useMissionStore.js";

export default function ProgressPanel() {
  const completedMissionIds = useMissionStore((state) => state.completedMissionIds);
  const progress = useMissionStore((state) => state.progressPercent)();
  const unlocked = useMissionStore((state) => state.isPortfolioUnlocked)();

  return (
    <section className="panel p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-label">Mission Progress</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            {completedMissionIds.length}/{missionOrder.length} missions completed
          </p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-md bg-slate-100 text-ink">
          <Trophy className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-signal-green transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">
        {unlocked ? "Portfolio room unlocked." : "Complete all missions to unlock portfolio."}
      </p>
    </section>
  );
}
