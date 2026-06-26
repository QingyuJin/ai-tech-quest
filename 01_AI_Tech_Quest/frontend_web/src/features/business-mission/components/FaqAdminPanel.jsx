import { PlusCircle } from "lucide-react";
import { useState } from "react";
import Button from "../../../components/Button.jsx";
import TechBadge from "../../../components/TechBadge.jsx";

const emptyForm = {
  question: "",
  answer: "",
  tags: "",
};

export default function FaqAdminPanel({ faqs, onAddFaq, saving, error }) {
  const [form, setForm] = useState(emptyForm);

  async function handleSubmit(event) {
    event.preventDefault();
    const created = await onAddFaq(form);

    if (created) {
      setForm(emptyForm);
    }
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label">店家後台</p>
          <h2 className="mt-2 text-xl font-black text-ink">FAQ 知識庫</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            先整理可重複使用的店家回答，未來可以接 API、資料庫或 LINE Bot。
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-right">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">FAQ 數量</p>
          <p className="text-2xl font-black text-ink">{faqs.length}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3 rounded-xl border border-line bg-slate-50 p-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">問題（question）</span>
          <input
            value={form.question}
            onChange={(event) => updateField("question", event.target.value)}
            placeholder="例如：可以用 LINE 預約嗎？"
            className="focus-ring rounded-lg border border-line bg-white px-4 py-3 text-sm"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">答案（answer）</span>
          <textarea
            value={form.answer}
            onChange={(event) => updateField("answer", event.target.value)}
            placeholder="例如：可以，顧客可以透過 LINE 預約座位。"
            className="focus-ring min-h-24 resize-none rounded-lg border border-line bg-white px-4 py-3 text-sm leading-6"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">標籤（tags）</span>
          <input
            value={form.tags}
            onChange={(event) => updateField("tags", event.target.value)}
            placeholder="預約, LINE, 訂位"
            className="focus-ring rounded-lg border border-line bg-white px-4 py-3 text-sm"
          />
        </label>
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}
        <Button type="submit" icon={PlusCircle} disabled={saving}>
          {saving ? "儲存中..." : "新增 FAQ"}
        </Button>
      </form>

      <div className="mt-5 grid gap-3">
        {faqs.map((faq) => (
          <article key={faq.id} className="rounded-xl border border-line bg-white p-4">
            <h3 className="text-sm font-black text-ink">{faq.question}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {faq.tags.map((tag) => (
                <TechBadge key={`${faq.id}-${tag}`}>{tag}</TechBadge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
