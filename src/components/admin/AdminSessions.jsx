import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { inputClass } from '@/components/admin/formUtils';

const emptySession = { date: '', time: '', spots_total: 4, location: '23 rue Burdeau, 69001 Lyon' };

export default function AdminSessions({ workshop, sessions, onChanged }) {
  const [form, setForm] = useState(emptySession);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const list = sessions
    .filter((session) => session.workshop_slug === workshop.slug)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const addSession = async (event) => {
    event.preventDefault();
    if (!form.date || !form.time) {
      setError('Indiquez une date et une heure.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      await base44.entities.WorkshopSession.create({
        workshop_slug: workshop.slug,
        date: form.date,
        time: form.time,
        spots_total: Number(form.spots_total) || 1,
        spots_taken: 0,
        location: form.location,
      });
      setForm(emptySession);
      onChanged();
    } catch (err) {
      setError(err?.message || 'Ajout impossible.');
    } finally {
      setSaving(false);
    }
  };

  const removeSession = async (session) => {
    await base44.entities.WorkshopSession.delete(session.id);
    onChanged();
  };

  return (
    <div className="mt-5 border border-ink/10 bg-linen/40 p-4 sm:p-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-ink/45">Dates proposées</p>

      <div className="mt-3 divide-y divide-ink/10">
        {list.length === 0 && (
          <p className="py-3 text-[12px] font-light text-ink/45">
            Aucune date : l’atelier n’est pas réservable pour l’instant.
          </p>
        )}
        {list.map((session) => {
          const left = Math.max(0, (session.spots_total || 0) - (session.spots_taken || 0));
          const past = session.date < new Date().toISOString().slice(0, 10);
          return (
            <div key={session.id} className="flex flex-wrap items-center gap-3 py-2.5">
              <span className="text-[12px] capitalize text-ink">
                {new Date(session.date).toLocaleDateString('fr-FR', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'long',
                })}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink/50">
                {session.time}
              </span>
              <span className="text-[11px] text-ink/50">
                {left} place{left > 1 ? 's' : ''} libre{left > 1 ? 's' : ''} sur {session.spots_total}
                {session.spots_taken ? ` · ${session.spots_taken} réservée(s)` : ''}
              </span>
              {past && (
                <span className="bg-ink/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-ink/50">
                  Passée
                </span>
              )}
              <button
                type="button"
                onClick={() => removeSession(session)}
                className="ml-auto text-ink/40 transition-colors hover:text-destructive"
                aria-label={`Supprimer la date du ${session.date}`}
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          );
        })}
      </div>

      <form onSubmit={addSession} className="mt-4 flex flex-wrap items-end gap-2 border-t border-ink/10 pt-4">
        <div>
          <label htmlFor={`date-${workshop.slug}`} className="block text-[9px] uppercase tracking-[0.16em] text-ink/40">
            Date
          </label>
          <Input
            id={`date-${workshop.slug}`}
            type="date"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            className={`${inputClass} mt-1 w-[150px]`}
          />
        </div>
        <div>
          <label htmlFor={`time-${workshop.slug}`} className="block text-[9px] uppercase tracking-[0.16em] text-ink/40">
            Heure
          </label>
          <Input
            id={`time-${workshop.slug}`}
            value={form.time}
            onChange={(e) => set('time', e.target.value)}
            placeholder="09h30"
            className={`${inputClass} mt-1 w-[90px]`}
          />
        </div>
        <div>
          <label htmlFor={`spots-${workshop.slug}`} className="block text-[9px] uppercase tracking-[0.16em] text-ink/40">
            Places
          </label>
          <Input
            id={`spots-${workshop.slug}`}
            type="number"
            min="1"
            value={form.spots_total}
            onChange={(e) => set('spots_total', e.target.value)}
            className={`${inputClass} mt-1 w-[80px]`}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="border border-ink/25 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-40"
        >
          {saving ? 'Ajout…' : 'Ajouter la date'}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-2 text-[11px] font-light text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}