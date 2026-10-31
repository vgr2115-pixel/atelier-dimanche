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
import AdminField from '@/components/admin/AdminField';
import { inputClass } from '@/components/admin/formUtils';

const emptyForm = {
  name: '',
  date_label: '',
  context: '',
  text: '',
  is_published: true,
  position: 0,
};

export default function ReviewForm({ open, review, onClose, onSaved }) {
  const [form, setForm] = useState(() => ({ ...emptyForm, ...(review ?? {}) }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      setError('Le prénom et le témoignage sont obligatoires.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        date_label: form.date_label.trim(),
        context: form.context.trim(),
        text: form.text.trim(),
        is_published: form.is_published,
        position: Number(form.position) || 0,
      };
      if (review?.id) {
        await base44.entities.Review.update(review.id, payload);
      } else {
        await base44.entities.Review.create(payload);
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
            {review?.id ? 'Modifier l’avis' : 'Nouvel avis'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Prénom et initiale">
              <Input
                aria-label="Prénom et initiale"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className={inputClass}
                placeholder="Laurane D."
              />
            </AdminField>
            <AdminField label="Date affichée">
              <Input
                aria-label="Date affichée"
                value={form.date_label}
                onChange={(e) => set('date_label', e.target.value)}
                className={inputClass}
                placeholder="Avril 2025"
              />
            </AdminField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Contexte">
              <Input
                aria-label="Contexte de l’avis"
                value={form.context}
                onChange={(e) => set('context', e.target.value)}
                className={inputClass}
                placeholder="Atelier ceinture"
              />
            </AdminField>
            <AdminField label="Ordre d’affichage">
              <Input
                aria-label="Ordre d’affichage"
                type="number"
                value={form.position}
                onChange={(e) => set('position', e.target.value)}
                className={inputClass}
              />
            </AdminField>
          </div>

          <AdminField label="Témoignage" hint="Recopié mot pour mot, sans reformulation.">
            <Textarea
              aria-label="Témoignage"
              rows={6}
              value={form.text}
              onChange={(e) => set('text', e.target.value)}
              className={inputClass}
            />
          </AdminField>

          <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
            <span className="text-[12px] font-light text-ink/70">Afficher sur le site</span>
            <Switch
              checked={form.is_published}
              onCheckedChange={(value) => set('is_published', value)}
              aria-label="Afficher l’avis sur le site"
            />
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
              disabled={saving}
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