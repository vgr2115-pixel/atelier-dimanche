import { Link } from 'react-router-dom';
import Container from '@/components/site/Container';

const REVIEWS = [
  {
    name: 'Laurane D.',
    date: 'Avril 2025',
    text: 'Je venais faire l’atelier ceinture offert pour Noël. C’était super ! Marie est très pédagogue et très sympa. J’ai passé un super moment et je suis super contente de ma ceinture.',
  },
  {
    name: 'Aurore B.',
    date: 'Novembre 2024',
    text: 'J’ai eu la chance de réaliser une ceinture en cuir personnalisée avec Marie. Le cours est très pédagogique et très sympa. Je recommande vivement.',
  },
  {
    name: 'Véronique C.',
    date: 'Avril 2025',
    text: 'Marie nous apprend les gestes précis, nous entraîne et nous permet une réalisation dans les règles de l’art, par nous-mêmes. Très bon moment et contents du résultat final !',
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-forest/80">Avis</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-ink sm:text-[2.6rem]">
              Elles sont reparties
              <span className="block italic text-clay">avec leur pièce.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.16em] text-ink/55">
            Témoignages reçus après les ateliers de 2024 et 2025
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote key={review.name} className="flex flex-col justify-between bg-cream p-7 lg:p-9">
              <p className="font-display text-[16px] leading-[1.75] text-ink/80">« {review.text} »</p>
              <footer className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">{review.name}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink/50">{review.date}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-8 text-[12px] font-light leading-relaxed text-ink/50">
          Ces avis concernent les ateliers création. Ils sont publiés tels qu’ils ont été écrits,{' '}
          <Link to="/ateliers" className="border-b border-ink/25 pb-0.5 text-ink hover:border-ink">
            réservez le vôtre
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}