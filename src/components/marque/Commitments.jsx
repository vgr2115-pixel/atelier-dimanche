const ENGAGEMENTS = [
  {
    title: 'Une seule paire de mains',
    text: 'Je dessine, je découpe, je couds, je marque et j’expédie. Aucun atelier extérieur, aucune sous-traitance. C’est plus lent, et c’est le point.',
  },
  {
    title: 'Des cuirs qui existaient déjà',
    text: 'Chutes et sur-stocks de grandes maisons, choisis un à un, complétés par des cuirs au tannage végétal pour leur tenue et leur patine.',
  },
  {
    title: 'Des quantités limitées, assumées',
    text: 'Une pièce vendue ne revient pas. Je préfère le dire clairement plutôt que de promettre un réassort que le cuir ne permet pas.',
  },
  {
    title: 'Un prix qui s’explique',
    text: 'Le prix paie la peau, les heures, les outils et le geste. Si vous voulez comprendre un prix, je peux toujours détailler ce qu’il contient.',
  },
];

const NON = [
  'Pas de série, pas de « réassort sous 48 h »',
  'Pas de cuir présenté comme « vegan » : le cuir vient d’une peau animale',
  'Pas de production cachée ailleurs : tout est fait au 23 rue Burdeau',
  'Pas de vente sans possibilité de réparation après',
];

export default function Commitments() {
  return (
    <section className="border-t border-ink/10 py-14 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow text-forest/80">Ce que je défends</p>
          <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {ENGAGEMENTS.map((item) => (
              <div key={item.title} className="border-t border-ink/15 pt-4">
                <p className="text-[12px] uppercase tracking-[0.16em] text-ink">{item.title}</p>
                <p className="mt-2 text-[13px] font-light leading-[1.8] text-ink/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-linen/70 p-8 lg:p-10">
          <p className="eyebrow text-clay">Ce que je ne fais pas</p>
          <ul className="mt-6 space-y-4">
            {NON.map((item) => (
              <li key={item} className="border-b border-ink/10 pb-4 text-[13px] font-light leading-[1.7] text-ink/65 last:border-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] font-light leading-relaxed text-ink/50">
            Une question sur un point précis ? Écrivez-moi, je réponds moi-même.
          </p>
        </div>
      </div>
    </section>
  );
}