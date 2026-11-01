import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import JournalForm from '@/components/admin/JournalForm';
import { selectHomeEntries } from '@/lib/journal';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function AdminJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [settingsId, setSettingsId] = useState(null);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.JournalEntry.list('-date', 100);
    setEntries(asArray(data));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    base44.entities.SiteSettings.list('created_date', 1).then((data) => {
      const current = asArray(data)[0];
      if (current) {
        setSettingsId(current.id);
        setSectionEnabled(current.journal_enabled !== false);
      }
    });
  }, []);

  const toggleSection = async (value) => {
    setSectionEnabled(value);
    if (settingsId) {
      await base44.entities.SiteSettings.update(settingsId, { journal_enabled: value });
    } else {
      const created = await base44.entities.SiteSettings.create({ journal_enabled: value });
      setSettingsId(created.id);
    }
  };

  const togglePublished = async (entry) => {
    await base44.entities.JournalEntry.update(entry.id, { is_published: entry.is_published === false });
    load();
  };

  const published = entries.filter((entry) => entry.is_published !== false);
  const homeIds = new Set(selectHomeEntries(published, 3).map((entry) => entry.id));

  const remove = async () => {
    if (!toDelete) return;
    await base44.entities.JournalEntry.delete(toDelete.id);
    setToDelete(null);
    load();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border border-ink/15 bg-linen/40 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink">
            Section « Nouvelles pièces » sur l’accueil
          </p>
          <p className="mt-1.5 text-[12px] font-light leading-relaxed text-ink/50">
            {sectionEnabled
              ? 'Visible. Les trois dernières pièces distinctes publiées s’affichent après la section « L’atelier ».'
              : 'Masquée. La section disparaît de l’accueil ; le contenu reste enregistré.'}
          </p>
        </div>
        <label className="flex shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/70">
          <Switch checked={sectionEnabled} onCheckedChange={toggleSection} />
          {sectionEnabled ? 'Affichée' : 'Masquée'}
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-light leading-relaxed text-ink/55">
          {loading
            ? 'Chargement…'
            : `${entries.length} arrivée(s) · ${entries.filter((e) => e.is_published !== false).length} en ligne`}
        </p>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="rounded-none bg-ink text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-forest"
        >
          <Plus className="mr-2 h-3.5 w-3.5" strokeWidth={1.6} />
          Nouvelle arrivée
        </Button>
      </div>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement du journal…</p>}
        {!loading && entries.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            Aucune arrivée pour l’instant. Ajoutez la première pièce dès sa mise en ligne.
          </p>
        )}
        {entries.map((entry) => {
          const isLive = entry.is_published !== false;
          return (
            <div key={entry.id} className="py-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-clay">
                  {formatDate(entry.date)}
                </p>
                <span
                  className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] ${
                    isLive ? 'bg-forest/10 text-forest' : 'bg-linen text-ink/50'
                  }`}
                >
                  {isLive ? (homeIds.has(entry.id) ? 'Sur l’accueil' : 'En réserve') : 'Masqué'}
                </span>
              </div>
              <p className="mt-2 font-display text-[17px] leading-snug text-ink">{entry.title}</p>
              {entry.body && (
                <p className="mt-2 max-w-[52rem] text-[13px] font-light leading-relaxed text-ink/55">
                  {entry.body}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {entry.link_url && (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink/40">
                    Lien : {entry.link_url}
                  </span>
                )}
                <span className="ml-auto flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublished(entry)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                  >
                    {published ? 'Masquer' : 'Publier'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(entry);
                      setFormOpen(true);
                    }}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                  >
                    <Pencil className="mr-1.5 inline h-3 w-3" strokeWidth={1.6} />
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setToDelete(entry)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/50 transition-colors hover:border-destructive hover:text-destructive"
                    aria-label={`Supprimer ${entry.title}`}
                  >
                    <Trash2 className="h-3 w-3" strokeWidth={1.6} />
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-[12px] font-light leading-relaxed text-ink/45">
        L’accueil affiche au maximum trois pièces distinctes, les plus récentes : deux finitions du
        même modèle n’occupent qu’une place. Les autres restent « en réserve » et apparaissent dans
        la section « Nouvelles pièces » de{' '}
        <Link to="/" className="underline decoration-ink/25 hover:text-ink">
          l’accueil
        </Link>{' '}
        dès qu’une place se libère, avec la mention « Nouveau » pendant trois semaines.
      </p>

      {formOpen && (
        <JournalForm
          open={formOpen}
          entry={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            load();
          }}
        />
      )}

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(value) => !value && setToDelete(null)}>
        <AlertDialogContent className="rounded-none border-ink/15 bg-cream">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-[20px] font-normal text-ink">
              Supprimer cette page ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] font-light text-ink/60">
              « {toDelete?.title} » sera définitivement retiré. Pour la cacher temporairement,
              préférez « Masquer ».
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-none text-[11px] uppercase tracking-[0.18em]">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={remove}
              className="rounded-none bg-destructive text-[11px] uppercase tracking-[0.18em] text-cream hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}