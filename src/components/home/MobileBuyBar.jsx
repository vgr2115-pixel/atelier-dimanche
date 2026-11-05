import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';

// Barre d’achat collée en bas sur mobile : elle apparaît une fois le hero passé.
export default function MobileBuyBar() {
  const { count, openCart, isOpen } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 460);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 px-4 pb-[calc(0.7rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        visible && !isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Link
          to="/boutique"
          className="flex-1 bg-ink py-3.5 text-center text-[10px] uppercase tracking-[0.22em] text-cream"
        >
          Voir les pièces
        </Link>
        <button
          type="button"
          onClick={openCart}
          aria-label="Ouvrir le panier"
          className="relative flex h-[46px] w-[46px] shrink-0 items-center justify-center border border-ink/20 text-ink"
        >
          <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.3} />
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-forest px-1 text-[9px] font-medium text-cream">
              {count}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}