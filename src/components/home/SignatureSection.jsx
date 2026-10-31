import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const STATS = [
  { value: '1', label: 'paire de mains' },
  { value: '23', label: 'rue Burdeau, Lyon' },
  { value: '0', label: 'sous-traitant' },
];

export default function SignatureSection() {
  return (
    <section className="border-t border-ink/10 bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <figure className="order-2 lg:order-1">
            <div className="relative overflow-hidden bg-ink">
              <video
                controls
                playsInline
                preload="metadata"
                aria-label="Vidéo tournée dans l’atelier Dimanche, à Lyon"
                poster={IMAGES.atelierLarge}
                className="aspect-video w-full object-cover"
              >
                <source src={IMAGES.video} type="video/mp4" />
                Votre navigateur ne permet pas la lecture de cette vidéo.
              </video>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="text-[11px] font-light leading-relaxed text-ink/45">
                L’atelier, 23 rue Burdeau — images tournées sur place.
              </span>
              <Image src={IMAGES.logo} alt="Dimanche" className="h-7 w-[92px] shrink-0" fittingType="fit" />
            </figcaption>
          </figure>

          <div className="order-1 lg:order-2">
            <p className="eyebrow text-forest/80">La signature</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[2.7rem]">
              Une paire de mains,
              <span className="block italic text-clay">un seul atelier.</span>
            </h2>
            <p className="mt-6 max-w-[30rem] text-[15px] font-light leading-[1.8] text-ink/65">
              Pas d’usine, pas de sous-traitance. La peau est choisie à la sensation, coupée, cousue
              et finie au 23 rue Burdeau. C’est ce qui rend chaque pièce différente, et ce qui la
              rend réparable.
            </p>

            <dl className="mt-9 grid grid-cols-3 gap-6 border-y border-ink/10 py-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-[26px] leading-none text-clay">{stat.value}</dt>
                  <dd className="mt-2 text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink/45">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              to="/savoir-faire"
              className="mt-8 inline-flex items-center gap-3 border-b border-ink/25 pb-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:text-clay"
            >
              Voir le geste en détail
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}