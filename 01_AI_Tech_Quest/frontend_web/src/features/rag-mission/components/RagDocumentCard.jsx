import { FileText } from "lucide-react";
import { ragDocument } from "../data/ragDocument.js";

export default function RagDocumentCard() {
  return (
    <section className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="section-label">文件</p>
          <h2 className="mt-2 text-2xl font-black text-ink">{ragDocument.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{ragDocument.description}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {ragDocument.chunks.map((chunk) => (
          <article key={chunk.id} className="rounded-xl border border-line bg-slate-50 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-black text-ink">{chunk.heading}</h3>
              <span className="text-xs font-bold text-slate-500">{chunk.id}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{chunk.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
