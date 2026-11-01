import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const MATERIALS = [
  {
    title: 'Chutes et sur-stocks de grandes maisons',
    text: 'Des peaux déjà produites par des maisons de maroquinerie de luxe, trop petites pour une série, assez grandes pour un sac. Réemployées au lieu d’être jetées : c’est l’upcycling, et c’est ce qui rend chaque pièce différente.',
  },
  {
    title: 'Tannage végétal',
    text: 'Un cuir tanné aux extraits végétaux (québracho, mimosa), très résistant, qui se patine et fonce avec les années. À noter : « cuir végétal » ne veut pas dire « sans peau animale », c’est un abus de langage courant.',
  },
  {
    title: 'Point sellier & fil de lin',
    text: 'Couture à deux aiguilles avec un fil de lin ciré. Le point est serré, régulier, et ne se détricote pas comme une couture machine : c’est la garantie d’une pièce qui se répare.',
  },
  {
    title: 'Tranches & marquage à chaud',
    text: 'Tranches teintées puis lustrées une à une, logo marqué au fer. Ces finitions invisibles sur les photos de loin sont celles qui distinguent une pièce finie d’une pièce simplement assemblée.',
  },
];

export default function MaterialsSection() {
  return (
    <section className="border-t border-ink/10 bg-linen/60 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow text-forest/80">Matières &amp; finitions</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
              Ce qu’il faut savoir
              <span className="block italic text-clay">avant d’acheter du cuir.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[14px] font-light leading-[1.8] text-ink/60">
              Le vocabulaire de la maroquinerie est souvent flou, parfois trompeur. Voici les mots
              exacts, expliqués sans marketing.
            </p>

            <dl className="mt-9 divide-y divide-ink/10 border-t border-ink/10">
              {MATERIALS.map((item) => (
                <div key={item.title} className="py-6">
                  <dt className="text-[12px] uppercase tracking-[0.16em] text-ink">{item.title}</dt>
                  <dd className="mt-2 text-[13px] font-light leading-[1.8] text-ink/60">{item.text}</dd>
                </div>
              ))}
            </dl>

            <Link
              to="/savoir-faire#reconnaitre"
              className="mt-4 inline-flex items-center gap-3 border-b border-ink/25 pb-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:text-clay"
            >
              Comment reconnaître un vrai cousu main
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
            </Link>
          </div>

          <figure className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden bg-cream">
              <Image
                src={IMAGES.cuirs}
                alt="Cuirs tannés végétaux choisis un à un à l’atelier"
                className="aspect-[4/5] w-full"
                fittingType="fill"
              />
            </div>
            <figcaption className="mt-3 text-[11px] font-light leading-relaxed text-ink/45">
              Peaux choisies une à une. Deux pièces ne partent jamais du même cuir.
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}