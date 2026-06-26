import { mlDataset } from "../../data/missions.js";

const colorByLabel = {
  A: "bg-cyan-600",
  B: "bg-amber-600",
  C: "bg-rose-600",
};

export default function DataPointScatter({ selections = {}, resultRows = [] }) {
  const resultById = Object.fromEntries(resultRows.map((row) => [row.id, row]));

  return (
    <div className="surface p-4">
      <div className="relative h-80 overflow-hidden rounded-md border border-line bg-white">
        <div className="absolute bottom-5 left-6 top-5 w-px bg-slate-300" />
        <div className="absolute bottom-6 left-6 right-5 h-px bg-slate-300" />
        <span className="absolute bottom-1 left-7 text-xs text-slate-500">feature x</span>
        <span className="absolute left-2 top-4 text-xs text-slate-500">feature y</span>
        {mlDataset.map((point) => {
          const row = resultById[point.id];
          const selected = selections[point.id];
          return (
            <div
              key={point.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${point.x}%`, top: `${100 - point.y}%` }}
            >
              <div
                className={`grid h-11 w-11 place-items-center rounded-md text-xs font-bold text-white shadow-sm ${
                  row ? colorByLabel[row.modelLabel] : "bg-slate-700"
                }`}
                title={`${point.name}: ${point.description}`}
              >
                {selected ?? "?"}
              </div>
              <p className="mt-1 text-center text-[11px] font-semibold text-slate-600">{point.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
