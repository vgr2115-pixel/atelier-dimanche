import { Star } from 'lucide-react';
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
    text: 'Marie nous apprend les gestes précis, nous entraîne et nous permet une réalisation dans les règles de l’art, par nous-mêmes. Très bon moment et contents du résultat.',
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-forest/80">Elles et ils ont cousu</p>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-ink sm:text-[2.6rem]">
            Ce qu’on dit de l’atelier
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} className="h-3.5 w-3.5 fill-sand text-sand" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">4,9/5 sur Google · 200+ participants</p>
          </div>
        </div>

        <div className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote key={review.name} className="flex flex-col justify-between bg-cream p-7 lg:p-9">
              <p className="font-display text-[17px] leading-[1.7] text-ink/80">« {review.text} »</p>
              <footer className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">{review.name}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink/35">{review.date}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}