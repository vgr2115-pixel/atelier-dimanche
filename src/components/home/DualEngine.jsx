import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/site/Container';
import ProductCard from '@/components/product/ProductCard';
import BookingCard from '@/components/home/BookingCard';
import { useCart } from '@/components/cart/CartContext';
import { getProducts } from '@/api/catalog';

export default function DualEngine() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;
    getProducts().then((data) => {
      if (active) setProducts(data.slice(0, 4));
    });
    return () => {
      active = false;
    };
  }, []);

  const handleAdd = (product) =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      meta: product.leather,
      type: 'product',
    });

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
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleAdd}
                  className={index % 2 === 1 ? 'sm:mt-14' : ''}
                />
              ))}
            </div>

            {products.length === 0 && (
              <p className="mt-10 text-sm font-light text-ink/40">La collection arrive dans quelques instants…</p>
            )}

            <Link
              to="/boutique"
              className="mt-12 flex items-center justify-center gap-2 border border-ink/20 py-4 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-cream sm:hidden"
            >
              Voir toute la collection
            </Link>
          </div>

          <BookingCard />
        </div>
      </Container>
    </section>
  );
}