import { CheckCircle2, CircleDashed, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import TechBadge from "./TechBadge.jsx";
import { cn } from "../utils/cn.js";

const accentClasses = {
  cyan: "border-t-signal-cyan",
  amber: "border-t-signal-amber",
  green: "border-t-signal-green",
};

export default function MissionCard({ mission, completed, onComplete }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "panel flex h-full flex-col border-t-4 p-5",
        accentClasses[mission.accent],
        completed ? "bg-emerald-50/60" : "bg-white",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {mission.subtitle}
          </p>
          <h2 className="mt-2 text-xl font-bold text-ink">{mission.title}</h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
            completed
              ? "border-emerald-200 bg-emerald-100 text-emerald-800"
              : "border-slate-200 bg-slate-100 text-slate-600",
          )}
        >
          {completed ? (
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <CircleDashed className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{mission.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {mission.tech.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </div>

      {mission.route ? (
        <Link to={mission.route} className="mt-6">
          <Button
            className="w-full"
            icon={completed ? CheckCircle2 : Play}
            variant={completed ? "success" : "primary"}
          >
            {completed ? "Review Mission" : "Enter Mission"}
          </Button>
        </Link>
      ) : (
        <Button
          className="mt-6 w-full"
          icon={completed ? CheckCircle2 : Play}
          variant={completed ? "success" : "primary"}
          onClick={() => onComplete(mission.id)}
          disabled={completed}
        >
          {completed ? "Mission Complete" : "Complete Mock Mission"}
        </Button>
      )}
    </motion.article>
  );
}
