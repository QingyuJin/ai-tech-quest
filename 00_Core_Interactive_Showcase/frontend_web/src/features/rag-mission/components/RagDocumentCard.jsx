import { FileText } from "lucide-react";
import TechBadge from "../../../components/TechBadge.jsx";

export default function RagDocumentCard({ document }) {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-cyan-50 text-signal-cyan">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">Document Card</p>
          <h2 className="mt-2 text-xl font-bold text-ink">{document.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{document.summary}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {document.chunks.map((chunk) => (
          <article key={chunk.id} className="rounded-md border border-line bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold text-ink">{chunk.heading}</h3>
              <TechBadge>{chunk.sourceId}</TechBadge>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{chunk.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
