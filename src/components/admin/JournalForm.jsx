import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Image } from '@/components/ui/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import AdminField from '@/components/admin/AdminField';
import { inputClass } from '@/components/admin/formUtils';

const emptyForm = {
  title: '',
  date: new Date().toISOString().slice(0, 10),
  body: '',
  image: '',
  link_label: '',
  link_url: '',
  is_published: true,
  position: 0,
};

export default function JournalForm({ open, entry, onClose, onSaved }) {
  const [form, setForm] = useState(() => ({ ...emptyForm, ...(entry ?? {}) }));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      set('image', file_url);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.date || !form.image) {
      setError('Le titre, la date et la photo sont obligatoires.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        date: form.date,
        body: form.body.trim(),
        image: form.image,
        link_label: form.link_label.trim(),
        link_url: form.link_url.trim(),
        is_published: form.is_published,
        position: Number(form.position) || 0,
      };
      if (entry?.id) {
        await base44.entities.JournalEntry.update(entry.id, payload);
      } else {
        await base44.entities.JournalEntry.create(payload);
      }
      onSaved();
    } catch (err) {
      setError(err?.message || 'Enregistrement impossible. Réessayez.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-[640px] overflow-y-auto rounded-none border-ink/15 bg-cream">
        <DialogHeader>
          <DialogTitle className="font-display text-[22px] font-normal text-ink">
            {entry ? 'Modifier une arrivée' : 'Nouvelle arrivée'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Nom de la pièce">
              <Input
                value={form.title}
                onChange={(event) => set('title', event.target.value)}
                placeholder="Pochette Le Diben — les algues brunes"
                className={inputClass}
              />
            </AdminField>
            <AdminField label="Date">
              <Input
                type="date"
                value={form.date}
                onChange={(event) => set('date', event.target.value)}
                className={inputClass}
              />
            </AdminField>
          </div>

          <AdminField label="Note" hint="Deux phrases suffisent : la matière, le détail qui distingue la pièce.">
            <Textarea
              value={form.body}
              onChange={(event) => set('body', event.target.value)}
              rows={4}
              className={inputClass}
            />
          </AdminField>

          <AdminField label="Photo" hint="Format portrait 4:5 de préférence. (stored publicly — anyone with the link can open them)">
            <div className="flex items-center gap-4">
              {form.image && (
                <Image
                  src={form.image}
                  alt="Photo du journal"
                  className="h-20 w-16 border border-ink/10"
                  fittingType="fill"
                />
              )}
              <label className="cursor-pointer border border-ink/25 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
                {uploading ? 'Envoi…' : form.image ? 'Remplacer' : 'Choisir une photo'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                  aria-label="Choisir la photo du journal"
                />
              </label>
            </div>
          </AdminField>

          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Libellé du lien" hint="Facultatif — ex. « Voir la pièce ».">
              <Input
                value={form.link_label}
                onChange={(event) => set('link_label', event.target.value)}
                className={inputClass}
              />
            </AdminField>
            <AdminField label="Destination du lien" hint="Adresse interne (/produit/…) ou externe.">
              <Input
                value={form.link_url}
                onChange={(event) => set('link_url', event.target.value)}
                placeholder="/produit/pochette-le-diben-les-algues-brunes"
                className={inputClass}
              />
            </AdminField>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/60">
              <Switch
                checked={form.is_published}
                onCheckedChange={(value) => set('is_published', value)}
              />
              Publié sur le site
            </label>
            <AdminField label="Ordre">
              <Input
                type="number"
                value={form.position}
                onChange={(event) => set('position', event.target.value)}
                className={`${inputClass} w-24`}
              />
            </AdminField>
          </div>

          {error && <p className="text-[13px] font-light text-destructive">{error}</p>}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-none border-ink/20 text-[11px] uppercase tracking-[0.18em]"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={saving || uploading}
              className="rounded-none bg-ink text-[11px] uppercase tracking-[0.18em] text-cream hover:bg-forest"
            >
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}