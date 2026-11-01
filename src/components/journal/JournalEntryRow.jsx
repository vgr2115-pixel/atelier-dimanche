import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const isInternal = (url) => typeof url === 'string' && url.startsWith('/');

export default function JournalEntryRow({ entry }) {
  const label = entry.link_label || 'Voir la pièce';
  const linkClass =
    'mt-5 inline-flex items-center gap-1.5 border-b border-ink/25 pb-1 text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:text-clay';

  return (
    <article className="grid gap-6 border-t border-ink/10 py-10 sm:grid-cols-[240px_1fr] sm:gap-10 lg:grid-cols-[300px_1fr]">
      <div className="overflow-hidden bg-linen">
        <Image
          src={entry.image}
          alt={entry.title}
          className="aspect-[4/5] w-full"
          fittingType="fill"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink/45">{formatDate(entry.date)}</p>
        <h3 className="mt-3 font-display text-[24px] leading-snug text-ink sm:text-[28px]">
          {entry.title}
        </h3>
        {entry.body && (
          <p className="mt-3 max-w-xl whitespace-pre-line text-[14px] font-light leading-[1.8] text-ink/60">
            {entry.body}
          </p>
        )}
        {entry.link_url &&
          (isInternal(entry.link_url) ? (
            <Link to={entry.link_url} className={linkClass}>
              {label}
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
            </Link>
          ) : (
            <a href={entry.link_url} target="_blank" rel="noreferrer" className={linkClass}>
              {label}
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
            </a>
          ))}
      </div>
    </article>
  );
}