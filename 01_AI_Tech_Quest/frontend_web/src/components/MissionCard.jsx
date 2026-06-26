import { CheckCircle2, ExternalLink, Loader2, Play, RadioTower } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import TechBadge from "./TechBadge.jsx";
import { cn } from "../utils/cn.js";

const accentClass = {
  cyan: "border-cyan",
  amber: "border-amber",
  green: "border-green",
  violet: "border-violet",
  teal: "border-teal",
};

export default function MissionCard({ mission, completed, active, onActivate, onComplete }) {
  const [busy, setBusy] = useState(false);

  async function handleComplete() {
    setBusy(true);
    await onComplete(mission.id);
    setBusy(false);
  }

  return (
    <motion.article
      layout
      className={cn(
        "panel flex h-full flex-col border-t-4 p-5 transition",
        accentClass[mission.accent],
        completed && "bg-emerald-50/70",
        active && "shadow-glow",
      )}
    >
      <button
        type="button"
        onClick={() => onActivate(mission.id)}
        className="focus-ring rounded-lg text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="section-label">{mission.level}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                {mission.statusLabel}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-black text-ink">{mission.title}</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">{mission.subtitle}</p>
          </div>
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-green" aria-hidden="true" />
          ) : (
            <RadioTower className="h-6 w-6 text-slate-400" aria-hidden="true" />
          )}
        </div>
      </button>

      <p className="mt-4 text-sm leading-6 text-slate-600">{mission.summary}</p>

      <AnimatePresence initial={false}>
        {active ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-lg border border-line bg-white p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                展示重點
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                {mission.demonstrates.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap gap-2">
        {mission.stack.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {mission.route ? (
          <Link
            to={mission.route}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            {completed ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
            {completed ? "再次查看" : "開始挑戰"}
          </Link>
        ) : (
          <Button
            icon={busy ? Loader2 : completed ? CheckCircle2 : Play}
            variant={completed ? "success" : "primary"}
            disabled={busy || completed}
            onClick={handleComplete}
            className={busy ? "[&>svg]:animate-spin" : ""}
          >
            {completed ? "已完成" : "完成任務"}
          </Button>
        )}
        {mission.link ? (
          <a
            href={mission.link}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-cyan hover:text-cyan"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            GitHub 原始碼
          </a>
        ) : (
          <Button variant="secondary" onClick={() => onActivate(mission.id)}>
            查看摘要
          </Button>
        )}
      </div>
    </motion.article>
  );
}
