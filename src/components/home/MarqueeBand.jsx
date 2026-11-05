const PHRASES = [
  'Fait main à Lyon',
  'Cuirs de grandes maisons',
  'Une pièce, un exemplaire',
  'Depuis 2015',
  'Atelier-boutique · 23 rue Burdeau',
];

// Bande beige défilant en continu : le geste de marque de l’accueil.
// Le contenu est dupliqué pour que la boucle soit invisible.
export default function MarqueeBand({ items = PHRASES, duration = 36 }) {
  const track = [...items, ...items];

  return (
    <section
      aria-hidden="true"
      className="marquee overflow-hidden border-y border-ink/15 bg-sand"
    >
      <div
        className="marquee-track flex w-max items-center py-3 sm:py-3.5"
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {track.map((phrase, index) => (
          <span
            key={`${phrase}-${index}`}
            className="flex shrink-0 items-center gap-5 pr-5 sm:gap-8 sm:pr-8"
          >
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-ink/85 sm:text-[11px]">
              {phrase}
            </span>
            <span className="text-[9px] leading-none text-ink/45">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}