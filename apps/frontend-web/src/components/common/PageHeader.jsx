export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="section-label">{eyebrow}</p> : null}
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-ink sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
