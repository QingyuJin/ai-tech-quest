import { ArrowLeft, BrainCircuit, RotateCcw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AIMessageBox from "./AIMessageBox.jsx";
import Button from "./Button.jsx";
import ProgressPanel from "./ProgressPanel.jsx";
import { useGuideMessage } from "../hooks/useGuideMessage.js";
import { useMissionStore } from "../store/useMissionStore.js";

export default function Layout({ children }) {
  const location = useLocation();
  const guideMessage = useGuideMessage();
  const resetProgress = useMissionStore((state) => state.resetProgress);
  const showBackToMissions = location.pathname !== "/" && location.pathname !== "/missions";

  return (
    <div className="lab-grid flex min-h-screen flex-col text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink text-white">
              <BrainCircuit className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">AI Tech Quest</span>
              <span className="block truncate text-xs text-slate-500">Qingyu AI Lab</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {showBackToMissions ? (
              <Link
                to="/missions"
                className="focus-ring hidden min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 sm:inline-flex"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Missions
              </Link>
            ) : null}
            <Button icon={RotateCcw} variant="subtle" onClick={resetProgress}>
              Reset
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>{children}</div>
        <aside className="grid content-start gap-4">
          <ProgressPanel />
          <AIMessageBox message={guideMessage} />
        </aside>
      </main>

      <footer className="border-t border-line bg-white/84">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>AI Tech Quest MVP</span>
          <span>Built for QingyuJin · GitHub-ready interactive portfolio</span>
        </div>
      </footer>
    </div>
  );
}
