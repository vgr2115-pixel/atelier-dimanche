import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import Cta from '@/components/site/Cta';
import { IMAGES } from '@/lib/images';

const TIMELINE = [
  {
    year: '2015',
    title: 'La reconversion',
    text: 'Graphiste, Marie Bodilis troque l’écran contre l’établi et se forme au métier de maroquinier. Dimanche naît de ce basculement.',
  },
  {
    year: '2018',
    title: 'Les chutes de grandes maisons',
    text: 'Premières commandes de chutes auprès de maisons de maroquinerie de luxe : des cuirs nobles, déjà produits, qui n’auraient pas été utilisés.',
  },
  {
    year: '2022',
    title: 'Les ateliers',
    text: 'Ouverture des ateliers de fabrication : transmettre le geste, faire repartir chacun avec une pièce faite de ses mains.',
  },
  {
    year: '2026',
    title: 'L’atelier-boutique de Lyon',
    text: 'Un lieu au 23 rue Burdeau, à Lyon 1ᵉʳ : l’atelier, la boutique et les ateliers réunis dans la même pièce.',
  },
];

const VALUES = [
  { title: 'Upcycling', text: 'Chutes de cuir de grandes maisons, sauvées du carton et transformées en pièces uniques.' },
  { title: 'Tannage végétal', text: 'Pour les cuirs neufs, des tanneries européennes utilisant des extraits végétaux, sans chrome.' },
  { title: 'Fait main', text: 'Pas de machine de série : couture sellier au fil de lin, tranches teintées et lustrées une à une.' },
  { title: 'Sans intermédiaire', text: 'Marie dessine, fabrique et vend elle-même. Le prix paie le cuir, les heures et le geste.' },
];

export default function Story() {
  return (
    <div className="bg-cream">
      <Container className="pb-14 pt-14 lg:pt-20">
        <p className="eyebrow text-forest/80">L’histoire</p>
        <h1 className="mt-4 max-w-4xl font-display text-[2.4rem] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[3.6rem]">
          Dimanche, c’est le jour où l’on prend le temps
          <span className="block italic text-clay">de faire les choses soi-même.</span>
        </h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <p className="max-w-2xl text-[15px] font-light leading-[1.85] text-ink/65">
            Une marque de maroquinerie artisanale et éco-responsable, pensée, cousue et vendue par une
            seule paire de mains. Des cuirs qui existaient déjà, un geste appris et répété, des pièces
            que l’on garde — et que l’on peut venir fabriquer soi-même.
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink/40">
            Marie Bodilis · fondatrice &amp; maroquinière
          </p>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="overflow-hidden bg-linen sm:col-span-2">
            <Image
              src={IMAGES.portrait}
              alt="L’atelier de Marie : étagères de fils, rouleaux de cuir et enseigne Dimanche"
              className="aspect-[16/10] w-full"
              fittingType="fill"
              focalPointY={0.35}
            />
          </div>
          <div className="overflow-hidden bg-linen">
            <Image
              src={IMAGES.cuirs}
              alt="Chutes de cuir de différentes teintes, outils de maroquinerie et fil de lin"
              className="aspect-[4/5] h-full w-full sm:aspect-auto"
              fittingType="fill"
            />
          </div>
        </div>
      </Container>

      <section className="border-y border-ink/10 bg-linen/50 py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-forest/80">Le parcours</p>
              <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-ink sm:text-[2.5rem]">
                Dix ans de gestes
              </h2>
              <p className="mt-5 max-w-sm text-[14px] font-light leading-[1.8] text-ink/60">
                Une marque qui n’a jamais grossi plus vite que la paire de mains qui la fait vivre.
              </p>
            </div>
            <ol className="divide-y divide-ink/10 border-t border-ink/10">
              {TIMELINE.map((entry) => (
                <li key={entry.year} className="grid gap-3 py-6 sm:grid-cols-[100px_1fr] sm:gap-8">
                  <p className="font-display text-xl text-clay">{entry.year}</p>
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.16em] text-ink">{entry.title}</p>
                    <p className="mt-2 text-[14px] font-light leading-[1.8] text-ink/60">{entry.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="overflow-hidden bg-linen">
              <Image
                src={IMAGES.boutique}
                alt="L’atelier-boutique Dimanche, rue Burdeau à Lyon"
                className="aspect-[4/3] w-full"
                fittingType="fill"
              />
            </div>
            <div>
              <p className="eyebrow text-forest/80">La matière</p>
              <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-ink sm:text-[2.5rem]">
                Un cuir noble n’a pas besoin d’être neuf.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-[1.85] text-ink/65">
                Les plus belles peaux sont souvent celles que les grandes maisons n’utiliseront pas :
                une chute trop petite pour un sac de série, assez grande pour un cabas, une ceinture ou
                une pochette. Chaque pièce raconte la maison d’où vient son cuir, sans jamais la nommer.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {VALUES.map((value) => (
                  <div key={value.title} className="border-t border-ink/15 pt-4">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-ink">{value.title}</p>
                    <p className="mt-2 text-[13px] font-light leading-relaxed text-ink/55">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-cream lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-sand/80">La suite</p>
              <h2 className="mt-4 font-display text-[1.9rem] leading-tight text-cream sm:text-[2.4rem]">
                Découvrez les pièces disponibles,
                <span className="block italic text-sand">ou venez les faire vous-même.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Cta to="/boutique" variant="sand">
                Voir la collection
              </Cta>
              <Link
                to="/ateliers"
                className="inline-flex items-center justify-center border border-cream/30 px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                Les ateliers
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}