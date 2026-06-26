import { SendHorizontal } from "lucide-react";
import Button from "../../../components/Button.jsx";
import { classDefinitions } from "../data/mlDataset.js";

export default function MlClassSelector({
  selectedSample,
  selectedLabel,
  setSelectedLabel,
  loading,
  error,
  onSubmit,
}) {
  return (
    <section className="panel p-5">
      <p className="section-label">玩家互動</p>
      <h2 className="mt-2 text-xl font-black text-ink">選擇預測類別</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        先點擊散佈圖中的未知資料點，再選擇你認為它屬於哪一類。
      </p>

      <div className="mt-4 rounded-xl border border-line bg-slate-50 p-4">
        {selectedSample ? (
          <div className="grid gap-2 text-sm text-slate-700">
            <p>
              <span className="font-black">資料點：</span> {selectedSample.id}
            </p>
            <p>
              <span className="font-black">活躍分數（activity score）：</span>{" "}
              {selectedSample.activityScore}
            </p>
            <p>
              <span className="font-black">穩定分數（consistency score）：</span>{" "}
              {selectedSample.consistencyScore}
            </p>
          </div>
        ) : (
          <p className="text-sm font-semibold text-slate-500">
            請先點擊圖中的未知資料點，啟動分類挑戰。
          </p>
        )}
      </div>

      <div className="mt-4 grid gap-3">
        {Object.entries(classDefinitions).map(([label, definition]) => (
          <button
            key={label}
            type="button"
            disabled={!selectedSample || loading}
            onClick={() => setSelectedLabel(label)}
            className={`focus-ring rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-45 ${
              selectedLabel === label
                ? "border-cyan bg-cyan/10"
                : "border-line bg-white hover:border-cyan"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-base font-black text-ink">
                {label}: {definition.label}
              </span>
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: definition.color }}
              />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{definition.description}</p>
          </button>
        ))}
      </div>

      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <Button
        icon={SendHorizontal}
        disabled={!selectedSample || !selectedLabel || loading}
        onClick={onSubmit}
        className="mt-5 w-full"
      >
        {loading ? "模型判斷中..." : "送出分類"}
      </Button>
    </section>
  );
}
