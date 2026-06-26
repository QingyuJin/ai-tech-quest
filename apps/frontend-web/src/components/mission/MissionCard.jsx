import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StatusPill from "../common/StatusPill.jsx";

const accentClasses = {
  cyan: "border-t-lab-cyan",
  amber: "border-t-lab-amber",
  green: "border-t-lab-green",
};

export default function MissionCard({ mission, completed }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`panel flex h-full flex-col border-t-4 ${accentClasses[mission.accent]} p-5`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {mission.shortTitle}
          </p>
          <h2 className="mt-3 text-xl font-bold text-ink">{mission.title}</h2>
        </div>
        <StatusPill status={completed ? "completed" : "active"}>
          {completed ? "Completed" : "Ready"}
        </StatusPill>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{mission.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {mission.stack.map((item) => (
          <span key={item} className="rounded-full border border-line bg-slate-50 px-3 py-1 text-xs text-slate-600">
            {item}
          </span>
        ))}
      </div>

      <Link
        to={mission.route}
        className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        {completed ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : null}
        Enter Mission
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.article>
  );
}
