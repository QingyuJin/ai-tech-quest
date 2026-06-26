import SourceCitationCard from "./SourceCitationCard.jsx";

export default function RagSourcesPanel({ sources }) {
  return (
    <section className="panel p-5">
      <p className="section-label">來源引用</p>
      <h2 className="mt-2 text-xl font-black text-ink">取回的文件來源</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        展開每個來源，可以檢查這次回答使用了哪些文件片段。
      </p>
      <div className="mt-5 grid gap-3">
        {sources?.length ? (
          sources.map((source) => <SourceCitationCard key={source.sourceId} source={source} />)
        ) : (
          <div className="rounded-xl border border-dashed border-line bg-slate-50 p-5 text-sm leading-6 text-slate-500">
            送出第一個問題後，引用來源會顯示在這裡。
          </div>
        )}
      </div>
    </section>
  );
}
