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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import AdminField from '@/components/admin/AdminField';
import { inputClass, slugify } from '@/components/admin/formUtils';

const CATEGORIES = ['Sacs', 'Bananes', 'Petite maroquinerie', 'Accessoires'];

const emptyForm = {
  name: '',
  slug: '',
  price: '',
  category: 'Sacs',
  leather: '',
  badge: '',
  short: '',
  description: '',
  details: '',
  dimensions: '',
  image: '',
  gallery: [],
  stock: 1,
  is_available: true,
  featured: false,
  position: 0,
};

const toForm = (product) =>
  product
    ? {
        ...emptyForm,
        ...product,
        price: product.price ?? '',
        details: (product.details ?? []).join('\n'),
        gallery: product.gallery ?? [],
        is_available: product.is_available !== false,
        featured: product.featured === true,
      }
    : { ...emptyForm };

export default function ProductForm({ open, product, onClose, onSaved }) {
  const [form, setForm] = useState(() => toForm(product));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const uploadFiles = async (files) => {
    setUploading(true);
    const urls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      urls.push(file_url);
    }
    setUploading(false);
    return urls;
  };

  const handleImage = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const [url] = await uploadFiles(files);
    if (url) set('image', url);
  };

  const handleGallery = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const urls = await uploadFiles(files);
    setForm((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
  };

  const removeGallery = (index) =>
    setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.price || !form.image) {
      setError('Le nom, le prix et la photo principale sont obligatoires.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name),
        price: Number(form.price),
        category: form.category,
        leather: form.leather,
        badge: form.badge,
        short: form.short,
        description: form.description,
        details: form.details
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
        dimensions: form.dimensions,
        image: form.image,
        gallery: form.gallery,
        stock: Number(form.stock) || 1,
        is_available: form.is_available,
        featured: form.featured,
        position: Number(form.position) || 0,
      };
      if (product?.id) {
        await base44.entities.Product.update(product.id, payload);
      } else {
        await base44.entities.Product.create(payload);
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
      <DialogContent className="max-h-[92vh] max-w-[720px] overflow-y-auto rounded-none border-ink/15 bg-cream">
        <DialogHeader>
          <DialogTitle className="font-display text-[22px] font-normal text-ink">
            {product?.id ? 'Modifier la pièce' : 'Nouvelle pièce'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Nom de la pièce">
              <Input
                aria-label="Nom de la pièce"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className={inputClass}
                placeholder="Sac Cabas Burdeau"
              />
            </AdminField>
            <AdminField label="Prix affiché (€)">
              <Input
                aria-label="Prix affiché en euros"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                className={inputClass}
                placeholder="240"
              />
            </AdminField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Catégorie">
              <Select value={form.category} onValueChange={(value) => set('category', value)}>
                <SelectTrigger aria-label="Catégorie" className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AdminField>
            <AdminField label="Cuir / matière">
              <Input
                aria-label="Cuir ou matière"
                value={form.leather}
                onChange={(e) => set('leather', e.target.value)}
                className={inputClass}
                placeholder="Cuir végétal, chute de grande maison"
              />
            </AdminField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Badge" hint="Vide, « Nouveau », « Pièce unique »… le badge « Vendu » est automatique.">
              <Input
                aria-label="Badge affiché sur la pièce"
                value={form.badge}
                onChange={(e) => set('badge', e.target.value)}
                className={inputClass}
                placeholder="Nouveau"
              />
            </AdminField>
            <AdminField label="Dimensions">
              <Input
                aria-label="Dimensions"
                value={form.dimensions}
                onChange={(e) => set('dimensions', e.target.value)}
                className={inputClass}
                placeholder="32 × 26 × 12 cm"
              />
            </AdminField>
          </div>

          <AdminField label="Phrase courte">
            <Input
              aria-label="Phrase courte de présentation"
              value={form.short}
              onChange={(e) => set('short', e.target.value)}
              className={inputClass}
              placeholder="Un cabas souple taillé dans une chute de cuir"
            />
          </AdminField>

          <AdminField label="Description">
            <Textarea
              aria-label="Description"
              rows={4}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className={inputClass}
            />
          </AdminField>

          <AdminField label="Détails" hint="Un détail par ligne : couture sellier, doublure, fermeture…">
            <Textarea
              aria-label="Détails de fabrication, un par ligne"
              rows={3}
              value={form.details}
              onChange={(e) => set('details', e.target.value)}
              className={inputClass}
            />
          </AdminField>

          <AdminField label="Photo principale" hint="JPG ou PNG, format portrait recommandé.">
            <div className="flex items-center gap-4">
              {form.image && (
                <Image
                  src={form.image}
                  alt="Photo principale"
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
                  aria-label="Choisir la photo principale"
                />
              </label>
            </div>
          </AdminField>

          <AdminField label="Photos complémentaires">
            <div className="flex flex-wrap items-center gap-3">
              {form.gallery.map((url, index) => (
                <div key={`${url}-${index}`} className="relative">
                  <Image
                    src={url}
                    alt="Photo complémentaire"
                    className="h-16 w-14 border border-ink/10"
                    fittingType="fill"
                  />
                  <button
                    type="button"
                    onClick={() => removeGallery(index)}
                    className="absolute -right-1.5 -top-1.5 bg-ink px-1.5 text-[10px] text-cream"
                    aria-label="Retirer cette photo"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="cursor-pointer border border-ink/25 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
                Ajouter
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGallery}
                  aria-label="Ajouter des photos complémentaires"
                />
              </label>
            </div>
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Stock">
              <Input
                aria-label="Stock disponible"
                type="number"
                min="1"
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
                className={inputClass}
              />
            </AdminField>
            <AdminField label="Ordre d’affichage" hint="Plus le chiffre est petit, plus la pièce apparaît tôt.">
              <Input
                aria-label="Ordre d’affichage"
                type="number"
                value={form.position}
                onChange={(e) => set('position', e.target.value)}
                className={inputClass}
              />
            </AdminField>
          </div>

          <div className="grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[12px] font-light text-ink/70">Pièce disponible à la vente</span>
              <Switch
                checked={form.is_available}
                onCheckedChange={(value) => set('is_available', value)}
                aria-label="Pièce disponible à la vente"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[12px] font-light text-ink/70">Mettre en avant</span>
              <Switch
                checked={form.featured}
                onCheckedChange={(value) => set('featured', value)}
                aria-label="Mettre la pièce en avant"
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