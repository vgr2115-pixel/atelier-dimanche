import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { Image } from '@/components/ui/image';
import { IMAGES } from '@/lib/images';
import HeaderBanner from '@/components/site/HeaderBanner';

// Menu resserré sur l'essentiel : illustrations, marque et nouvelles pièces vivent dans le pied de page.
const NAV = [
  { label: 'Boutique', to: '/boutique' },
  { label: 'Sur-mesure', to: '/sur-mesure' },
  { label: 'Savoir-faire', to: '/savoir-faire' },
  { label: 'Ateliers', to: '/ateliers' },
  { label: 'Avis', to: '/avis' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const { count, openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef(null);

  // Le bandeau peut passer sur deux lignes : on mesure sa hauteur réelle.
  useEffect(() => {
    if (!bannerRef.current) return undefined;
    const observer = new ResizeObserver((entries) => {
      setBannerHeight(entries[0]?.contentRect.height ?? 0);
    });
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

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
    <div style={{ '--banner-h': `${bannerHeight}px` }}>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'border-b border-ink/10 bg-cream/90 backdrop-blur-md'
            : 'border-b border-transparent bg-cream/40 backdrop-blur-[2px]'
        }`}
      >
        <div ref={bannerRef}>
          <HeaderBanner />
        </div>
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:h-20 lg:px-16">
          <Link to="/" className="flex items-center" aria-label="Dimanche — Atelier Dimanche, accueil">
            {/* Mobile : l'emblème seul reste lisible dans une barre étroite. */}
            <Image
              src={IMAGES.monogram}
              alt="Dimanche"
              className="h-9 w-[54px] sm:hidden"
              fittingType="fit"
            />
            {/* Dès qu'il y a de la place : le logo complet, l'inscription se lit. */}
            <Image
              src={IMAGES.logo}
              alt="Dimanche"
              className="hidden h-11 w-[75px] sm:block lg:h-14 lg:w-[96px]"
              fittingType="fit"
            />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
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
      <div
        className="h-[calc(72px+var(--banner-h,0px))] lg:h-[calc(80px+var(--banner-h,0px))]"
        aria-hidden="true"
      />
    </div>
  );
}