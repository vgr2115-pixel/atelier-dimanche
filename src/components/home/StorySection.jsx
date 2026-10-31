import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/catalog';

const STATS = [
  { value: '2015', label: 'Reconversion de Marie' },
  { value: '100 %', label: 'Fait main à Lyon' },
  { value: '1', label: 'Pièce, 1 seule fois' },
];

export default function StorySection() {
  return (
    <section className="border-t border-ink/10 bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="overflow-hidden bg-linen">
              <Image
                src={IMAGES.portrait}
                alt="Marie, fondatrice et maroquinière de l’Atelier Dimanche, dans son atelier lyonnais"
                className="aspect-[4/5] w-full"
                fittingType="fill"
                focalPointY={0.4}
              />
            </div>
            <div className="mt-6 flex items-center gap-4 lg:absolute lg:-bottom-8 lg:-right-8 lg:mt-0 lg:max-w-[240px] lg:flex-col lg:items-start lg:bg-cream lg:p-6 lg:shadow-[0_24px_50px_-40px_rgba(26,26,26,0.6)]">
              <p className="font-display text-[15px] italic text-clay">« Le cuir d’une grande maison, sauvé d’un carton, devient un cabas que l’on garde vingt ans. »</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40">Marie Bodilis</p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-forest/80">L’histoire</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[2.7rem]">
              De graphiste à maroquinière,
              <span className="block italic text-clay">en 2015.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[15px] font-light leading-[1.8] text-ink/65">
              <p>
                Dimanche naît d’une reconversion : après des années derrière un écran, Marie choisit
                le cuir, les outils et le geste. Depuis, elle dessine, découpe, coud et vend
                elle-même chaque pièce — sans intermédiaire.
              </p>
              <p>
                Les cuirs viennent de chutes de grandes maisons de maroquinerie, dans une démarche
                d’upcycling, ou de tanneries végétales respectueuses de l’environnement. Des
                matières nobles, déjà là, qu’il ne reste plus qu’à révéler.
              </p>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-6 border-t border-ink/10 pt-7">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-ink">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/histoire"
              className="mt-9 inline-flex items-center gap-3 border-b border-ink/25 pb-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:text-clay"
            >
              Lire l’histoire complète
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}