import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const SHOTS = [
  { image: IMAGES.geste, alt: 'Parage d’une ceinture à l’établi', caption: 'Le parage, à la main' },
  { image: IMAGES.couture, alt: 'Couture au point sellier sur un cuir tanné végétal', caption: 'Le point sellier' },
  { image: IMAGES.atelierFenetre, alt: 'L’atelier-boutique rue Burdeau, à Lyon', caption: 'Rue Burdeau, Lyon 1ᵉʳ' },
];

export default function SocialSection() {
  return (
    <section className="border-t border-ink/10 bg-linen/50 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-forest/80">L’atelier au quotidien</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
              Les coulisses,
              <span className="italic text-clay"> au fil des jours.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href="https://www.instagram.com/atelier_dimanche/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:text-clay"
            >
              <Instagram className="h-3.5 w-3.5" strokeWidth={1.4} /> @atelier_dimanche
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
            </a>
            <a
              href="https://www.facebook.com/atelierdimanche/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 text-[11px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-ink hover:text-clay"
            >
              <Facebook className="h-3.5 w-3.5" strokeWidth={1.4} /> Facebook
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-3 sm:gap-x-8">
          {SHOTS.map((shot) => (
            <figure key={shot.caption}>
              <div className="overflow-hidden bg-cream">
                <Image
                  src={shot.image}
                  alt={shot.alt}
                  className="aspect-[4/5] w-full transition-transform duration-700 hover:scale-[1.03]"
                  fittingType="fill"
                />
              </div>
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.16em] text-ink/45">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-[13px] font-light leading-relaxed text-ink/55">
          Les nouvelles pièces, les gestes de l’atelier et les dates de création sortent d’abord sur
          Instagram — souvent avant le site.
        </p>
      </Container>
    </section>
  );
}