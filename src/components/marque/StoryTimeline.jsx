const TIMELINE = [
  {
    year: '2014',
    title: 'Les premières pochettes',
    text: 'Graphiste sans beaucoup de commandes, je couds trois morceaux de cuir et je les pose sur un stand de créateurs. Ça prend : les premières pièces partent le premier week-end.',
  },
  {
    year: '2015',
    title: 'Dimanche',
    text: 'La marque naît à Nantes : un nom, un logo, un fer à chaud pour marquer les pièces. Le nom évoque le jour où l’on fait ce que l’on aime, et le fait de s’endimancher.',
  },
  {
    year: '2016',
    title: 'CAP maroquinerie',
    text: 'Une formation exigeante, sur sélection, avec un vrai chef d’atelier. J’y apprends les montages, le parage, les machines. Les pièces deviennent plus propres, plus solides.',
  },
  {
    year: '2019',
    title: 'Le reportage Étonnantes',
    text: 'Solenn Cosotti et Rémy Lidereau viennent photographier l’atelier et raconter le parcours. Les portraits de cette série sont encore ceux que j’utilise aujourd’hui.',
  },
  {
    year: '2021',
    title: 'L’atelier filmé',
    text: 'Fierce Productions tourne dans l’atelier : les mains, les outils, les chutes de cuir. Cette vidéo est aujourd’hui en ligne sur le site, sans mise en scène.',
  },
  {
    year: 'Aujourd’hui',
    title: '23 rue Burdeau, Lyon 1ᵉʳ',
    text: 'L’atelier-boutique réunit la fabrication, la vente et les ateliers d’initiation dans la même pièce. On y voit les cuirs, les outils et la pièce en cours.',
  },
];

export default function StoryTimeline() {
  return (
    <section className="border-t border-ink/10 py-14 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <p className="eyebrow text-forest/80">Le parcours</p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[1.15] text-ink sm:text-[2.4rem]">
            Dix ans de gestes,
            <span className="block italic text-clay">sans raccourci.</span>
          </h2>
          <p className="mt-5 max-w-sm text-[14px] font-light leading-[1.8] text-ink/60">
            Une marque qui n’a jamais grossi plus vite que la paire de mains qui la fait vivre.
          </p>
        </div>

        <ol className="divide-y divide-ink/10 border-t border-ink/10">
          {TIMELINE.map((entry) => (
            <li key={entry.year} className="grid gap-3 py-6 sm:grid-cols-[110px_1fr] sm:gap-8">
              <p className="font-display text-[17px] text-clay">{entry.year}</p>
              <div>
                <p className="text-[12px] uppercase tracking-[0.16em] text-ink">{entry.title}</p>
                <p className="mt-2 text-[13px] font-light leading-[1.8] text-ink/60">{entry.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}