import { Outlet } from 'react-router-dom';
// Variante « icône à gauche, logo centré » : repasser sur Header pour la version précédente.
import Header from '@/components/site/HeaderBurger';
import Footer from '@/components/site/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}