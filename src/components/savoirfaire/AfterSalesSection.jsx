import { Link } from 'react-router-dom';
import { Wrench, Droplets, RotateCcw } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { Image } from '@/components/ui/image';

const SERVICES = [
  {
    icon: Wrench,
    title: 'Réparation',
    text: 'Si une pièce métallique cède dans un usage normal, je la remplace sans frais. Le reste se répare à l’atelier, sur rendez-vous, des années après l’achat.',
  },
  {
    icon: Droplets,
    title: 'Entretien',
    text: 'Nourrir le cuir une à deux fois par an avec une crème incolore. Le tannage végétal se patine : il fonce, se lisse et devient brillant. C’est normal, et c’est beau.',
  },
  {
    icon: RotateCcw,
    title: 'Retours',
    text: 'Quatorze jours après réception pour changer d’avis, sur une pièce non portée : échange ou avoir, hors frais de port. Les pièces personnalisées ne sont pas reprises.',
  },
];

export default function AfterSalesSection() {
  return (
    <section className="border-t border-ink/10 py-14 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow text-forest/80">Après l’achat</p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[1.15] text-ink sm:text-[2.4rem]">
            Une pièce se garde
            <span className="block italic text-clay">parce qu’elle se répare.</span>
          </h2>

          <div className="mt-9 grid gap-8 sm:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-ink/15 pt-4">
                <Icon className="h-4 w-4 text-forest" strokeWidth={1.3} />
                <h3 className="mt-3 text-[12px] uppercase tracking-[0.16em] text-ink">{title}</h3>
                <p className="mt-2 text-[13px] font-light leading-[1.8] text-ink/60">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="mailto:marie@atelier-dimanche.fr?subject=R%C3%A9paration%20d%27une%20pi%C3%A8ce"
              className="inline-flex items-center justify-center bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest"
            >
              Demander une réparation
            </a>
            <Link
              to="/conditions-de-vente#retours"
              className="border-b border-ink/25 pb-1 text-[11px] uppercase tracking-[0.18em] text-ink/60 transition-colors hover:border-ink hover:text-ink"
            >
              Conditions de vente
            </Link>
          </div>
        </div>

        <figure className="overflow-hidden bg-cream">
          <Image
            src={IMAGES.geste}
            alt="Cuirs choisis sur l’établi de l’atelier Dimanche"
            className="aspect-[4/5] w-full"
            fittingType="fill"
          />
        </figure>
      </div>
    </section>
  );
}