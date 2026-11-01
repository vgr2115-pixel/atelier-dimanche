import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import AdminDeleteButton from '@/components/admin/AdminDeleteButton';
import { formatPrice } from '@/lib/format';

const STATUSES = [
  { value: 'demande', label: 'Demande reçue' },
  { value: 'confirmee', label: 'Confirmée' },
  { value: 'annulee', label: 'Annulée' },
];

const when = (value) =>
  value
    ? new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.Booking.list('-created_date', 100);
    setBookings(Array.isArray(data) ? data : data?.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (booking, status) => {
    await base44.entities.Booking.update(booking.id, { status });
    load();
  };

  const remove = async (id) => {
    await base44.entities.Booking.delete(id);
    load();
  };

  return (
    <div>
      <p className="text-[13px] font-light leading-relaxed text-ink/55">
        {loading
          ? 'Chargement…'
          : `${bookings.length} réservation${bookings.length > 1 ? 's' : ''} d’atelier`}
      </p>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement des réservations…</p>}
        {!loading && bookings.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            Aucune réservation pour l’instant. Les inscriptions aux ateliers apparaîtront ici.
          </p>
        )}
        {bookings.map((booking) => (
          <article key={booking.id} className="flex flex-col gap-4 py-6 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-linen px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-ink/60">
                  {booking.reference || 'Sans référence'}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-ink/30">
                  Reçue le {when(booking.created_date)}
                </span>
              </div>
              <h3 className="mt-2 font-display text-[17px] text-ink">
                {booking.workshop_name || booking.workshop_slug}
              </h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-clay">
                {when(booking.session_date)} · {booking.session_time || '—'} ·{' '}
                {booking.participants || 1} personne{(booking.participants || 1) > 1 ? 's' : ''}
              </p>
              <p className="mt-2 text-[12px] font-light text-ink/50">
                {booking.customer_name} ·{' '}
                <a href={`mailto:${booking.customer_email}`} className="hover:text-ink">
                  {booking.customer_email}
                </a>
                {booking.customer_phone ? ` · ${booking.customer_phone}` : ''}
              </p>
              {booking.notes && (
                <p className="mt-3 max-w-2xl whitespace-pre-line border-l-2 border-ink/10 pl-3 text-[12px] font-light italic leading-relaxed text-ink/55">
                  {booking.notes}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3 lg:w-52">
              <p className="font-display text-[20px] text-ink">{formatPrice(booking.total)}</p>
              <label className="w-full">
                <span className="text-[9px] uppercase tracking-[0.18em] text-ink/40">Statut</span>
                <select
                  value={booking.status || 'demande'}
                  onChange={(event) => setStatus(booking, event.target.value)}
                  className="mt-1 w-full rounded-none border border-ink/20 bg-cream px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-ink focus:border-ink focus:outline-none"
                >
                  {STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </label>
              <AdminDeleteButton
                label="Supprimer la réservation"
                description={`La réservation de ${booking.customer_name} sera retirée de la liste. Pensez à libérer la place dans l’onglet Ateliers si besoin.`}
                onConfirm={() => remove(booking.id)}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}