import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Store } from 'lucide-react';
import Container from '@/components/site/Container';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/components/cart/CartContext';
import { getAvailableProducts } from '@/api/catalog';
import { salePrice } from '@/lib/pricing';

export default function CollectionSection() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;
    getAvailableProducts().then((data) => {
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
      price: salePrice(product),
      image: product.image,
      meta: product.leather,
      type: 'product',
      max: product.stock ?? 1,
    });

  return (
    <section id="collection" className="bg-cream py-14 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:gap-6 sm:pb-7">
          <div>
            <p className="eyebrow text-forest/80">La boutique</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
              Les pièces disponibles
            </h2>
            <p className="mt-4 max-w-lg text-[14px] font-light leading-[1.8] text-ink/60">
              Photographiées une à une, telles qu’elles sont. Une fois vendue, une pièce ne revient
              pas : c’est la conséquence du cuir réemployé, et ce qui la rend unique.
            </p>
          </div>
          <Link
            to="/boutique"
            className="inline-flex shrink-0 items-center gap-2 pb-1 text-[11px] uppercase tracking-[0.2em] text-ink/55 transition-colors hover:text-ink"
          >
            Toute la collection
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-10 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickAdd={handleAdd} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="mt-10 text-sm font-light text-ink/40">La collection arrive dans quelques instants…</p>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.16em] text-ink/45">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5" strokeWidth={1.4} /> Expédié depuis Lyon sous 3 à 4 jours
          </span>
          <span className="flex items-center gap-2">
            <Store className="h-3.5 w-3.5" strokeWidth={1.4} /> Retrait gratuit à l’atelier-boutique
          </span>
        </div>
      </Container>
    </section>
  );
}