import { ArrowLeft, FlaskConical, Github } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AIMessageBox from "./AIMessageBox.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { useGuideMessage } from "../hooks/useGuideMessage.js";

export default function Layout({ children }) {
  const location = useLocation();
  const guideMessage = useGuideMessage();
  const showBackToMissions = location.pathname !== "/missions" && location.pathname !== "/";

  return (
    <div className="min-h-screen bg-lab text-ink">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(15,118,110,0.12),transparent_30%)]" />
      <header className="sticky top-0 z-20 border-b border-line bg-white/86 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="focus-ring inline-flex items-center gap-3 rounded-lg">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white">
              <FlaskConical className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-black">AI 技術任務</span>
              <span className="block text-xs text-slate-500">晴宇 AI Lab</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {showBackToMissions ? (
              <Link
                to="/missions"
                className="focus-ring hidden min-h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-cyan hover:text-cyan sm:inline-flex"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                任務選擇
              </Link>
            ) : null}
            <a
              href="https://github.com/QingyuJin/ai-tech-quest"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-cyan hover:text-cyan"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub 原始碼
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="grid content-start gap-5">
          <ProgressBar />
          <AIMessageBox message={guideMessage} />
        </aside>
        <div>{children}</div>
      </main>

      <footer className="relative z-10 border-t border-line bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>互動式 AI 產品展示 by Qingyu Jin</span>
          <span>React / Vite / Tailwind CSS / Zustand / Framer Motion</span>
        </div>
      </footer>
    </div>
  );
}
