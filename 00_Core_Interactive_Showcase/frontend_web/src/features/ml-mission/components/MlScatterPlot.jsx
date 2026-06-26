import { motion } from "framer-motion";
import { clusterDefinitions, knownDataPoints } from "../data/mlDataset.js";

function toPlotX(activityScore) {
  return `${8 + activityScore * 0.84}%`;
}

function toPlotY(consistencyScore) {
  return `${92 - consistencyScore * 0.78}%`;
}

export default function MlScatterPlot({ sample, selectedSample, onSelectSample, result }) {
  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">2D Feature Space</p>
          <h2 className="mt-2 text-xl font-bold text-ink">資料點展示</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            X 軸是 activity score，Y 軸是 consistency score。點擊 Unknown Sample 後進行分類。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.values(clusterDefinitions).map((cluster) => (
            <span key={cluster.label} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cluster.color }} />
              {cluster.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-5 h-[360px] overflow-hidden rounded-md border border-line bg-white">
        <div className="absolute bottom-8 left-10 top-6 w-px bg-slate-300" />
        <div className="absolute bottom-8 left-10 right-6 h-px bg-slate-300" />
        <span className="absolute bottom-2 left-12 text-xs font-semibold text-slate-500">
          activity score
        </span>
        <span className="absolute left-3 top-6 text-xs font-semibold text-slate-500 [writing-mode:vertical-rl]">
          consistency score
        </span>

        {Object.values(clusterDefinitions).map((cluster) => (
          <div
            key={cluster.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300 bg-slate-50/70 px-3 py-1 text-xs font-bold text-slate-500"
            style={{
              left: toPlotX(cluster.centroid.activityScore),
              top: toPlotY(cluster.centroid.consistencyScore),
            }}
          >
            {cluster.label} center
          </div>
        ))}

        {knownDataPoints.map((point) => {
          const cluster = clusterDefinitions[point.label];
          return (
            <div
              key={point.id}
              className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
              style={{
                left: toPlotX(point.activityScore),
                top: toPlotY(point.consistencyScore),
                backgroundColor: cluster.color,
              }}
              title={`${point.id}: ${cluster.name}`}
            />
          );
        })}

        <motion.button
          type="button"
          className={`focus-ring absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 text-sm font-black shadow-lg ${
            selectedSample
              ? "border-ink bg-white text-ink"
              : "border-violet-300 bg-violet-50 text-violet-700"
          }`}
          style={{
            left: toPlotX(sample.activityScore),
            top: toPlotY(sample.consistencyScore),
          }}
          animate={{
            scale: selectedSample ? [1, 1.08, 1] : [1, 1.12, 1],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
          onClick={() => onSelectSample(sample)}
        >
          ?
        </motion.button>

        {result ? (
          <div
            className="absolute rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow"
            style={{
              left: toPlotX(sample.activityScore),
              top: `calc(${toPlotY(sample.consistencyScore)} + 34px)`,
            }}
          >
            Pred: {result.modelPrediction}
          </div>
        ) : null}
      </div>
    </section>
  );
}
