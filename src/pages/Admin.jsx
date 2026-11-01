import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import Container from '@/components/site/Container';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminWorkshops from '@/components/admin/AdminWorkshops';
import AdminReviews from '@/components/admin/AdminReviews';
import AdminMessages from '@/components/admin/AdminMessages';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminSubscribers from '@/components/admin/AdminSubscribers';
import AdminJournal from '@/components/admin/AdminJournal';

const TABS = [
  { key: 'produits', label: 'Pièces' },
  { key: 'ateliers', label: 'Ateliers' },
  { key: 'avis', label: 'Avis' },
  { key: 'coulisses', label: 'Coulisses' },
  { key: 'demandes', label: 'Demandes' },
  { key: 'commandes', label: 'Commandes' },
  { key: 'reservations', label: 'Réservations' },
  { key: 'abonnes', label: 'Newsletter' },
];

export default function Admin() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('produits');
  const [counts, setCounts] = useState({ demandes: 0, commandes: 0, reservations: 0 });

  useEffect(() => {
    if (user?.role !== 'admin') return;
    const loadCounts = async () => {
      const [demandes, commandes, reservations] = await Promise.all([
        base44.entities.Message.count({ is_read: false }),
        base44.entities.Order.count({ status: 'recue' }),
        base44.entities.Booking.count({ status: 'demande' }),
      ]);
      setCounts({ demandes, commandes, reservations });
    };
    loadCounts();
  }, [user, tab]);

  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ink/10 border-t-ink" />
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="max-w-md text-center">
          <p className="eyebrow text-forest/80">Espace de gestion</p>
          <h1 className="mt-4 font-display text-[26px] leading-tight text-ink">
            Cet espace est réservé à la gestion du site.
          </h1>
          <p className="mt-4 text-[14px] font-light leading-relaxed text-ink/60">
            Le compte {user.email} est connecté, mais il n’a pas les droits d’administration.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block border-b border-ink/25 pb-1 text-[11px] uppercase tracking-[0.2em] text-ink hover:border-ink"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-ink/10">
        <Container className="flex flex-col gap-5 py-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-forest/80">Dimanche · espace de gestion</p>
            <h1 className="mt-3 font-display text-[1.9rem] leading-tight text-ink sm:text-[2.3rem]">
              Le catalogue, les ateliers et les demandes
            </h1>
            <p className="mt-2 text-[12px] font-light text-ink/50">
              Connectée en tant que {user.email}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              Voir le site
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
              Se déconnecter
            </button>
          </div>
        </Container>
      </header>

      <Container className="py-8 lg:py-12">
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-ink/10">
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`-mb-px flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                tab === item.key
                  ? 'border-ink text-ink'
                  : 'border-transparent text-ink/45 hover:text-ink'
              }`}
            >
              {item.label}
              {counts[item.key] > 0 && (
                <span className="min-w-[16px] bg-forest px-1 py-0.5 text-center text-[9px] leading-none text-cream">
                  {counts[item.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'produits' && <AdminProducts />}
          {tab === 'ateliers' && <AdminWorkshops />}
          {tab === 'avis' && <AdminReviews />}
          {tab === 'coulisses' && <AdminJournal />}
          {tab === 'demandes' && <AdminMessages />}
          {tab === 'commandes' && <AdminOrders />}
          {tab === 'reservations' && <AdminBookings />}
          {tab === 'abonnes' && <AdminSubscribers />}
        </div>
      </Container>
    </div>
  );
}