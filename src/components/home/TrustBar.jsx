import { Gem, Recycle, Scissors, Wrench } from 'lucide-react';
import Container from '@/components/site/Container';

const ITEMS = [
  {
    icon: Gem,
    title: 'Pièces uniques',
    text: 'Un seul exemplaire par modèle. Pas de série, pas de réassort.',
  },
  {
    icon: Recycle,
    title: 'Cuirs réemployés',
    text: 'Chutes et sur-stocks de grandes maisons, choisis un à un.',
  },
  {
    icon: Scissors,
    title: 'Cousu main',
    text: 'Point sellier au fil de lin ciré, tranches finies à la main.',
  },
  {
    icon: Wrench,
    title: 'Réparé à l’atelier',
    text: 'Une pièce métallique cède ? Je la remplace.',
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-ink/10 bg-linen/60">
      <Container className="py-7 sm:py-9">
        <ul className="grid gap-y-5 sm:grid-cols-2 sm:gap-y-7 lg:grid-cols-4 lg:divide-x lg:divide-ink/10">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3 lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink">{title}</p>
                <p className="mt-1 text-[12px] font-light leading-relaxed text-ink/55">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}