import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FastForward,
  Lightbulb,
  PlayCircle,
  Timer,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import { demoChecklist, demoScriptSteps } from "../data/demoScript.js";
import { missionOrder } from "../data/mockData.js";
import { useQuestStore } from "../store/useQuestStore.js";
import { cn } from "../utils/cn.js";

export default function DemoModePage() {
  const [activeStepId, setActiveStepId] = useState(demoScriptSteps[0].id);
  const completedMissionIds = useQuestStore((state) => state.completedMissionIds);
  const completeMission = useQuestStore((state) => state.completeMission);
  const resetQuest = useQuestStore((state) => state.resetQuest);
  const portfolioUnlocked = useQuestStore((state) => state.isPortfolioUnlocked)();

  const activeStep = useMemo(
    () => demoScriptSteps.find((step) => step.id === activeStepId) ?? demoScriptSteps[0],
    [activeStepId],
  );
  const activeIndex = demoScriptSteps.findIndex((step) => step.id === activeStep.id);

  function handleNextStep() {
    const nextIndex = Math.min(activeIndex + 1, demoScriptSteps.length - 1);
    setActiveStepId(demoScriptSteps[nextIndex].id);
  }

  function handleUnlockDemo() {
    missionOrder.forEach((missionId) => completeMission(missionId));
  }

  return (
    <div className="grid gap-6">
      <section className="panel overflow-hidden p-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_340px] xl:items-start">
          <div>
            <p className="section-label">展示模式</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              3 分鐘產品展示腳本
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              這條路線讓你在面試、接案簡報或客戶試用時，快速展示 AI 技術任務的產品價值。
              跟著步驟走，先講產品，再展示互動，最後收斂到可交付服務。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to={activeStep.route}>
                <Button icon={PlayCircle} className="w-full sm:w-auto">
                  {activeStep.cta}
                </Button>
              </Link>
              <Button
                icon={FastForward}
                variant={portfolioUnlocked ? "success" : "secondary"}
                onClick={handleUnlockDemo}
                className="w-full sm:w-auto"
              >
                {portfolioUnlocked ? "展示室已解鎖" : "展示用快速解鎖"}
              </Button>
              <Button variant="subtle" onClick={resetQuest} className="w-full sm:w-auto">
                重置展示進度
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  目前任務進度
                </p>
                <p className="mt-1 text-2xl font-black text-ink">
                  {completedMissionIds.length}/{missionOrder.length}
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-cyan shadow-sm">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              展示用快速解鎖會把五個任務標成已完成，方便直接打開產品展示室。
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="panel p-4">
          <p className="section-label">展示路線</p>
          <div className="mt-4 grid gap-2">
            {demoScriptSteps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                className={cn(
                  "focus-ring rounded-xl border px-4 py-3 text-left transition",
                  step.id === activeStep.id
                    ? "border-cyan bg-cyan/10 text-ink shadow-sm"
                    : "border-line bg-white text-slate-600 hover:border-cyan hover:text-cyan",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-black">{step.step}. {step.title}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold">
                    <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                    {step.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <motion.article
          key={activeStep.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="section-label">步驟 {activeStep.step}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                  <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                  {activeStep.duration}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-black text-ink">{activeStep.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                {activeStep.audienceTakeaway}
              </p>
            </div>
            <Link to={activeStep.route}>
              <Button icon={ArrowRight} className="w-full lg:w-auto">
                {activeStep.cta}
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-line bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-sm font-black text-ink">
                <Lightbulb className="h-4 w-4 text-cyan" aria-hidden="true" />
                現場怎麼講
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                {activeStep.talkingPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-white p-4">
              <p className="flex items-center gap-2 text-sm font-black text-ink">
                <CheckCircle2 className="h-4 w-4 text-green" aria-hidden="true" />
                現場操作
              </p>
              <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                {activeStep.demoActions.map((action, index) => (
                  <li key={action} className="flex gap-2">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-black text-slate-600">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              variant="secondary"
              onClick={() => setActiveStepId(demoScriptSteps[Math.max(activeIndex - 1, 0)].id)}
              disabled={activeIndex === 0}
              className="w-full sm:w-auto"
            >
              上一步
            </Button>
            <Button
              icon={ArrowRight}
              onClick={handleNextStep}
              disabled={activeIndex === demoScriptSteps.length - 1}
              className="w-full sm:w-auto"
            >
              下一步
            </Button>
          </div>
        </motion.article>
      </section>

      <section className="panel p-6">
        <p className="section-label">展示前檢查</p>
        <h2 className="mt-2 text-2xl font-black text-ink">讓對方看懂產品價值</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {demoChecklist.map((item) => (
            <div key={item} className="flex gap-3 rounded-xl border border-line bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
