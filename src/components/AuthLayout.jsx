import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

const LOGO = 'https://media.base44.com/images/public/6ae661bd4abd749615dd969a/4544a06cb_logo.png';

export const authInputClass =
  'h-12 rounded-none border-ink/20 bg-cream pl-10 text-[14px] text-ink placeholder:text-ink/30 focus-visible:border-ink focus-visible:ring-forest';

export const authLabelClass =
  'text-[10px] uppercase tracking-[0.18em] text-ink/50';

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <header className="relative border-b border-ink/10">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-16">
          <Link to="/" className="flex items-center gap-3" aria-label="Atelier Dimanche, retour à l’accueil">
            <Image
              src={LOGO}
              alt="Atelier Dimanche"
              fittingType="fit"
              className="h-10 w-[120px]"
            />
          </Link>
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.2em] text-ink/45 transition-colors hover:text-ink"
          >
            Retour au site
          </Link>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:gap-24 lg:px-16 lg:py-20">
        <div className="lg:w-[46%]">
          <p className="eyebrow text-forest/80">Espace privé</p>
          <h1 className="mt-4 max-w-[22ch] font-display text-[2rem] leading-[1.1] tracking-[-0.01em] sm:text-[2.6rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-[30rem] text-[14px] font-light leading-[1.85] text-ink/60">
              {subtitle}
            </p>
          )}
          <div className="mt-8 hidden h-px w-24 bg-ink/15 lg:block" />
        </div>

        <div className="w-full max-w-[440px]">
          <div className="border border-ink/12 bg-linen/40 p-6 sm:p-9">{children}</div>
          {footer && (
            <p className="mt-6 text-center text-[12px] font-light leading-relaxed text-ink/55">
              {footer}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}