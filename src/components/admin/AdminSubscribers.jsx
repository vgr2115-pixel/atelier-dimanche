import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import AdminDeleteButton from '@/components/admin/AdminDeleteButton';

const when = (value) =>
  value
    ? new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.Subscriber.list('-created_date', 300);
    setSubscribers(Array.isArray(data) ? data : data?.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await base44.entities.Subscriber.delete(id);
    load();
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(subscribers.map((item) => item.email).join(', '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-light leading-relaxed text-ink/55">
          {loading
            ? 'Chargement…'
            : `${subscribers.length} adresse${subscribers.length > 1 ? 's' : ''} inscrite${subscribers.length > 1 ? 's' : ''} à la lettre`}
        </p>
        <button
          type="button"
          onClick={copyAll}
          disabled={loading || subscribers.length === 0}
          className="inline-flex items-center gap-2 self-start border border-ink/20 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:border-ink hover:text-ink disabled:opacity-40"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" strokeWidth={1.8} />
              Adresses copiées
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" strokeWidth={1.6} />
              Copier les adresses
            </>
          )}
        </button>
      </div>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement des inscriptions…</p>}
        {!loading && subscribers.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            Aucune inscription pour l’instant. Le formulaire de la lettre se trouve en bas de chaque page.
          </p>
        )}
        {subscribers.map((subscriber) => (
          <div key={subscriber.id} className="flex items-center gap-4 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-light text-ink">{subscriber.email}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-ink/35">
                {when(subscriber.created_date)}
              </p>
            </div>
            <AdminDeleteButton
              label="Retirer l’adresse"
              description={`${subscriber.email} ne recevra plus la lettre de l’atelier.`}
              onConfirm={() => remove(subscriber.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}