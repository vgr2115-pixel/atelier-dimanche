const SIGNS = [
  {
    title: 'La couture',
    text: 'Un point sellier dessine une ligne légèrement inclinée, régulière, avec deux fils visibles. Une couture machine est droite, très serrée, souvent identique sur tous les modèles.',
  },
  {
    title: 'Les tranches',
    text: 'Sur une pièce finie, le bord du cuir est teinté, lissé, parfois ciré. Un bord brut et rugueux signale une pièce vite assemblée, pas un travail d’atelier.',
  },
  {
    title: 'L’irrégularité',
    text: 'Deux pièces Dimanche ne sont jamais identiques : la peau, la teinte et les veines changent. Une production parfaitement répétée à l’infini est un signal inverse.',
  },
];

export default function HandmadeChecklist() {
  return (
    <section id="reconnaitre" className="scroll-mt-28 border-t border-ink/10 py-14 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow text-forest/80">Le doute est légitime</p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[1.15] text-ink sm:text-[2.4rem]">
            Comment reconnaître
            <span className="block italic text-clay">un vrai cousu main.</span>
          </h2>
          <p className="mt-5 text-[14px] font-light leading-[1.8] text-ink/60">
            Le « fait main » est devenu un argument de vente. Trois détails permettent de faire la
            différence entre une pièce cousue à la main et une pièce simplement assemblée.
          </p>
        </div>

        <ol className="divide-y divide-ink/10 border-t border-ink/10">
          {SIGNS.map((sign, index) => (
            <li key={sign.title} className="grid gap-3 py-6 sm:grid-cols-[36px_1fr] sm:gap-6">
              <p className="font-display text-[15px] text-clay">{String(index + 1).padStart(2, '0')}</p>
              <div>
                <h3 className="text-[12px] uppercase tracking-[0.16em] text-ink">{sign.title}</h3>
                <p className="mt-2 text-[13px] font-light leading-[1.8] text-ink/60">{sign.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-8 text-[12px] font-light leading-relaxed text-ink/50">
        Et si le doute persiste : demandez à voir l’atelier. Un artisan montre ses outils, ses chutes
        et ses heures. C’est exactement ce que propose la visite du 23 rue Burdeau.
      </p>
    </section>
  );
}