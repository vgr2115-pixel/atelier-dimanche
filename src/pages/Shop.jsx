import Container from '@/components/site/Container';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/components/cart/CartContext';
import { useEffect, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { getProductsByCategory } from '@/api/catalog';
import { salePrice } from '@/lib/pricing';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const CATEGORIES = ['Tout', 'Sacs', 'Bananes', 'Pochette', 'Petite maroquinerie', 'Accessoires'];

const SORTS = [
  { id: 'nouveautes', label: 'Nouveautés' },
  { id: 'prix-croissant', label: 'Prix croissant' },
  { id: 'prix-decroissant', label: 'Prix décroissant' },
];

const sortProducts = (list, sort) => {
  if (sort === 'nouveautes') return list;
  const direction = sort === 'prix-decroissant' ? -1 : 1;
  return [...list].sort((a, b) => {
    const soldA = a.is_available === false ? 1 : 0;
    const soldB = b.is_available === false ? 1 : 0;
    return soldA - soldB || (salePrice(a) - salePrice(b)) * direction;
  });
};

export default function Shop() {
  useDocumentTitle('La boutique — Atelier Dimanche, maroquinerie à Lyon');
  const { addItem } = useCart();
  const [category, setCategory] = useState('Tout');
  const [sort, setSort] = useState('nouveautes');
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
      price: salePrice(product),
      image: product.image,
      meta: product.leather,
      type: 'product',
      max: product.stock ?? 1,
    });

  const visible = sortProducts(products, sort);

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

        <div className="mt-10 flex flex-col gap-4 border-y border-ink/10 py-4 sm:flex-row sm:items-center">
          <div className="no-scrollbar -mx-6 flex gap-1 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  category === item ? 'bg-ink text-cream' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 sm:ml-auto sm:justify-end">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">
              {loading
                ? 'Chargement…'
                : `${visible.length} pièce${visible.length > 1 ? 's' : ''}${
                    visible.some((product) => product.is_available === false) ? ' · dont pièces vendues' : ''
                  }`}
            </p>
            <label className="flex items-center gap-1.5 text-ink/50">
              <ArrowUpDown className="h-3.5 w-3.5" strokeWidth={1.4} />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Trier les pièces"
                className="cursor-pointer appearance-none bg-transparent text-[11px] uppercase tracking-[0.16em] text-ink/70 focus:outline-none"
              >
                {SORTS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </Container>

      <Container className="pb-20 lg:pb-28">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} onQuickAdd={handleAdd} />
          ))}
        </div>
        {!loading && visible.length === 0 && (
          <p className="py-16 text-center text-sm font-light text-ink/45">
            Aucune pièce dans cette catégorie pour le moment.
          </p>
        )}
      </Container>
    </div>
  );
}