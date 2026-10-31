import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { Image } from '@/components/ui/image';
import { IMAGES } from '@/lib/images';

const NAV = [
  { label: 'Boutique', to: '/boutique' },
  { label: 'Ateliers création', to: '/ateliers' },
  { label: 'Savoir-faire', to: '/savoir-faire' },
  { label: 'Avis', to: '/avis' },
  { label: 'La marque', to: '/histoire' },
  { label: 'Visite & contact', to: '/contact' },
];

export default function Header() {
  const { count, openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'border-b border-ink/10 bg-cream/90 backdrop-blur-md'
            : 'border-b border-transparent bg-cream/40 backdrop-blur-[2px]'
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:h-20 lg:px-16">
          <Link to="/" className="flex items-center" aria-label="Dimanche — Atelier Dimanche, accueil">
            <Image
              src={IMAGES.logo}
              alt="Dimanche"
              className="h-9 w-[116px] lg:h-11 lg:w-[146px]"
              fittingType="fit"
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 hover:text-ink xl:text-[11px] xl:tracking-[0.2em] ${
                  pathname === item.to ? 'text-ink' : 'text-ink/55'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 text-ink transition-opacity hover:opacity-70"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.3} />
              <span className="hidden text-[11px] uppercase tracking-[0.2em] sm:inline">Panier</span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-forest px-1 text-[10px] font-medium text-cream">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center justify-center p-2 text-ink lg:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={1.3} /> : <Menu className="h-5 w-5" strokeWidth={1.3} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-ink/10 bg-cream lg:hidden">
            <nav className="flex flex-col px-6 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="border-b border-ink/5 py-4 font-display text-2xl text-ink last:border-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <div className="h-[72px] lg:h-20" aria-hidden="true" />
    </>
  );
}