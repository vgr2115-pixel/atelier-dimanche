import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { base44 } from '@/api/base44Client';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const isInternal = (url) => typeof url === 'string' && url.startsWith('/');

function EntryLink({ entry }) {
  if (!entry.link_url) return null;
  const label = entry.link_label || 'En savoir plus';
  const className =
    'mt-4 inline-flex items-center gap-1.5 border-b border-ink/25 pb-1 text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:text-clay';

  if (isInternal(entry.link_url)) {
    return (
      <Link to={entry.link_url} className={className}>
        {label}
        <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
      </Link>
    );
  }
  return (
    <a href={entry.link_url} target="_blank" rel="noreferrer" className={className}>
      {label}
      <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
    </a>
  );
}

export default function SocialSection() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.entities.JournalEntry.filter({ is_published: true }, { sort: '-date', limit: 3 })
      .then((page) => {
        if (active) setEntries(page.items ?? []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="border-t border-ink/10 bg-linen/50 py-14 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:gap-6 sm:pb-7">
          <div>
            <p className="eyebrow text-forest/80">Le journal de l’atelier</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
              Les coulisses,
              <span className="italic text-clay"> au fil des jours.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href="https://www.instagram.com/atelier_dimanche/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:text-clay"
            >
              <Instagram className="h-3.5 w-3.5" strokeWidth={1.4} /> @atelier_dimanche
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
            </a>
            <a
              href="https://www.facebook.com/atelierdimanche/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 text-[11px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-ink hover:text-clay"
            >
              <Facebook className="h-3.5 w-3.5" strokeWidth={1.4} /> Facebook
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
            </a>
          </div>
        </div>

        <div className="mt-10 grid min-h-[8rem] gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
          {entries.map((entry) => (
            <article key={entry.id}>
              <div className="overflow-hidden bg-cream">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  className="aspect-[4/5] w-full transition-transform duration-700 hover:scale-[1.03]"
                  fittingType="fill"
                />
              </div>
              {entry.date && (
                <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-clay">
                  {formatDate(entry.date)}
                </p>
              )}
              <h3 className="mt-2 font-display text-[19px] leading-snug text-ink">{entry.title}</h3>
              {entry.body && (
                <p className="mt-2 line-clamp-3 text-[13px] font-light leading-relaxed text-ink/55">
                  {entry.body}
                </p>
              )}
              <EntryLink entry={entry} />
            </article>
          ))}
        </div>

        {!loading && entries.length === 0 && (
          <p className="mt-8 text-[13px] font-light text-ink/45">
            Les premières pages du journal arrivent.
          </p>
        )}

        <p className="mt-10 max-w-xl text-[13px] font-light leading-relaxed text-ink/55">
          Les nouvelles pièces, les gestes de l’atelier et les dates de création sortent d’abord sur
          Instagram — souvent avant le site.
        </p>
      </Container>
    </section>
  );
}