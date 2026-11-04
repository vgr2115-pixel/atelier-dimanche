import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AccessDenied from '@/components/site/AccessDenied';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Typography from '@/components/site/Typography';
import { CartProvider } from '@/components/cart/CartContext';
import SiteLayout from '@/components/site/SiteLayout';
// Add page imports here
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Admin from '@/pages/Admin';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Workshops from '@/pages/Workshops';
import SavoirFaire from '@/pages/SavoirFaire';
import Avis from '@/pages/Avis';
import Journal from '@/pages/Journal';
import SurMesure from '@/pages/SurMesure';
import Illustrations from '@/pages/Illustrations';
import Story from '@/pages/Story';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart';
import OrderConfirmation from '@/pages/OrderConfirmation';
import MentionsLegales from '@/pages/MentionsLegales';
import ConditionsVente from '@/pages/ConditionsVente';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin, user, isAuthenticated } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Seul le compte de l'atelier (admin) peut entrer : tout autre compte connecté est retenu.
  if (isAuthenticated && user && user.role !== 'admin') {
    return <AccessDenied />;
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/boutique" element={<Shop />} />
        <Route path="/produit/:slug" element={<ProductDetail />} />
        <Route path="/sur-mesure" element={<SurMesure />} />
        <Route path="/illustrations" element={<Illustrations />} />
        <Route path="/savoir-faire" element={<SavoirFaire />} />
        <Route path="/avis" element={<Avis />} />
        <Route path="/nouvelles-pieces" element={<Journal />} />
        <Route path="/ateliers" element={<Workshops />} />
        <Route path="/histoire" element={<Story />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/commande/confirmation" element={<OrderConfirmation />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/conditions-de-vente" element={<ConditionsVente />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        element={
          <ProtectedRoute
            unauthenticatedElement={<Navigate to="/login?returnTo=/admin" replace />}
          />
        }
      >
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Typography />
            <AuthenticatedApp />
          </Router>
        </CartProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App