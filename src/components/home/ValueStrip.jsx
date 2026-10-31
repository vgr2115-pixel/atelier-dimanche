import { Leaf, Scissors, MapPin, Users } from 'lucide-react';
import Container from '@/components/site/Container';

const ITEMS = [
  { icon: Leaf, title: 'Cuirs upcyclés', text: 'Chutes de grandes maisons, cuirs tannés végétal' },
  { icon: Scissors, title: 'Fait main', text: 'Couture sellier, tranches lustrées une à une' },
  { icon: MapPin, title: 'À Lyon', text: 'Atelier-boutique au 23 rue Burdeau, Lyon 1ᵉʳ' },
  { icon: Users, title: 'Ateliers', text: '2 à 6 personnes, repartez avec votre pièce' },
];

export default function ValueStrip() {
  return (
    <section className="border-y border-ink/10 bg-cream">
      <Container className="py-8">
        <ul className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-ink/10">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3 px-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink">{title}</p>
                <p className="mt-1 text-[12px] font-light leading-relaxed text-ink/50">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}