import { useEffect, useState } from 'react';
import { Plus, Pencil, CalendarDays } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import WorkshopForm from '@/components/admin/WorkshopForm';
import AdminSessions from '@/components/admin/AdminSessions';
import { formatPrice } from '@/lib/format';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openSessions, setOpenSessions] = useState(null);

  const load = async () => {
    setLoading(true);
    const [workshopData, sessionData] = await Promise.all([
      base44.entities.Workshop.list('position', 50),
      base44.entities.WorkshopSession.list('date', 200),
    ]);
    setWorkshops(asArray(workshopData));
    setSessions(asArray(sessionData));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (workshop) => {
    setEditing(workshop);
    setFormOpen(true);
  };

  const toggleActive = async (workshop) => {
    await base44.entities.Workshop.update(workshop.id, { is_active: workshop.is_active === false });
    load();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-light leading-relaxed text-ink/55">
          {loading
            ? 'Chargement…'
            : `${workshops.length} atelier${workshops.length > 1 ? 's' : ''} · ${sessions.length} date${sessions.length > 1 ? 's' : ''} au calendrier`}
        </p>
        <Button
          onClick={openNew}
          className="rounded-none bg-ink text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-forest"
        >
          <Plus className="mr-2 h-3.5 w-3.5" strokeWidth={1.6} />
          Nouvel atelier
        </Button>
      </div>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement des ateliers…</p>}
        {!loading && workshops.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            Aucun atelier. Créez le premier avec « Nouvel atelier ».
          </p>
        )}
        {workshops.map((workshop) => {
          const active = workshop.is_active !== false;
          const count = sessions.filter((session) => session.workshop_slug === workshop.slug).length;
          return (
            <div key={workshop.id} className="py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Image
                  src={workshop.image}
                  alt={workshop.name}
                  className={`h-20 w-24 shrink-0 bg-linen ${active ? '' : 'opacity-60'}`}
                  fittingType="fill"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-[16px] text-ink">{workshop.name}</p>
                    <span
                      className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] ${
                        active ? 'bg-forest/10 text-forest' : 'bg-linen text-ink/50'
                      }`}
                    >
                      {active ? 'Proposé' : 'Retiré'}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink/45">
                    {formatPrice(workshop.price)} / personne
                    {workshop.duration ? ` · ${workshop.duration}` : ''}
                    {` · ${count} date${count > 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenSessions(openSessions === workshop.id ? null : workshop.id)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                  >
                    <CalendarDays className="mr-1.5 inline h-3 w-3" strokeWidth={1.6} />
                    {openSessions === workshop.id ? 'Masquer les dates' : 'Dates'}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(workshop)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                  >
                    <Pencil className="mr-1.5 inline h-3 w-3" strokeWidth={1.6} />
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleActive(workshop)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/50 transition-colors hover:border-ink hover:text-ink"
                  >
                    {active ? 'Retirer' : 'Proposer'}
                  </button>
                </div>
              </div>

              {openSessions === workshop.id && (
                <AdminSessions workshop={workshop} sessions={sessions} onChanged={load} />
              )}
            </div>
          );
        })}
      </div>

      {formOpen && (
        <WorkshopForm
          open={formOpen}
          workshop={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            load();
          }}
        />
      )}
    </div>
  );
}