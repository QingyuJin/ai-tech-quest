import { Send } from "lucide-react";
import Button from "../../../components/Button.jsx";
import { classOptions, clusterDefinitions } from "../data/mlDataset.js";
import { cn } from "../../../utils/cn.js";

export default function MlClassSelector({
  selectedSample,
  selectedLabel,
  setSelectedLabel,
  loading,
  onSubmit,
}) {
  return (
    <section className="panel p-5">
      <p className="section-label">Player Interaction</p>
      <h2 className="mt-2 text-xl font-bold text-ink">選擇未知資料點分類</h2>
      {selectedSample ? (
        <div className="mt-4 rounded-md border border-line bg-slate-50 p-4">
          <p className="text-sm font-bold text-ink">{selectedSample.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{selectedSample.context}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-md bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                feature 1
              </p>
              <p className="mt-1 font-bold text-ink">activity score: {selectedSample.activityScore}</p>
            </div>
            <div className="rounded-md bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                feature 2
              </p>
              <p className="mt-1 font-bold text-ink">
                consistency score: {selectedSample.consistencyScore}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-md border border-dashed border-line bg-slate-50 p-4 text-sm text-slate-600">
          先點擊 scatter plot 裡的 Unknown Sample。
        </p>
      )}

      <div className="mt-5 grid gap-3">
        {classOptions.map((option) => {
          const cluster = clusterDefinitions[option.label];
          return (
            <button
              key={option.label}
              type="button"
              disabled={!selectedSample}
              onClick={() => setSelectedLabel(option.label)}
              className={cn(
                "focus-ring rounded-md border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-45",
                selectedLabel === option.label
                  ? `${cluster.borderClass} bg-slate-50`
                  : "border-line bg-white hover:border-slate-400",
              )}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-md text-sm font-black text-white ${cluster.bgClass}`}>
                  {option.label}
                </span>
                <div>
                  <p className="font-bold text-ink">{option.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        className="mt-5 w-full"
        icon={Send}
        disabled={!selectedSample || !selectedLabel || loading}
        onClick={onSubmit}
      >
        {loading ? "Model predicting..." : "Submit Classification"}
      </Button>
    </section>
  );
}
