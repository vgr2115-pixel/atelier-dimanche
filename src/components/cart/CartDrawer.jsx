import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { formatPrice } from '@/lib/format';
import { Image } from '@/components/ui/image';

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, setQuantity, removeItem } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Panier"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <p className="eyebrow text-ink/60">Votre panier</p>
          <button type="button" onClick={closeCart} aria-label="Fermer le panier" className="text-ink/60 hover:text-ink">
            <X className="h-5 w-5" strokeWidth={1.3} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-2xl text-ink">Votre panier est vide</p>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink/55">
              Les pièces de l’atelier sont uniques : quand elles partent, elles ne reviennent pas.
            </p>
            <Link
              to="/boutique"
              onClick={closeCart}
              className="mt-8 inline-flex bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest"
            >
              Voir la collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="h-24 w-20 shrink-0 overflow-hidden bg-linen">
                      <Image src={item.image} alt={item.name} className="h-full w-full" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-[15px] leading-tight text-ink">{item.name}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/40">{item.meta}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Retirer ${item.name}`}
                          className="text-ink/30 transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.3} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="flex items-center border border-ink/15">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1.5 text-ink/60 hover:text-ink"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-7 text-center text-xs text-ink">{item.quantity}</span>
                          {item.quantity < (item.max ?? 1) && (
                            <button
                              type="button"
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1.5 text-ink/60 hover:text-ink"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-ink">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink/10 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/60">Sous-total</span>
                <span className="text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-[11px] font-light leading-relaxed text-ink/45">
                Livraison offerte en France métropolitaine dès 150 €. Emballage cadeau possible.
              </p>
              <Link
                to="/panier"
                onClick={closeCart}
                className="mt-5 flex w-full items-center justify-center bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest"
              >
                Passer commande
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full py-2 text-[11px] uppercase tracking-[0.2em] text-ink/45 hover:text-ink"
              >
                Continuer mes achats
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}