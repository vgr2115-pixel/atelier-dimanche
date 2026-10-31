import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';
import Container from '@/components/site/Container';
import NewsletterForm from '@/components/site/NewsletterForm';
import { Image } from '@/components/ui/image';
import { IMAGES } from '@/lib/images';

const COLUMNS = [
  {
    title: 'La maison',
    links: [
      { label: 'La marque', to: '/histoire' },
      { label: 'Le savoir-faire', to: '/savoir-faire' },
      { label: 'Ateliers création', to: '/ateliers' },
      { label: 'La boutique', to: '/boutique' },
      { label: 'Avis clients', to: '/avis' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Questions fréquentes', to: '/savoir-faire#faq' },
      { label: 'Entretien & réparation', to: '/savoir-faire' },
      { label: 'Livraison & retours', to: '/conditions-de-vente#livraison' },
      { label: 'Conditions de vente', to: '/conditions-de-vente' },
      { label: 'Mentions légales', to: '/mentions-legales' },
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
              Chaque pièce est unique. Recevez-les avant qu’elles ne partent.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link to="/" className="inline-flex items-center bg-cream px-4 py-3" aria-label="Dimanche — accueil">
              <Image src={IMAGES.logo} alt="Dimanche" className="h-10 w-[68px]" fittingType="fit" />
            </Link>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-cream/60">
              Maroquinerie artisanale et ateliers de fabrication, au cœur de Lyon. Cuirs de grandes
              maisons réemployés, pièces uniques, tout fait main dans l’atelier.
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

        <div className="mt-14 border-t border-cream/15 pt-6">
          <p className="text-[11px] font-light leading-relaxed text-cream/60">
            Dimanche — Marie Bodilis, micro-entreprise · SIRET 795 268 812 00034 · 23 rue Burdeau,
            69001 Lyon · marie@atelier-dimanche.fr
          </p>
          <div className="mt-4 flex flex-col gap-2 text-[11px] uppercase tracking-[0.18em] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Atelier Dimanche — Lyon</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <p>Fait main, à Lyon, une pièce à la fois.</p>
              <Link to="/admin" className="transition-colors hover:text-cream">
                Accès gestion
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}