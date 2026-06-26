import { Plus } from "lucide-react";
import { useState } from "react";
import Button from "../../../components/Button.jsx";
import TechBadge from "../../../components/TechBadge.jsx";

const emptyForm = {
  question: "",
  answer: "",
  tags: "",
};

export default function FaqAdminPanel({ faqs, onCreateFaq, saving }) {
  const [form, setForm] = useState(emptyForm);
  const canSubmit = form.question.trim() && form.answer.trim() && form.tags.trim();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    await onCreateFaq(form);
    setForm(emptyForm);
  }

  return (
    <section className="panel p-5">
      <p className="section-label">Business Admin</p>
      <h2 className="mt-2 text-xl font-bold text-ink">店家 FAQ 後台</h2>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">question</span>
          <input
            className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3 text-sm"
            value={form.question}
            onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
            placeholder="例如：有提供插座嗎？"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">answer</span>
          <textarea
            className="focus-ring mt-2 min-h-24 w-full rounded-md border border-line px-3 py-3 text-sm leading-6"
            value={form.answer}
            onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
            placeholder="例如：靠窗座位與工作區提供插座。"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">tags</span>
          <input
            className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3 text-sm"
            value={form.tags}
            onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
            placeholder="插座, 充電, 工作"
          />
        </label>
        <Button icon={Plus} type="submit" disabled={!canSubmit || saving}>
          {saving ? "Saving..." : "Add FAQ"}
        </Button>
      </form>

      <div className="mt-6 grid gap-3">
        {faqs.map((faq) => (
          <article key={faq.id} className="rounded-md border border-line bg-slate-50 p-4">
            <h3 className="font-bold text-ink">{faq.question}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {faq.tags.map((tag) => (
                <TechBadge key={tag}>{tag}</TechBadge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
