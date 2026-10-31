import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/site/Container';
import { getPublishedReviews } from '@/api/catalog';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getPublishedReviews(4)
      .then((data) => {
        if (active) setReviews(data.slice(0, 2));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loading && reviews.length === 0) return null;

  return (
    <section className="bg-cream py-14 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:gap-6 sm:pb-7">
          <div>
            <p className="eyebrow text-forest/80">Avis</p>
            <h2 className="mt-3 font-display text-[1.9rem] leading-[1.12] text-ink sm:mt-4 sm:text-[2.6rem]">
              Elles sont reparties
              <span className="block italic text-clay">avec leur pièce.</span>
            </h2>
          </div>
          <Link
            to="/avis"
            className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
          >
            Tous les avis
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
          </Link>
        </div>

        {loading ? (
          <p className="py-12 text-[12px] font-light text-ink/40">Chargement des avis…</p>
        ) : (
          <div className="mt-8 grid gap-px bg-ink/10 sm:mt-12 sm:grid-cols-2">
            {reviews.map((review) => (
              <blockquote
                key={review.id}
                className="flex flex-col justify-between bg-cream py-6 sm:p-8 lg:p-9"
              >
                <p className="font-display text-[16px] leading-[1.75] text-ink/80 sm:text-[17px]">
                  « {review.text} »
                </p>
                <footer className="mt-5 flex items-center justify-between gap-4 border-t border-ink/10 pt-4 sm:mt-7">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink">{review.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink/50">
                    {review.date_label}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        <p className="mt-7 text-[12px] font-light leading-relaxed text-ink/55">
          Témoignages publiés avec leur source, repris tels quels. Ils concernent les ateliers
          création —{' '}
          <Link to="/ateliers" className="border-b border-ink/25 pb-0.5 text-ink hover:border-ink">
            réservez le vôtre
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}