import { ArrowRight, FlaskConical, Layers3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import TechBadge from "../components/TechBadge.jsx";
import { missions } from "../data/mockData.js";

export default function HomePage() {
  return (
    <section className="grid min-h-[calc(100vh-220px)] gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="panel p-6 sm:p-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Interactive AI Portfolio Game
        </div>
        <h1 className="mt-6 text-5xl font-black tracking-normal text-ink sm:text-6xl">
          AI Tech Quest
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Explore Qingyu AI Lab through interactive AI missions.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Complete AI / ML / RAG / Full-stack missions, then unlock the portfolio room.
          This MVP uses mock data now and is structured for real services later.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/missions">
            <Button icon={ArrowRight}>Start Mission</Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="secondary">View Portfolio Room</Button>
          </Link>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {["React", "FastAPI-ready", "RAG", "ML", "Unity WebGL"].map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="panel overflow-hidden p-5"
      >
        <div className="rounded-md border border-slate-800 bg-[#111418] p-5 text-white">
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                Lab Console
              </p>
              <h2 className="mt-2 text-2xl font-bold">Mission Control</h2>
            </div>
            <FlaskConical className="h-8 w-8 text-cyan-200" aria-hidden="true" />
          </div>
          <div className="mt-5 grid gap-3">
            {missions.map((mission, index) => (
              <div
                key={mission.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-white/10 p-4"
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-sm font-black text-ink">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{mission.title}</p>
                  <p className="mt-1 text-xs text-slate-300">{mission.subtitle}</p>
                </div>
                <Layers3 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
