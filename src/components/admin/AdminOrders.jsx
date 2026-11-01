import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import AdminDeleteButton from '@/components/admin/AdminDeleteButton';
import { formatPrice } from '@/lib/format';

const STATUSES = [
  { value: 'recue', label: 'Reçue' },
  { value: 'payee', label: 'Payée' },
  { value: 'expediee', label: 'Expédiée' },
  { value: 'annulee', label: 'Annulée' },
];

const when = (value) =>
  value
    ? new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.Order.list('-created_date', 100);
    setOrders(Array.isArray(data) ? data : data?.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (order, status) => {
    await base44.entities.Order.update(order.id, { status });
    load();
  };

  const remove = async (id) => {
    await base44.entities.Order.delete(id);
    load();
  };

  return (
    <div>
      <p className="text-[13px] font-light leading-relaxed text-ink/55">
        {loading
          ? 'Chargement…'
          : `${orders.length} commande${orders.length > 1 ? 's' : ''} enregistrée${orders.length > 1 ? 's' : ''}`}
      </p>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement des commandes…</p>}
        {!loading && orders.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            Aucune commande pour l’instant. Les achats passés sur le site apparaîtront ici.
          </p>
        )}
        {orders.map((order) => (
          <article key={order.id} className="flex flex-col gap-4 py-6 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-linen px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-ink/60">
                  {order.reference || 'Sans référence'}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-ink/30">
                  {when(order.created_date)}
                </span>
                {order.gift && (
                  <span className="text-[9px] uppercase tracking-[0.16em] text-clay">Emballage cadeau</span>
                )}
              </div>
              <h3 className="mt-2 font-display text-[17px] text-ink">{order.customer_name}</h3>
              <p className="mt-1 text-[12px] font-light text-ink/50">
                <a href={`mailto:${order.customer_email}`} className="hover:text-ink">
                  {order.customer_email}
                </a>
                {order.customer_phone ? ` · ${order.customer_phone}` : ''}
              </p>
              <p className="mt-1 text-[12px] font-light leading-relaxed text-ink/45">
                {[order.address, order.postal_code, order.city].filter(Boolean).join(' · ') || 'Retrait à l’atelier'}
              </p>

              <ul className="mt-3 space-y-1">
                {(order.items || []).map((item, index) => (
                  <li key={index} className="text-[12px] font-light text-ink/65">
                    {item.quantity || 1} × {item.name} — {formatPrice((item.price || 0) * (item.quantity || 1))}
                  </li>
                ))}
              </ul>

              {order.notes && (
                <p className="mt-3 max-w-2xl whitespace-pre-line border-l-2 border-ink/10 pl-3 text-[12px] font-light italic leading-relaxed text-ink/55">
                  {order.notes}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3 lg:w-52">
              <p className="font-display text-[20px] text-ink">{formatPrice(order.total)}</p>
              <label className="w-full">
                <span className="text-[9px] uppercase tracking-[0.18em] text-ink/40">Statut</span>
                <select
                  value={order.status || 'recue'}
                  onChange={(event) => setStatus(order, event.target.value)}
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
                label="Supprimer la commande"
                description={`La commande ${order.reference || ''} de ${order.customer_name} sera retirée de la liste.`}
                onConfirm={() => remove(order.id)}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}