import { Plus } from "lucide-react";
import { useState } from "react";
import Button from "../../components/common/Button.jsx";

const initialForm = {
  question: "",
  answer: "",
  tags: "",
};

export default function FaqManager({ faqs, onAddFaq }) {
  const [form, setForm] = useState(initialForm);

  const canSubmit = form.question.trim() && form.answer.trim() && form.tags.trim();

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    onAddFaq(form);
    setForm(initialForm);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="panel p-5" onSubmit={handleSubmit}>
        <p className="section-label">FAQ Admin</p>
        <h2 className="mt-2 text-xl font-bold text-ink">新增 FAQ</h2>
        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700">問題</span>
          <input
            className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3"
            value={form.question}
            onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
            placeholder="例如：有提供插座嗎？"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-semibold text-slate-700">回答</span>
          <textarea
            className="focus-ring mt-2 min-h-28 w-full rounded-md border border-line px-3 py-3"
            value={form.answer}
            onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
            placeholder="例如：有，靠窗座位與工作區提供插座。"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-semibold text-slate-700">關鍵字</span>
          <input
            className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3"
            value={form.tags}
            onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
            placeholder="插座, 工作, 座位"
          />
        </label>
        <Button type="submit" icon={Plus} className="mt-5 w-full" disabled={!canSubmit}>
          Add FAQ
        </Button>
      </form>

      <div className="panel p-5">
        <p className="section-label">Knowledge Base</p>
        <h2 className="mt-2 text-xl font-bold text-ink">目前 FAQ</h2>
        <div className="mt-5 space-y-3">
          {faqs.map((faq) => (
            <article key={faq.id} className="rounded-md border border-line bg-slate-50 p-4">
              <h3 className="font-semibold text-ink">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {faq.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
