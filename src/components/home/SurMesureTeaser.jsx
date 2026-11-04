import { Link } from 'react-router-dom';
import Container from '@/components/site/Container';
import { Image } from '@/components/ui/image';

const media = (file) => `https://static.wixstatic.com/media/${file}`;

const CARDS = [
  {
    to: '/sur-mesure',
    eyebrow: 'Le sur-mesure',
    title: 'Un objet auquel personne n’avait pensé',
    text: 'Un étui pour vos outils, un cartable, une pièce à réparer. L’atelier dessine et fabrique la pièce qui manque.',
    cta: 'Découvrir le sur-mesure',
    image: media('dc3d95_666862a0c08d464f99e2a1104a88edb3~mv2_d_4224_5632_s_4_2.jpg'),
  },
  {
    to: '/illustrations',
    eyebrow: 'L’illustration',
    title: 'Avant le cuir, il y avait le papier',
    text: 'Collages originaux et cartes postales : photos de famille des années 1950, papiers anciens et plantes découpées.',
    cta: 'Voir les illustrations',
    image: media('dc3d95_4a473b537bb2496d9b9cf40cc1e14b7a~mv2.jpg'),
  },
];

export default function SurMesureTeaser() {
  return (
    <section className="bg-linen/60">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {CARDS.map((card) => (
            <Link key={card.to} to={card.to} className="group block">
              <div className="overflow-hidden bg-cream">
                <Image
                  src={card.image}
                  alt={card.title}
                  className="aspect-[16/10] w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  fittingType="fill"
                />
              </div>
              <p className="eyebrow mt-6 text-forest/80">{card.eyebrow}</p>
              <h2 className="mt-3 max-w-sm font-display text-[1.4rem] leading-tight text-ink sm:text-[1.7rem]">
                {card.title}
              </h2>
              <p className="mt-3 max-w-md text-[13px] font-light leading-[1.8] text-ink/60">
                {card.text}
              </p>
              <span className="mt-5 inline-block border-b border-ink/25 pb-1 text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-colors group-hover:border-ink group-hover:text-ink">
                {card.cta}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}