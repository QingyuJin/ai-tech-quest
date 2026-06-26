import { ArrowRight, FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function HomePage() {
  return (
    <div className="grid gap-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel overflow-hidden p-6 sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-label">晴宇 AI Lab</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
              AI 技術任務
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              互動式 AI 產品展示 by Qingyu Jin
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              完成文件問答、模型分類、店家自動化、BuildFlow 與 Unity 學習任務，最後解鎖產品展示室。
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/missions">
                <Button icon={ArrowRight} className="w-full sm:w-auto">
                  開始任務
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="secondary" icon={ShieldCheck} className="w-full sm:w-auto">
                  查看產品展示室
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-slate-950 p-5 text-white shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/20 text-cyan">
                  <FlaskConical className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black">任務控制台</p>
                  <p className="text-xs text-slate-400">系統已準備完成</p>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-cyan" aria-hidden="true" />
            </div>
            <div className="mt-6 grid gap-3">
              {[
                "文件檢索增強生成（RAG）",
                "模型評估（ML）",
                "店家自動化",
                "BuildFlow",
                "Unity WebGL",
              ].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="text-sm font-semibold">{item}</span>
                    <span className="text-xs font-bold text-cyan">0{index + 1}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
