export default function AdminField({ label, hint, className = '', children }) {
  return (
    <div className={className}>
      <span className="block text-[10px] uppercase tracking-[0.18em] text-ink/50">{label}</span>
      <div className="mt-2">{children}</div>
      {hint && (
        <p className="mt-1.5 text-[11px] font-light leading-relaxed text-ink/40">{hint}</p>
      )}
    </div>
  );
}