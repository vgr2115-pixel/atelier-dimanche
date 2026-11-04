import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Instagram, Facebook } from 'lucide-react';

const PRIMARY = [
  { label: 'La boutique', to: '/boutique' },
  { label: 'Le sur-mesure', to: '/sur-mesure' },
  { label: 'Le savoir-faire', to: '/savoir-faire' },
  { label: 'Les ateliers', to: '/ateliers' },
  { label: 'Les avis', to: '/avis' },
  { label: 'Contact', to: '/contact' },
];

const SECONDARY = [
  { label: 'Illustrations', to: '/illustrations' },
  { label: 'La marque', to: '/histoire' },
  { label: 'Nouvelles pièces', to: '/nouvelles-pieces' },
  { label: 'Panier', to: '/panier' },
];

export default function MenuPanel({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] bg-cream transition-opacity duration-500 ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le sommaire"
            className="flex items-center gap-2.5 text-ink transition-opacity hover:opacity-60"
          >
            <X className="h-5 w-5" strokeWidth={1.2} />
            <span className="hidden text-[10px] uppercase tracking-[0.24em] lg:inline">Fermer</span>
          </button>
          <p className="eyebrow text-forest/60">Sommaire</p>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] flex-1 gap-12 px-6 pb-16 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-16">
          <nav
            className={`flex flex-col gap-1 transition-all duration-700 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            {PRIMARY.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="group flex items-baseline justify-between border-b border-ink/10 py-4 font-display text-[1.9rem] leading-tight text-ink transition-colors hover:text-clay sm:text-[2.4rem]"
              >
                {item.label}
                <ArrowRight
                  className="h-4 w-4 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={1.3}
                />
              </Link>
            ))}
          </nav>

          <div
            className={`flex flex-col gap-10 transition-all delay-100 duration-700 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            <div>
              <p className="eyebrow text-forest/60">Ailleurs dans l’atelier</p>
              <ul className="mt-5 space-y-3">
                {SECONDARY.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="text-sm font-light text-ink/70 transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-forest/60">L’atelier-boutique</p>
              <address className="mt-5 space-y-1 text-sm font-light not-italic leading-relaxed text-ink/70">
                <p>23 rue Burdeau</p>
                <p>69001 Lyon</p>
              </address>
              <p className="mt-4 text-sm font-light leading-relaxed text-ink/50">
                Mercredi &amp; vendredi : 14h – 19h
                <br />
                Jeudi &amp; samedi : 14h – 18h
              </p>
              <a
                href="mailto:marie@atelier-dimanche.fr"
                className="mt-5 inline-block border-b border-ink/20 pb-1 text-sm font-light text-ink/80 transition-colors hover:border-clay hover:text-clay"
              >
                marie@atelier-dimanche.fr
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/atelier_dimanche/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-ink/50 transition-colors hover:text-ink"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a
                href="https://www.facebook.com/atelierdimanche/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-ink/50 transition-colors hover:text-ink"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}