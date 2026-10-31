import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/site/Container';
import ProductCard from '@/components/product/ProductCard';
import BookingCard from '@/components/home/BookingCard';
import { PRODUCTS, WORKSHOPS } from '@/lib/catalog';

export default function DualEngine({ onQuickAdd }) {
  return (
    <section id="collection" className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
          <div>
            <div className="flex items-end justify-between gap-6 border-b border-ink/10 pb-6">
              <div>
                <p className="eyebrow text-forest/80">La boutique</p>
                <h2 className="mt-4 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
                  Les pièces de l’atelier
                </h2>
              </div>
              <Link
                to="/boutique"
                className="hidden shrink-0 items-center gap-2 pb-2 text-[11px] uppercase tracking-[0.2em] text-ink/55 transition-colors hover:text-ink sm:flex"
              >
                Tout voir
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7">
              {PRODUCTS.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={onQuickAdd}
                  className={index % 2 === 1 ? 'sm:mt-14' : ''}
                />
              ))}
            </div>

            <Link
              to="/boutique"
              className="mt-12 flex items-center justify-center gap-2 border border-ink/20 py-4 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-cream sm:hidden"
            >
              Voir toute la collection
            </Link>
          </div>

          <BookingCard workshop={WORKSHOPS[0]} />
        </div>
      </Container>
    </section>
  );
}