import Container from '@/components/site/Container';
import ReviewQuote from '@/components/avis/ReviewQuote';

export default function AvisSection({
  id,
  eyebrow,
  title,
  accent,
  intro,
  note,
  reviews,
  loading,
  empty,
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-ink/10 bg-cream py-14 lg:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-forest/80">{eyebrow}</p>
            <h2 className="mt-4 font-display text-[1.9rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.4rem]">
              {title}
              <span className="block italic text-clay">{accent}</span>
            </h2>
            <p className="mt-5 max-w-[24rem] text-[14px] font-light leading-[1.8] text-ink/60">
              {intro}
            </p>
            {!loading && reviews.length > 0 && (
              <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-ink/40">
                {reviews.length} témoignage{reviews.length > 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div>
            {loading ? (
              <p className="text-[13px] font-light text-ink/40">Chargement des avis…</p>
            ) : reviews.length === 0 ? (
              <p className="max-w-[32rem] text-[14px] font-light leading-[1.8] text-ink/55">
                {empty}
              </p>
            ) : (
              <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewQuote key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {note && (
          <p className="mt-10 max-w-[52rem] text-[12px] font-light leading-relaxed text-ink/45">
            {note}
          </p>
        )}
      </Container>
    </section>
  );
}