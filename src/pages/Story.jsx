import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import Cta from '@/components/site/Cta';
import StoryHero from '@/components/marque/StoryHero';
import StoryTimeline from '@/components/marque/StoryTimeline';
import Commitments from '@/components/marque/Commitments';
import { IMAGES } from '@/lib/images';
import useDocumentTitle from '@/hooks/useDocumentTitle';

export default function Story() {
  useDocumentTitle('La marque — Marie Bodilis, Atelier Dimanche à Lyon');

  return (
    <div className="bg-cream">
      <Container className="pb-12 pt-14 lg:pt-20">
        <StoryHero />
      </Container>

      <Container className="pb-14">
        <div className="grid gap-4 sm:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="overflow-hidden bg-linen">
            <Image
              src={IMAGES.etabli}
              alt="L’établi de l’atelier Dimanche à Lyon, entre cuirs et outils"
              className="aspect-[4/3] h-full w-full"
              fittingType="fill"
            />
          </div>
          <div className="overflow-hidden bg-linen">
            <Image
              src={IMAGES.atelierFenetre}
              alt="Le mur de l’atelier, rouleaux de cuir et outils de maroquinerie"
              className="aspect-[4/5] h-full w-full sm:aspect-auto"
              fittingType="fill"
            />
          </div>
          <div className="overflow-hidden bg-linen">
            <Image
              src={IMAGES.cuirs}
              alt="Cuirs tannés végétaux empilés à l’atelier"
              className="aspect-[4/5] h-full w-full sm:aspect-auto"
              fittingType="fill"
            />
          </div>
        </div>
      </Container>

      <Container>
        <StoryTimeline />
        <Commitments />

        <section className="border-t border-ink/10 py-12">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="eyebrow text-forest/80">Ils en ont parlé</p>
              <p className="mt-3 max-w-2xl font-display text-[17px] leading-[1.6] text-ink/80">
                « Marie, artisan maroquinière et créatrice de Dimanche » — un reportage d’Étonnantes
                (2019), textes de Solenn Cosotti, photographies de Rémy Lidereau.
              </p>
            </div>
            <a
              href="https://etonnantes.com/2019/05/14/marie-artisan-maroquiniere-et-creatrice-de-dimanche/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-ink/20 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Lire le reportage
            </a>
          </div>
        </section>
      </Container>

      <section className="bg-ink py-16 text-cream lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-sand/80">La suite</p>
              <h2 className="mt-4 font-display text-[1.9rem] leading-tight text-cream sm:text-[2.4rem]">
                Voir les pièces disponibles,
                <span className="block italic text-sand">ou venir les faire vous-même.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Cta to="/boutique" variant="sand">
                Voir la boutique
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