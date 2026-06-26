import SourceCitationCard from "./SourceCitationCard.jsx";

export default function RagSourcesPanel({ result }) {
  return (
    <section className="panel p-5">
      <p className="section-label">Source Citation</p>
      <h2 className="mt-2 text-xl font-bold text-ink">引用來源區</h2>
      {result ? (
        <div className="mt-5 grid gap-3">
          {result.sources.map((source) => (
            <SourceCitationCard key={source.id} source={source} />
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          成功提問後會顯示 Source 1 / Source 2 與引用片段。點擊來源可以展開原文。
        </p>
      )}
    </section>
  );
}
