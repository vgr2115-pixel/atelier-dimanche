import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { formatPrice } from '@/lib/format';

export default function ProductCard({ product, onQuickAdd, className = '' }) {
  return (
    <article className={`group ${className}`}>
      <div className="relative overflow-hidden bg-linen">
        <Link to={`/produit/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            className="aspect-[4/5] w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            fittingType="fill"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-cream/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-forest backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            className="flex w-full items-center justify-center gap-2 bg-ink/95 py-3.5 text-[10px] uppercase tracking-[0.22em] text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-forest"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
            Ajout rapide
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link to={`/produit/${product.slug}`} className="font-display text-[17px] leading-snug text-ink hover:text-clay">
            {product.name}
          </Link>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/40">{product.leather}</p>
        </div>
        <p className="shrink-0 text-[13px] tabular-nums text-ink/80">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}