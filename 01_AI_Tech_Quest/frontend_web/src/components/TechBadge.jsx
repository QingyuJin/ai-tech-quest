export default function TechBadge({ children }) {
  return (
    <span className="inline-flex min-h-7 items-center rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-slate-600">
      {children}
    </span>
  );
}
