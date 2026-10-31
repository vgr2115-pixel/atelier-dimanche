import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const STATS = [
  { value: '2015', label: 'Naissance de Dimanche' },
  { value: '2016', label: 'CAP maroquinerie' },
  { value: '1', label: 'Paire de mains' },
];

export default function StorySection() {
  return (
    <section className="border-t border-ink/10 bg-cream py-14 lg:py-28">
      <Container>
        <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="overflow-hidden bg-linen">
              <Image
                src={IMAGES.portrait}
                alt="Un cuir à l’établi de l’atelier Dimanche, à Lyon"
                className="aspect-[4/5] w-full"
                fittingType="fill"
                focalPointY={0.35}
              />
            </div>
            <div className="mt-6 flex flex-col gap-3 lg:absolute lg:-bottom-8 lg:-right-8 lg:mt-0 lg:max-w-[280px] lg:bg-cream lg:p-6 lg:shadow-[0_24px_50px_-40px_rgba(26,26,26,0.6)]">
              <p className="text-[10px] uppercase leading-relaxed tracking-[0.18em] text-forest/70">
                Repères
              </p>
              <p className="font-display text-[15px] leading-snug text-ink/80">
                Initiation au cuir en 2015, CAP maroquinerie en 2016, et depuis, chaque pièce coupée
                et cousue au 23 rue Burdeau.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-forest/80">La marque</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[2.7rem]">
              Des pièces uniques,
              <span className="block italic text-clay">cousues une à une.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[15px] font-light leading-[1.8] text-ink/65">
              <p>
                Dimanche naît au printemps 2015 avec quelques pochettes vendues sur des salons de
                créateurs : une semaine d’initiation au cuir, puis un CAP de maroquinerie passé en
                2016. La marque n’a jamais grossi plus vite que la paire de mains qui la fait vivre :
                chaque modèle est choisi, paré et cousu dans l’atelier.
              </p>
              <p>
                Les cuirs viennent des chutes et sur-stocks de grandes maisons de maroquinerie,
                choisis un à un, à la sensation. Le tannage végétal s’est imposé ensuite, pour sa
                tenue et sa patine. Tout se passe aujourd’hui au 23 rue Burdeau, à Lyon : la
                conception, la fabrication et les ateliers.
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
              Lire la marque
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}