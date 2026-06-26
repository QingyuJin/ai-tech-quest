import { Crosshair } from "lucide-react";
import { classDefinitions, clusterPoints, unknownSample } from "../data/mlDataset.js";

function pointStyle(point) {
  return {
    left: `${point.activityScore}%`,
    top: `${100 - point.consistencyScore}%`,
    backgroundColor: classDefinitions[point.label].color,
  };
}

export default function MlScatterPlot({ selectedSample, onSelectSample, result }) {
  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label">2D 特徵空間</p>
          <h2 className="mt-2 text-xl font-black text-ink">使用者行為散佈圖</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            X 軸是活躍分數（activity score），Y 軸是穩定分數（consistency score）。請點擊未知資料點，再判斷它屬於 A、B 或 C。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(classDefinitions).map(([label, definition]) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-slate-600"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: definition.color }}
              />
              {label}: {definition.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-slate-950 p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:12.5%_12.5%]">
          <div className="absolute bottom-4 left-4 right-4 h-px bg-white/25" />
          <div className="absolute bottom-4 left-4 top-4 w-px bg-white/25" />
          <span className="absolute bottom-1 right-4 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            活躍分數
          </span>
          <span className="absolute left-2 top-4 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            穩定分數
          </span>

          {clusterPoints.map((point) => (
            <span
              key={point.id}
              className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white/60"
              style={pointStyle(point)}
              title={`${point.label}: ${point.activityScore}, ${point.consistencyScore}`}
            />
          ))}

          <button
            type="button"
            onClick={() => onSelectSample(unknownSample)}
            className="focus-ring absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border-2 border-white bg-white text-ink shadow-glow transition hover:scale-105"
            style={{
              left: `${unknownSample.activityScore}%`,
              top: `${100 - unknownSample.consistencyScore}%`,
            }}
            aria-label="選擇未知使用者資料點"
          >
            <Crosshair className="h-5 w-5" aria-hidden="true" />
          </button>

          {selectedSample ? (
            <div
              className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-cyan"
              style={{
                left: `${selectedSample.activityScore}%`,
                top: `${100 - selectedSample.consistencyScore}%`,
              }}
            />
          ) : null}

          {result ? (
            <div className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white backdrop-blur">
              模型：{result.modelPrediction} / 正解：{result.correctLabel}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
