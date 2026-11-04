import { Link } from 'react-router-dom';
import Container from '@/components/site/Container';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import ExampleGrid from '@/components/surmesure/ExampleGrid';

const STEPS = [
  ['L’envie', 'Un objet à protéger, une idée de forme, un dessin d’enfant, une pièce à réparer.'],
  ['Les cuirs', 'Choix ensemble des peaux les mieux adaptées, dans les chutes de l’atelier.'],
  ['Le marquage', 'Initiales, prénom ou date, frappés à chaud dans le cuir.'],
  ['La fabrication', 'Patron, coupe, couture, finitions. Une pièce faite pour une seule personne.'],
];

const MAILTO =
  'mailto:marie@atelier-dimanche.fr?subject=commande%20sur-mesure';

export default function SurMesure() {
  useDocumentTitle('Le sur-mesure — Atelier Dimanche, maroquinerie à Lyon');

  return (
    <div className="bg-cream">
      <Container className="pb-14 pt-14 lg:pt-20">
        <p className="eyebrow text-forest/80">Le sur-mesure</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <h1 className="font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            Donnez vie
            <span className="block italic text-clay">à vos idées.</span>
          </h1>
          <p className="max-w-md text-[15px] font-light leading-[1.8] text-ink/60 lg:pb-2">
            Vous ne trouvez pas ce que vous cherchez dans l’e-shop&nbsp;? L’atelier répond aux projets
            les plus divers. Le cuir est un merveilleux allié pour protéger et magnifier vos objets
            les plus précieux.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-y border-ink/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[14px] font-light leading-[1.8] text-ink/70">
            Écrivez à l’atelier pour expliquer votre envie&nbsp;: les besoins sont définis ensemble,
            puis les cuirs les mieux adaptés sont choisis. Le marquage d’initiales ou du prénom
            s’ajoute à la commande.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={MAILTO}
              className="inline-flex items-center bg-ink px-6 py-3.5 text-[10px] uppercase tracking-[0.22em] text-cream transition-colors hover:bg-forest"
            >
              Écrire à l’atelier
            </a>
            <Link
              to="/boutique"
              className="inline-flex items-center border border-ink/20 px-6 py-3.5 text-[10px] uppercase tracking-[0.22em] text-ink transition-colors hover:border-ink"
            >
              Voir les pièces disponibles
            </Link>
          </div>
        </div>
      </Container>

      <Container className="pb-16 lg:pb-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-display text-[1.6rem] leading-tight text-ink sm:text-[2rem]">
            Fabriqué pour une personne
          </h2>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">
            Exemples de commandes passées
          </p>
        </div>
        <div className="mt-8">
          <ExampleGrid />
        </div>
      </Container>

      <Container className="border-t border-ink/10 pb-20 pt-14 lg:pb-24">
        <p className="eyebrow text-forest/80">Comment ça se passe</p>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([title, text], index) => (
            <li key={title} className="border-t border-ink/15 pt-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-clay">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-[18px] text-ink">{title}</h3>
              <p className="mt-2 text-[13px] font-light leading-[1.75] text-ink/60">{text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 bg-linen px-6 py-10 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="font-display text-[22px] leading-snug text-ink">
              Un projet en tête&nbsp;? Parlons-en.
            </p>
            <p className="mt-2 text-[13px] font-light text-ink/60">
              Délai indicatif de deux à quatre semaines selon la pièce.
            </p>
          </div>
          <a
            href={MAILTO}
            className="inline-flex items-center bg-ink px-6 py-3.5 text-[10px] uppercase tracking-[0.22em] text-cream transition-colors hover:bg-forest"
          >
            Demander un devis
          </a>
        </div>
      </Container>
    </div>
  );
}