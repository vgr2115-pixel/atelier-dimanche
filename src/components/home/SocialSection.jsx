import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { base44 } from '@/api/base44Client';
import { selectHomeEntries } from '@/lib/journal';

const NEW_DAYS = 21;

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const isFresh = (value) => {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  return (Date.now() - date.getTime()) / 86400000 <= NEW_DAYS;
};

const isInternal = (url) => typeof url === 'string' && url.startsWith('/');

function EntryLink({ entry }) {
  if (!entry.link_url) return null;
  const label = entry.link_label || 'Voir la pièce';
  const className =
    'mt-4 inline-flex items-center gap-1.5 border-b border-ink/25 pb-1 text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:text-clay';

  return isInternal(entry.link_url) ? (
    <Link to={entry.link_url} className={className}>
      {label}
      <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
    </Link>
  ) : (
    <a href={entry.link_url} target="_blank" rel="noreferrer" className={className}>
      {label}
      <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
    </a>
  );
}

export default function SocialSection() {
  const [entries, setEntries] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const [settingsList, page] = await Promise.all([
        base44.entities.SiteSettings.list('created_date', 1),
        base44.entities.JournalEntry.filter({ is_published: true }, { sort: '-date', limit: 12 }),
      ]);
      if (!active) return;
      const settings = Array.isArray(settingsList) ? settingsList[0] : settingsList?.items?.[0];
      setEntries(selectHomeEntries(page.items ?? [], 3));
      setVisible(settings?.journal_enabled !== false);
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  if (!visible || entries.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-linen/50 py-14 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:gap-6 sm:pb-7">
          <div>
            <p className="eyebrow text-forest/80">Nouvelles pièces</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
              Ce qui vient de sortir
              <span className="italic text-clay"> de l’atelier.</span>
            </h2>
          </div>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:text-clay"
          >
            Toutes les pièces
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
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
              <div className="mt-4 flex items-center gap-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  {formatDate(entry.date)}
                </p>
                {isFresh(entry.date) && (
                  <span className="bg-forest/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-forest">
                    Nouveau
                  </span>
                )}
              </div>
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

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[13px] font-light leading-relaxed text-ink/55">
            Chaque pièce est unique et n’est pas rééditée. Les arrivées sont datées ici, dans l’ordre
            où elles quittent l’établi.
          </p>
          <Link
            to="/nouvelles-pieces"
            className="inline-flex shrink-0 items-center gap-2 border-b border-ink/25 pb-1.5 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:text-clay"
          >
            Tout le journal
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.4} />
          </Link>
        </div>
      </Container>
    </section>
  );
}