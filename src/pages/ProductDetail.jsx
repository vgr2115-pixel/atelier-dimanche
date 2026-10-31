import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Minus, Plus, Truck, ShieldCheck, Scissors } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/components/cart/CartContext';
import { getProductBySlug, getRelatedProducts } from '@/api/catalog';
import { formatPrice } from '@/lib/format';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProductBySlug(slug).then(async (found) => {
      if (!active) return;
      setProduct(found);
      setLoading(false);
      if (found) {
        const items = await getRelatedProducts(found);
        if (active) setRelated(items);
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    document.title = product
      ? `${product.name} — Atelier Dimanche`
      : 'Atelier Dimanche — Maroquinerie artisanale à Lyon';
  }, [product]);

  if (loading) {
    return <div className="py-40 text-center text-sm font-light text-ink/40">Chargement de la pièce…</div>;
  }

  if (!product) {
    return (
      <Container className="py-32 text-center">
        <p className="eyebrow text-forest/70">Introuvable</p>
        <h1 className="mt-4 font-display text-4xl text-ink">Cette pièce n’est plus disponible.</h1>
        <p className="mt-4 text-sm font-light text-ink/55">
          Les pièces uniques partent vite. Découvrez la collection actuelle.
        </p>
        <Link
          to="/boutique"
          className="mt-8 inline-flex bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream hover:bg-forest"
        >
          Voir la collection
        </Link>
      </Container>
    );
  }

  const handleAdd = () =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      meta: product.leather,
      type: 'product',
      quantity,
    });

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <div className="bg-cream">
      <Container className="pt-8">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink/40">
          <Link to="/boutique" className="hover:text-ink">
            Boutique
          </Link>
          <span>/</span>
          <span className="text-ink/60">{product.category}</span>
        </nav>
      </Container>

      <Container className="pb-16 pt-8 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden bg-linen">
              <Image
                src={gallery[0]}
                alt={product.name}
                className="aspect-[4/5] w-full"
                fittingType="fill"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {gallery.slice(1, 4).map((src) => (
                  <div key={src} className="overflow-hidden bg-linen">
                    <Image src={src} alt={product.name} className="aspect-square w-full" fittingType="fill" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow text-forest/80">{product.category}</p>
            <h1 className="mt-4 font-display text-[2.2rem] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3rem]">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <p className="font-display text-2xl text-ink">{formatPrice(product.price)}</p>
              {product.badge && (
                <span className="border border-forest/25 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-forest">
                  {product.badge}
                </span>
              )}
            </div>
            <p className="mt-6 text-[15px] font-light leading-[1.8] text-ink/65">{product.description}</p>

            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center border border-ink/20">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="px-4 py-3 text-ink/60 hover:text-ink"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-8 text-center text-sm text-ink">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="px-4 py-3 text-ink/60 hover:text-ink"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="flex flex-1 items-center justify-center bg-ink px-6 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest"
              >
                Ajouter au panier
              </button>
            </div>

            <div className="mt-6 grid gap-3 border-y border-ink/10 py-5 text-[12px] font-light leading-relaxed text-ink/55">
              <p className="flex items-start gap-3">
                <Scissors className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
                Pièce unique — cousue main par Marie à Lyon. Un seul exemplaire disponible.
              </p>
              <p className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
                Expédiée depuis Lyon sous 3 à 4 jours ouvrés · retrait gratuit à l’atelier-boutique.
              </p>
              <p className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
                Échange sous 14 jours · réparation des pièces métalliques à l’atelier.
              </p>
            </div>

            <div className="mt-8 divide-y divide-ink/10 border-b border-ink/10">
              <details open className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-[11px] uppercase tracking-[0.2em] text-ink">
                  Composition &amp; traçabilité
                  <Plus className="h-3.5 w-3.5 transition-transform group-open:rotate-45" strokeWidth={1.4} />
                </summary>
                <ul className="mt-4 space-y-2 text-[13px] font-light leading-relaxed text-ink/60">
                  <li>{product.leather}</li>
                  {(product.details || []).map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                  <li>
                    Peau choisie une à une dans les chutes et sur-stocks de grandes maisons, ou cuir au
                    tannage végétal. Couture au point sellier, fil de lin ciré, tranches teintées et
                    marquage à chaud dans l’atelier.
                  </li>
                </ul>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-[11px] uppercase tracking-[0.2em] text-ink">
                  Dimensions &amp; entretien
                  <Plus className="h-3.5 w-3.5 transition-transform group-open:rotate-45" strokeWidth={1.4} />
                </summary>
                <div className="mt-4 space-y-2 text-[13px] font-light leading-relaxed text-ink/60">
                  {product.dimensions && <p>Dimensions : {product.dimensions}</p>}
                  <p>
                    Nourrir le cuir une à deux fois par an avec une crème incolore. Éviter l’exposition
                    prolongée au soleil : le cuir tanné végétal se patine, c’est normal et c’est beau.
                  </p>
                </div>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-[11px] uppercase tracking-[0.2em] text-ink">
                  Livraison &amp; retours
                  <Plus className="h-3.5 w-3.5 transition-transform group-open:rotate-45" strokeWidth={1.4} />
                </summary>
                <div className="mt-4 space-y-2 text-[13px] font-light leading-relaxed text-ink/60">
                  <p>
                    Expédition en lettre suivie sous 3 à 4 jours ouvrés, ou retrait gratuit à
                    l’atelier-boutique, 23 rue Burdeau, Lyon 1ᵉʳ.
                  </p>
                  <p>
                    Quatorze jours après réception pour changer d’avis, sur une pièce non portée :
                    échange ou avoir, hors frais de port. Les pièces personnalisées ne sont pas reprises.
                  </p>
                  <p>
                    <Link
                      to="/savoir-faire#faq"
                      className="border-b border-ink/25 pb-0.5 text-ink hover:border-ink"
                    >
                      Questions fréquentes
                    </Link>
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="border-t border-ink/10 pb-20 pt-14 lg:pb-28">
          <p className="eyebrow text-forest/80">Dans la même veine</p>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onQuickAdd={(entry) =>
                  addItem({
                    id: entry.id,
                    slug: entry.slug,
                    name: entry.name,
                    price: entry.price,
                    image: entry.image,
                    meta: entry.leather,
                    type: 'product',
                  })
                }
              />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}