export default function ReviewQuote({ review }) {
  return (
    <blockquote className="flex h-full flex-col justify-between bg-cream p-6 sm:p-7">
      <div>
        {review.context && (
          <p className="text-[10px] uppercase tracking-[0.18em] text-clay">{review.context}</p>
        )}
        <p className="mt-4 font-display text-[16px] leading-[1.8] text-ink/85">
          « {review.text} »
        </p>
      </div>
      <footer className="mt-6 border-t border-ink/10 pt-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink">{review.name}</p>
        {review.date_label && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/45">
            {review.date_label}
          </p>
        )}
      </footer>
    </blockquote>
  );
}