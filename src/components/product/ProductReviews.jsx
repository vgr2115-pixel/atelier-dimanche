import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedReviews } from '@/api/catalog';
import ReviewQuote from '@/components/avis/ReviewQuote';

export default function ProductReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let active = true;
    getPublishedReviews(40).then((all) => {
      if (!active) return;
      setReviews(all.filter((review) => review.type === 'produit').slice(0, 2));
    });
    return () => {
      active = false;
    };
  }, []);

  if (!reviews.length) return null;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-forest/80">Avis clients</p>
        <Link
          to="/avis"
          className="text-[11px] uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-ink"
        >
          Tous les avis
        </Link>
      </div>
      <div className="mt-6 grid gap-px bg-ink/10 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewQuote key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}