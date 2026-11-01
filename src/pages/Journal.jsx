import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/site/Container';
import JournalEntryRow from '@/components/journal/JournalEntryRow';
import { base44 } from '@/api/base44Client';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const yearOf = (entry) => {
  const date = entry.date ? new Date(entry.date) : null;
  return date && !Number.isNaN(date.getTime()) ? String(date.getFullYear()) : 'Sans date';
};

const byYear = (entries) =>
  entries.reduce((groups, entry) => {
    const year = yearOf(entry);
    const group = groups.find((item) => item.year === year);
    if (group) {
      group.entries.push(entry);
    } else {
      groups.push({ year, entries: [entry] });
    }
    return groups;
  }, []);

export default function Journal() {
  useDocumentTitle('Nouvelles pièces — Atelier Dimanche, maroquinerie à Lyon');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.entities.JournalEntry.filter({ is_published: true }, { sort: '-date', limit: 60 })
      .then((page) => {
        if (!active) return;
        setEntries(page.items ?? []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const groups = byYear(entries);

  return (
    <div className="bg-cream">
      <Container className="pb-20 pt-14 lg:pb-28 lg:pt-20">
        <p className="eyebrow text-forest/80">Nouvelles pièces</p>
        <h1 className="mt-4 max-w-3xl font-display text-[2.2rem] leading-[1.08] tracking-[-0.01em] text-ink sm:text-[3.2rem]">
          Le journal de l’établi<span className="italic text-clay">.</span>
        </h1>
        <p className="mt-5 max-w-xl text-[15px] font-light leading-[1.85] text-ink/60">
          Chaque pièce quitte l’atelier une seule fois. Les arrivées sont datées ici, dans l’ordre
          où elles ont été terminées&nbsp;: cuirs trouvés, modèles nouveaux, séries très courtes.
        </p>

        {loading && (
          <p className="mt-14 border-t border-ink/10 pt-10 text-[13px] font-light text-ink/40">
            Chargement du journal…
          </p>
        )}

        {!loading && entries.length === 0 && (
          <div className="mt-14 border-t border-ink/10 pt-10">
            <p className="text-[14px] font-light leading-relaxed text-ink/55">
              Le journal s’ouvrira avec la prochaine pièce terminée. En attendant, la collection du
              moment est en boutique.
            </p>
            <Link
              to="/boutique"
              className="mt-6 inline-flex bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest"
            >
              Voir la collection
            </Link>
          </div>
        )}

        {groups.map((group) => (
          <section key={group.year} className="mt-14">
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-[15px] uppercase tracking-[0.22em] text-ink/70">
                {group.year}
              </h2>
              <span className="h-px flex-1 bg-ink/10" />
            </div>
            {group.entries.map((entry) => (
              <JournalEntryRow key={entry.id} entry={entry} />
            ))}
          </section>
        ))}

        {!loading && entries.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-10">
            <p className="text-[13px] font-light text-ink/55">Les pièces encore disponibles&nbsp;:</p>
            <Link
              to="/boutique"
              className="inline-flex items-center border-b border-ink/25 pb-1 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:text-clay"
            >
              Voir la boutique
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}