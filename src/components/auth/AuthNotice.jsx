import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthNotice({ children, tone = 'error' }) {
  if (!children) return null;
  const isSuccess = tone === 'success';
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      className={`mb-6 flex gap-3 border-l-2 py-3 pl-4 pr-3 text-[12.5px] font-light leading-relaxed ${
        isSuccess ? 'border-forest bg-forest/5 text-forest' : 'border-clay bg-clay/5 text-clay'
      }`}
    >
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}