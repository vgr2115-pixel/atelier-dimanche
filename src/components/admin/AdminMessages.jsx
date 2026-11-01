import { useEffect, useState } from 'react';
import { Mail, MailOpen, Reply } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import AdminDeleteButton from '@/components/admin/AdminDeleteButton';

const when = (value) =>
  value
    ? new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyUnread, setOnlyUnread] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.Message.list('-created_date', 100);
    setMessages(Array.isArray(data) ? data : data?.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (message) => {
    await base44.entities.Message.update(message.id, { is_read: !message.is_read });
    load();
  };

  const remove = async (id) => {
    await base44.entities.Message.delete(id);
    load();
  };

  const unread = messages.filter((message) => !message.is_read).length;
  const shown = onlyUnread ? messages.filter((message) => !message.is_read) : messages;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-light leading-relaxed text-ink/55">
          {loading
            ? 'Chargement…'
            : `${messages.length} demande${messages.length > 1 ? 's' : ''} · ${unread} non lue${unread > 1 ? 's' : ''}`}
        </p>
        <button
          type="button"
          onClick={() => setOnlyUnread((value) => !value)}
          className={`self-start border px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors ${
            onlyUnread
              ? 'border-ink bg-ink text-cream'
              : 'border-ink/20 text-ink/60 hover:border-ink hover:text-ink'
          }`}
        >
          Non lues seulement
        </button>
      </div>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement des demandes…</p>}
        {!loading && shown.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            {onlyUnread
              ? 'Toutes les demandes sont lues.'
              : 'Aucune demande pour l’instant. Les messages du formulaire de contact arriveront ici.'}
          </p>
        )}
        {shown.map((message) => (
          <article key={message.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {!message.is_read && (
                  <span className="bg-forest px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-cream">
                    Nouveau
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-[0.16em] text-ink/45">
                  {message.subject || 'Demande'}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-ink/30">
                  {when(message.created_date)}
                </span>
              </div>
              <h3 className="mt-2 font-display text-[17px] text-ink">{message.name}</h3>
              <p className="mt-1 text-[12px] font-light text-ink/50">
                <a href={`mailto:${message.email}`} className="hover:text-ink">
                  {message.email}
                </a>
                {message.phone ? ` · ${message.phone}` : ''}
              </p>
              <p className="mt-3 max-w-2xl whitespace-pre-line text-[13px] font-light leading-relaxed text-ink/70">
                {message.body}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <a
                href={`mailto:${message.email}?subject=${encodeURIComponent(
                  `Atelier Dimanche — ${message.subject || 'votre demande'}`,
                )}`}
                className="inline-flex items-center gap-1.5 border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
              >
                <Reply className="h-3 w-3" strokeWidth={1.6} />
                Répondre
              </a>
              <button
                type="button"
                onClick={() => toggleRead(message)}
                className="inline-flex items-center gap-1.5 border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:border-ink hover:text-ink"
              >
                {message.is_read ? (
                  <>
                    <MailOpen className="h-3 w-3" strokeWidth={1.6} />
                    Non lue
                  </>
                ) : (
                  <>
                    <Mail className="h-3 w-3" strokeWidth={1.6} />
                    Lue
                  </>
                )}
              </button>
              <AdminDeleteButton
                label="Supprimer la demande"
                description={`La demande de ${message.name} sera retirée de la liste (l’email reçu reste dans votre boîte).`}
                onConfirm={() => remove(message.id)}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}