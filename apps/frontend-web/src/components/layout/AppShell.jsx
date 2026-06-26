import { BrainCircuit, Map, RotateCcw } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../common/Button.jsx";
import { missionOrder } from "../../data/missions.js";
import { useMissionStore } from "../../stores/useMissionStore.js";
import { cn } from "../../utils/cn.js";

const navItems = [
  { to: "/missions", label: "Missions" },
  { to: "/portfolio-unlock", label: "Portfolio" },
];

export default function AppShell({ children }) {
  const location = useLocation();
  const completedMissionIds = useMissionStore((state) => state.completedMissionIds);
  const resetProgress = useMissionStore((state) => state.resetProgress);
  const progress = Math.round((completedMissionIds.length / missionOrder.length) * 100);
  const isHome = location.pathname === "/";

  return (
    <div className="lab-grid min-h-screen text-ink">
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

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-ink",
                    isActive && "bg-slate-100 text-ink",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!isHome ? (
              <div className="hidden min-w-40 sm:block">
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-lab-green transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : null}
            <Button
              variant="subtle"
              icon={RotateCcw}
              className="hidden sm:inline-flex"
              onClick={resetProgress}
            >
              Reset
            </Button>
            <Link
              to="/missions"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Map className="h-4 w-4" aria-hidden="true" />
              Missions
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
