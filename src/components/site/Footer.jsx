import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';
import Container from '@/components/site/Container';
import NewsletterForm from '@/components/site/NewsletterForm';

const COLUMNS = [
  {
    title: 'La maison',
    links: [
      { label: 'L’histoire de Dimanche', to: '/histoire' },
      { label: 'Les ateliers', to: '/ateliers' },
      { label: 'La boutique', to: '/boutique' },
      { label: 'Nous écrire', to: '/contact' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'Conditions de vente', to: '/conditions-de-vente' },
      { label: 'Livraison & retours', to: '/conditions-de-vente#livraison' },
      { label: 'Prendre rendez-vous', to: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80">
      <Container className="py-16 lg:py-20">
        <div className="mb-14 flex flex-col gap-6 border-b border-cream/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-cream/40">Les nouvelles pièces</p>
            <p className="mt-3 max-w-md font-display text-[22px] leading-snug text-cream">
              Une pièce unique par semaine, parfois moins. Recevez-les avant tout le monde.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link to="/" className="flex flex-col leading-[0.95]">
              <span className="font-display text-[22px] tracking-[0.08em] text-cream">ATELIER</span>
              <span className="font-display text-[22px] italic tracking-[0.08em] text-sand">Dimanche</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-cream/60">
              Maroquinerie artisanale et ateliers de fabrication, au cœur de Lyon. Cuirs upcyclés de
              grandes maisons, pièces uniques, fait main.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://www.instagram.com/atelier_dimanche/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-cream/60 transition-colors hover:text-sand"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a
                href="https://www.facebook.com/atelierdimanche/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-cream/60 transition-colors hover:text-sand"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a
                href="mailto:marie@atelier-dimanche.fr"
                aria-label="Email"
                className="text-cream/60 transition-colors hover:text-sand"
              >
                <Mail className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="eyebrow text-cream/40">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm font-light text-cream/70 transition-colors hover:text-cream">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow text-cream/40">L’atelier-boutique</p>
            <address className="mt-5 space-y-1 text-sm font-light not-italic leading-relaxed text-cream/70">
              <p>23 rue Burdeau</p>
              <p>69001 Lyon</p>
            </address>
            <p className="mt-4 text-sm font-light leading-relaxed text-cream/50">
              Mercredi &amp; vendredi : 14h – 19h
              <br />
              Jeudi &amp; samedi : 14h – 18h
            </p>
            <a
              href="mailto:marie@atelier-dimanche.fr"
              className="mt-5 inline-block border-b border-cream/25 pb-1 text-sm font-light text-cream/80 transition-colors hover:border-sand hover:text-sand"
            >
              marie@atelier-dimanche.fr
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-6 text-[11px] uppercase tracking-[0.2em] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Atelier Dimanche — Lyon</p>
          <p>Fait main, à Lyon, une pièce à la fois.</p>
        </div>
      </Container>
    </footer>
  );
}