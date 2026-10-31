import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import AdminField from '@/components/admin/AdminField';
import { inputClass, slugify } from '@/components/admin/formUtils';

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  duration: '',
  price: '',
  level: '',
  participants: '',
  image: '',
  includes: '',
  is_active: true,
  position: 0,
};

const toForm = (workshop) =>
  workshop
    ? {
        ...emptyForm,
        ...workshop,
        price: workshop.price ?? '',
        includes: (workshop.includes ?? []).join('\n'),
        is_active: workshop.is_active !== false,
      }
    : { ...emptyForm };

export default function WorkshopForm({ open, workshop, onClose, onSaved }) {
  const [form, setForm] = useState(() => toForm(workshop));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleImage = async (event) => {
    const [file] = Array.from(event.target.files ?? []);
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
    setUploading(false);
    set('image', file_url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.price) {
      setError('Le nom et le prix sont obligatoires.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name),
        description: form.description,
        duration: form.duration,
        price: Number(form.price),
        level: form.level,
        participants: form.participants,
        image: form.image,
        includes: form.includes
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
        is_active: form.is_active,
        position: Number(form.position) || 0,
      };
      if (workshop?.id) {
        await base44.entities.Workshop.update(workshop.id, payload);
      } else {
        await base44.entities.Workshop.create(payload);
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
      <DialogContent className="max-h-[92vh] max-w-[660px] overflow-y-auto rounded-none border-ink/15 bg-cream">
        <DialogHeader>
          <DialogTitle className="font-display text-[22px] font-normal text-ink">
            {workshop?.id ? 'Modifier l’atelier' : 'Nouvel atelier'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Nom de l’atelier">
              <Input
                aria-label="Nom de l’atelier"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className={inputClass}
                placeholder="Atelier ceinture"
              />
            </AdminField>
            <AdminField label="Prix par personne (€)">
              <Input
                aria-label="Prix par personne en euros"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                className={inputClass}
                placeholder="95"
              />
            </AdminField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Durée">
              <Input
                aria-label="Durée de l’atelier"
                value={form.duration}
                onChange={(e) => set('duration', e.target.value)}
                className={inputClass}
                placeholder="1 h 45"
              />
            </AdminField>
            <AdminField label="Niveau">
              <Input
                aria-label="Niveau requis"
                value={form.level}
                onChange={(e) => set('level', e.target.value)}
                className={inputClass}
                placeholder="Débutant"
              />
            </AdminField>
          </div>

          <AdminField label="Nombre de participants">
            <Input
              aria-label="Nombre de participants"
              value={form.participants}
              onChange={(e) => set('participants', e.target.value)}
              className={inputClass}
              placeholder="2 à 4 personnes"
            />
          </AdminField>

          <AdminField label="Description">
            <Textarea
              aria-label="Description de l’atelier"
              rows={4}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className={inputClass}
            />
          </AdminField>

          <AdminField label="Ce qui est compris" hint="Une ligne par élément.">
            <Textarea
              aria-label="Ce qui est compris, un élément par ligne"
              rows={3}
              value={form.includes}
              onChange={(e) => set('includes', e.target.value)}
              className={inputClass}
            />
          </AdminField>

          <AdminField label="Photo">
            <div className="flex items-center gap-4">
              {form.image && (
                <Image
                  src={form.image}
                  alt="Photo de l’atelier"
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
                  aria-label="Choisir la photo de l’atelier"
                />
              </label>
            </div>
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Ordre d’affichage">
              <Input
                aria-label="Ordre d’affichage"
                type="number"
                value={form.position}
                onChange={(e) => set('position', e.target.value)}
                className={inputClass}
              />
            </AdminField>
            <div className="flex items-center justify-between gap-4 self-end border-t border-ink/10 pt-4">
              <span className="text-[12px] font-light text-ink/70">Atelier proposé</span>
              <Switch
                checked={form.is_active}
                onCheckedChange={(value) => set('is_active', value)}
                aria-label="Atelier proposé à la réservation"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="text-[12px] font-light text-destructive">
              {error}
            </p>
          )}

          <DialogFooter className="gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-none text-[11px] uppercase tracking-[0.18em] text-ink/60"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={saving || uploading}
              className="rounded-none bg-ink text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-forest"
            >
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}