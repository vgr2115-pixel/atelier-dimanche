import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { Image } from '@/components/ui/image';
import { IMAGES } from '@/lib/images';
import HeaderBanner from '@/components/site/HeaderBanner';
import MenuPanel from '@/components/site/MenuPanel';

// Version « menu replié » : l'icône à gauche ouvre le sommaire, le logo reste
// au centre. La version précédente (Header.jsx) est conservée dans le projet.
export default function HeaderBurger() {
  const { count, openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef(null);

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
    setOpen(false);
  }, [pathname]);

  return (
    <div style={{ '--banner-h': `${bannerHeight}px` }}>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || open
            ? 'border-b border-ink/10 bg-cream/90 backdrop-blur-md'
            : 'border-b border-transparent bg-cream/40 backdrop-blur-[2px]'
        }`}
      >
        <div ref={bannerRef}>
          <HeaderBanner />
        </div>

        <div className="relative mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:h-20 lg:px-16">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le sommaire"
            className="flex items-center gap-2.5 px-1 py-2 text-ink transition-opacity hover:opacity-60"
          >
            <Menu className="h-5 w-5 lg:h-[22px] lg:w-[22px]" strokeWidth={1.2} />
            <span className="hidden text-[10px] uppercase tracking-[0.24em] lg:inline">Menu</span>
          </button>

          <Link
            to="/"
            aria-label="Dimanche — Atelier Dimanche, accueil"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src={IMAGES.logo}
              alt="Dimanche"
              className="h-11 w-[75px] lg:h-14 lg:w-[96px]"
              fittingType="fit"
            />
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 px-1 py-2 text-ink transition-opacity hover:opacity-70"
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
        </div>
      </header>

      <div
        className="h-[calc(72px+var(--banner-h,0px))] lg:h-[calc(80px+var(--banner-h,0px))]"
        aria-hidden="true"
      />

      <MenuPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}