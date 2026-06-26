import { CheckCircle2 } from "lucide-react";
import { missionOrder } from "../data/mockData.js";
import { useQuestStore } from "../store/useQuestStore.js";

export default function ProgressBar() {
  const completedCount = useQuestStore((state) => state.completedMissionIds.length);
  const progressPercent = useQuestStore((state) => state.progressPercent)();

  return (
    <section className="panel p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-label">任務進度</p>
          <p className="mt-1 text-sm font-bold text-ink">
            已完成 {completedCount}/{missionOrder.length} 個任務
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-bold text-green">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {progressPercent}%
        </div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-cyan transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  );
}
