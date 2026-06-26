import { LockKeyhole, Mail, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/mockData.js";
import { useQuestStore } from "../store/useQuestStore.js";

export default function PortfolioUnlockPage() {
  const portfolioUnlocked = useQuestStore((state) => state.isPortfolioUnlocked)();
  const completedMissionIds = useQuestStore((state) => state.completedMissionIds);

  return (
    <div className="grid gap-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">產品展示室</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              {portfolioUnlocked ? "產品展示室已解鎖" : "產品展示室尚未解鎖"}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {portfolioUnlocked
                ? "任務已完成。這些卡片整理了晴宇 AI Lab 的產品路線與可部署方向。"
                : `完成所有任務後即可解鎖產品卡。目前進度：${completedMissionIds.length}/5。`}
            </p>
          </div>
          <Link to="/missions">
            <Button icon={portfolioUnlocked ? Trophy : LockKeyhole} variant={portfolioUnlocked ? "success" : "primary"}>
              返回任務選擇
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locked={!portfolioUnlocked} />
        ))}
      </section>

      <section className="panel border-t-4 border-cyan p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="section-label">合作 / 聯絡</p>
            <h2 className="mt-2 text-2xl font-black text-ink">
              我把 AI 技術做成可以被使用、被理解、也能交付的產品展示。
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              我打造互動式 AI 應用、文件檢索增強生成（RAG）系統、全端開發（Full-stack）展示，
              以及 Unity 技術展示。
            </p>
          </div>
          <a
            href="https://github.com/QingyuJin"
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            聯絡 Qingyu
          </a>
        </div>
      </section>
    </div>
  );
}
