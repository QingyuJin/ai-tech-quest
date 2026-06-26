import { FileSearch, Send } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../components/common/Button.jsx";
import PageHeader from "../components/common/PageHeader.jsx";
import StatusPill from "../components/common/StatusPill.jsx";
import AIGuide from "../components/mission/AIGuide.jsx";
import TechExplanation from "../components/mission/TechExplanation.jsx";
import { ragDocuments, techExplanations } from "../data/missions.js";
import { askRagQuestion } from "../services/mockApi.js";
import { useMissionStore } from "../stores/useMissionStore.js";
import { cn } from "../utils/cn.js";

export default function RagMissionPage() {
  const [documentId, setDocumentId] = useState(ragDocuments[0].id);
  const [question, setQuestion] = useState("這份文件的營業時間和預約方式是什麼？");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const completeMission = useMissionStore((state) => state.completeMission);
  const completed = useMissionStore((state) => state.completedMissionIds.includes("rag"));

  const selectedDocument = useMemo(
    () => ragDocuments.find((document) => document.id === documentId) ?? ragDocuments[0],
    [documentId],
  );

  async function handleAsk(event) {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }
    setLoading(true);
    const response = await askRagQuestion({ documentId, question });
    setResult(response);
    completeMission("rag");
    setLoading(false);
  }

  return (
    <div className="grid gap-7">
      <PageHeader
        eyebrow="Level 1"
        title="RAG 文件調查員"
        description="用文件片段回答問題，並把答案連回可查證來源。這一關先用 mock retrieval，保留未來接向量資料庫的 service 邊界。"
        actions={<StatusPill status={completed ? "completed" : "active"}>{completed ? "Completed" : "In Progress"}</StatusPill>}
      />

      <AIGuide message="RAG 的重點不是回答得漂亮，而是回答能被文件支持。這一版先讓互動流程成立，下一版就能把 mock service 換成真正的 embedding 與 vector search。" />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="panel p-5">
          <p className="section-label">Document Set</p>
          <h2 className="mt-2 text-xl font-bold text-ink">文件卡片</h2>
          <div className="mt-5 grid gap-3">
            {ragDocuments.map((document) => (
              <button
                key={document.id}
                type="button"
                onClick={() => setDocumentId(document.id)}
                className={cn(
                  "focus-ring rounded-md border p-4 text-left transition",
                  document.id === documentId
                    ? "border-lab-cyan bg-cyan-50"
                    : "border-line bg-white hover:border-slate-400",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{document.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{document.owner}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {document.type}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {document.sections.map((section) => (
                    <p key={section.sourceId} className="text-sm leading-6 text-slate-600">
                      <span className="font-semibold">{section.sourceId}</span> {section.title}
                    </p>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-5">
          <form className="panel p-5" onSubmit={handleAsk}>
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-ink">
                <FileSearch className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="section-label">Ask with Citation</p>
                <h2 className="mt-2 text-xl font-bold text-ink">{selectedDocument.title}</h2>
              </div>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-700">問題</span>
              <textarea
                className="focus-ring mt-2 min-h-28 w-full rounded-md border border-line px-3 py-3"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
            </label>
            <Button type="submit" icon={Send} className="mt-4 w-full sm:w-auto" disabled={loading}>
              {loading ? "Asking..." : "Ask AI"}
            </Button>
          </form>

          <section className="panel p-5">
            <p className="section-label">AI Answer</p>
            {result ? (
              <div className="mt-4 space-y-5">
                <p className="text-base leading-7 text-slate-700">{result.answer}</p>
                <div>
                  <h3 className="text-sm font-bold text-ink">引用來源</h3>
                  <div className="mt-3 grid gap-3">
                    {result.citations.map((citation) => (
                      <article key={`${citation.sourceId}-${citation.title}`} className="rounded-md border border-line bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-lab-cyan">
                          {citation.sourceId}
                        </p>
                        <h4 className="mt-1 font-semibold text-ink">{citation.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{citation.excerpt}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                回答會顯示在這裡，並附上引用來源與信心等級。
              </p>
            )}
          </section>
        </section>
      </div>

      <TechExplanation explanation={techExplanations.rag} />
    </div>
  );
}
