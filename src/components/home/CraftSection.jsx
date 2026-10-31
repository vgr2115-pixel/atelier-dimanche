import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const STEPS = [
  {
    number: '01',
    title: 'Choisir la peau',
    image: IMAGES.cuirs,
    alt: 'Chutes de cuir empilées sur l’établi de l’atelier Dimanche',
    text: 'Je choisis chaque peau à la sensation, parmi les chutes et sur-stocks de grandes maisons de maroquinerie. Aucune ne ressemble à une autre.',
  },
  {
    number: '02',
    title: 'Tracer, découper, parer',
    image: IMAGES.croquis,
    alt: 'Croquis de patronage posés sur le plan de travail',
    text: 'Le patron est tracé à la main, la pièce découpée, puis parée pour que les épaisseurs se répondent une fois cousues.',
  },
  {
    number: '03',
    title: 'Coudre au point sellier',
    image: IMAGES.couture,
    alt: 'Couture au point sellier au fil de lin ciré sur une pièce en cuir',
    text: 'Deux aiguilles, un fil de lin ciré, un point régulier. C’est le point des selliers : celui qui tient, et qui ne se détricote pas.',
  },
  {
    number: '04',
    title: 'Marquer et finir',
    image: IMAGES.portraitEtabli,
    alt: 'Marie Bodilis à l’établi, marquage et finitions d’une pièce',
    text: 'Logo marqué à chaud au fer, tranches teintées et lustrées une à une, puis contrôle pièce en main. C’est là que se joue la différence.',
  },
];

export default function CraftSection() {
  return (
    <section className="border-t border-ink/10 bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-forest/80">Le savoir-faire</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
              Le geste, sans mise
              <span className="block italic text-clay">en scène.</span>
            </h2>
            <p className="mt-6 max-w-md text-[14px] font-light leading-[1.8] text-ink/60">
              Montrer l’atelier, les outils, les étapes : c’est la seule façon de prouver qu’une pièce
              est réellement faite à la main. Voilà comment naît une pièce Dimanche, du premier coup
              d’œil sur une peau jusqu’au dernier coup de chiffon.
            </p>
            <Link
              to="/savoir-faire"
              className="mt-7 inline-flex items-center gap-3 border-b border-ink/25 pb-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:text-clay"
            >
              Le savoir-faire en détail
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
            </Link>
          </div>

          <figure>
            <div className="relative overflow-hidden bg-ink">
              <video
                controls
                playsInline
                preload="metadata"
                poster={IMAGES.atelier}
                className="aspect-video w-full object-cover"
              >
                <source src={IMAGES.video} type="video/mp4" />
                Votre navigateur ne permet pas la lecture de cette vidéo.
              </video>
            </div>
            <figcaption className="mt-3 text-[11px] font-light leading-relaxed text-ink/45">
              À l’atelier, Lyon 1ᵉʳ — vidéo tournée sur place par Fierce Productions.
            </figcaption>
          </figure>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.number}>
              <div className="overflow-hidden bg-linen">
                <Image src={step.image} alt={step.alt} className="aspect-[4/3] w-full" fittingType="fill" />
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-clay">{step.number}</p>
              <h3 className="mt-2 font-display text-[19px] leading-tight text-ink">{step.title}</h3>
              <p className="mt-2 text-[13px] font-light leading-[1.75] text-ink/55">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}