import { ArrowRight, BrainCircuit, FlaskConical, Layers3 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AIGuide from "../components/mission/AIGuide.jsx";
import { missions } from "../data/missions.js";

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <section className="grid min-h-[calc(100vh-132px)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            <BrainCircuit className="h-4 w-4" aria-hidden="true" />
            Qingyu AI Lab Interactive Showcase
          </div>
          <div>
            <h1 className="max-w-4xl text-5xl font-black tracking-normal text-ink sm:text-6xl lg:text-7xl">
              AI Tech Quest
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Explore Qingyu AI Lab through interactive AI missions. 每一關都是一個可延伸成履歷作品與接案服務的技術展示。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/missions"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Start Mission
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/portfolio-unlock"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-slate-400"
            >
              Portfolio Room
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="panel p-5"
        >
          <div className="rounded-md border border-line bg-[#111418] p-5 text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  Mission Console
                </p>
                <h2 className="mt-2 text-2xl font-bold">AI Lab Control Deck</h2>
              </div>
              <FlaskConical className="h-8 w-8 text-cyan-200" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-3">
              {missions.map((mission, index) => (
                <div
                  key={mission.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-white/10 p-4"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-sm font-bold text-ink">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{mission.title}</p>
                    <p className="mt-1 text-xs text-slate-300">{mission.shortTitle}</p>
                  </div>
                  <Layers3 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <AIGuide
        message="這個展示先用 mock data 完成互動架構。等三關流程穩定後，就能把 service 層替換成真正的 RAG pipeline、ML model、FAQ database 與 Unity WebGL API。"
      />
    </div>
  );
}
