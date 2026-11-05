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
      <Container className="py-3.5 sm:py-9">
        {/* Mobile : une seule ligne qui défile, pour laisser les pièces remonter haut. */}
        <ul className="no-scrollbar -mx-6 flex items-center gap-x-5 overflow-x-auto px-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-y-7 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:divide-x lg:divide-ink/10">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex shrink-0 items-center gap-2 sm:items-start sm:gap-3 lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <Icon className="h-4 w-4 shrink-0 text-forest sm:mt-0.5" strokeWidth={1.3} />
              <div>
                <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-ink sm:whitespace-normal sm:text-[11px] sm:tracking-[0.2em]">
                  {title}
                </p>
                <p className="mt-1 hidden text-[12px] font-light leading-relaxed text-ink/55 sm:block">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}