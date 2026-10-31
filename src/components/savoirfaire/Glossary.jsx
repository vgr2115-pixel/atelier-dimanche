const WORDS = [
  {
    term: 'Upcycling',
    text: 'Réemployer une matière déjà produite. Ici : des chutes et sur-stocks de cuir de grandes maisons, transformés en pièces neuves.',
  },
  {
    term: 'Point sellier',
    text: 'La couture à la main des selliers : deux aiguilles, un seul fil, un point incliné et serré qui ne se détricote pas.',
  },
  {
    term: 'Fil de lin ciré',
    text: 'Un fil solide, enduit de cire, qui glisse dans le cuir et se patine avec la pièce. Il ne casse pas au premier frottement.',
  },
  {
    term: 'Parage, refente',
    text: 'Réduire l’épaisseur du cuir là où les coutures se croisent, pour éviter les surépaisseurs et garder une pièce souple.',
  },
  {
    term: 'Tranches',
    text: 'Le bord visible du cuir. Teinté puis lustré à la main, il devient lisse et brillant : c’est le détail qui trahit le travail fini.',
  },
  {
    term: 'Tannage végétal',
    text: 'Cuir tanné aux extraits végétaux (québracho, mimosa), sans chrome. Ferme, résistant, il fonce et se lisse avec le temps.',
  },
  {
    term: 'Patine',
    text: 'La transformation du cuir à l’usage : la teinte s’approfondit, la surface se lisse. Ce n’est pas un défaut, c’est la preuve qu’il vit.',
  },
  {
    term: 'Marquage à chaud',
    text: 'Le logo est imprimé au fer chaud sur le cuir. Un geste rapide, irréversible, qui signe la pièce à l’atelier.',
  },
];

export default function Glossary() {
  return (
    <section className="border-t border-ink/10 bg-linen/60 py-16 lg:py-24">
      <p className="eyebrow text-forest/80">Les mots justes</p>
      <h2 className="mt-4 max-w-2xl font-display text-[1.9rem] leading-[1.15] text-ink sm:text-[2.4rem]">
        Le vocabulaire du cuir, sans marketing.
      </h2>
      <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {WORDS.map((word) => (
          <div key={word.term} className="border-t border-ink/15 pt-4">
            <dt className="text-[12px] uppercase tracking-[0.16em] text-ink">{word.term}</dt>
            <dd className="mt-2 text-[13px] font-light leading-[1.8] text-ink/60">{word.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}