import Container from '@/components/site/Container';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/components/cart/CartContext';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '@/api/catalog';

const CATEGORIES = ['Tout', 'Sacs', 'Bananes', 'Petite maroquinerie', 'Accessoires'];

export default function Shop() {
  const { addItem } = useCart();
  const [category, setCategory] = useState('Tout');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProductsByCategory(category).then((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [category]);

  const handleAdd = (product) =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      meta: product.leather,
      type: 'product',
      max: product.stock ?? 1,
    });

  return (
    <div className="bg-cream">
      <Container className="pb-10 pt-14 lg:pb-14 lg:pt-20">
        <p className="eyebrow text-forest/80">La boutique</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 className="font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            Les pièces de l’atelier
          </h1>
          <p className="max-w-md text-[15px] font-light leading-[1.8] text-ink/60 lg:pb-2">
            Chaque pièce est unique : taillée dans une chute de cuir de grande maison ou un cuir
            tanné végétal, puis cousue main dans l’atelier lyonnais. Pas de série, pas de réassort.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3 border-y border-ink/10 py-4">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                category === item ? 'bg-ink text-cream' : 'text-ink/50 hover:text-ink'
              }`}
            >
              {item}
            </button>
          ))}
          <p className="ml-auto text-[11px] uppercase tracking-[0.16em] text-ink/50">
            {loading
              ? 'Chargement…'
              : `${products.length} pièce${products.length > 1 ? 's' : ''}${
                  products.some((product) => product.is_available === false) ? ' · dont pièces vendues' : ''
                }`}
          </p>
        </div>
      </Container>

      <Container className="pb-20 lg:pb-28">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickAdd={handleAdd} />
          ))}
        </div>
        {!loading && products.length === 0 && (
          <p className="py-16 text-center text-sm font-light text-ink/45">
            Aucune pièce dans cette catégorie pour le moment.
          </p>
        )}
      </Container>
    </div>
  );
}