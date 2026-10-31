import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const QUESTIONS = [
  {
    question: 'Pourquoi « Dimanche » ?',
    answer:
      'Le nom évoque un moment que l’on a pour soi, sans contrainte, où l’on fait ce que l’on aime. Il y a aussi le double sens de s’endimancher : de beaux accessoires, de belles matières, et l’envie de les porter.',
  },
  {
    question: 'Où sont fabriqués les produits ?',
    answer:
      'Tous les produits Dimanche sont fabriqués à Lyon, dans l’atelier de la créatrice. Coupe, parage, marquage, couture, finitions : tout est fait au même endroit, par la même personne.',
  },
  {
    question: 'Ma commande ne me plaît pas, que faire ?',
    answer:
      'Vous avez quatorze jours après réception pour m’écrire et organiser le retour. La pièce doit être en parfait état ; elle donne lieu à un échange ou à un avoir, hors frais de port. Les pièces personnalisées ne sont pas reprises.',
  },
  {
    question: 'Aucune date d’atelier ne correspond à mes disponibilités.',
    answer:
      'Les ateliers sont programmés le mercredi soir et le samedi, matin ou après-midi. Écrivez-moi : nous chercherons une date. Si vous êtes deux, le créneau se choisit ensemble, puisque l’atelier est complet.',
  },
  {
    question: 'Puis-je demander une association de couleurs précise ?',
    answer:
      'Oui, c’est tout l’intérêt de travailler avec une artisane. Sur Lyon, prenez rendez-vous pour venir voir les cuirs à l’atelier. À distance, nous étudions la demande par email avant la fabrication.',
  },
  {
    question: 'Une pièce métallique est cassée, peut-on la réparer ?',
    answer:
      'Oui. C’est l’avantage d’une relation directe : si une pièce métallique a cédé dans un usage normal du produit, je la change sans frais.',
  },
  {
    question: 'Qu’est-ce qu’un cuir au tannage végétal ?',
    answer:
      'Un cuir transformé avec des tanins végétaux (québracho, mimosa), dans un procédé à faible impact environnemental. Plus ferme et très résistant, il a une particularité : il se patine. Sensible à la lumière, il fonce et sa surface se lisse. Attention aux abus de langage : « cuir végétal » désigne un tannage, pas une matière sans peau animale, et « cuir vegan » est une contradiction.',
  },
  {
    question: 'Les pièces reviennent-elles en stock ?',
    answer:
      'Presque jamais. Les cuirs sont des chutes et des sur-stocks, souvent en très petite quantité. Une pièce vendue ne peut pas être refabriquée à l’identique : c’est ce qui la rend unique.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 border-t border-ink/10 bg-cream py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow text-forest/80">Questions fréquentes</p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[1.15] text-ink sm:text-[2.4rem]">
            Les réponses,
            <span className="block italic text-clay">sans détour.</span>
          </h2>
          <p className="mt-5 text-[14px] font-light leading-[1.8] text-ink/60">
            Une question qui n’est pas là ? Écrivez-moi : c’est moi qui réponds.
          </p>
        </div>

        <Accordion type="single" collapsible className="border-t border-ink/10">
          {QUESTIONS.map((item) => (
            <AccordionItem key={item.question} value={item.question} className="border-b border-ink/10">
              <AccordionTrigger className="py-5 text-left text-[13px] uppercase tracking-[0.1em] text-ink hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[13px] font-light leading-[1.85] text-ink/60">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}