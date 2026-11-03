import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import ProductForm from '@/components/admin/ProductForm';
import { inputClass } from '@/components/admin/formUtils';
import { formatPrice } from '@/lib/format';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [query, setQuery] = useState('');

  const needle = query.trim().toLowerCase();
  const filtered = needle
    ? products.filter((product) =>
        [product.name, product.category, product.leather, product.badge]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(needle)),
      )
    : products;

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.Product.list('position', 200);
    setProducts(asArray(data));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setFormOpen(true);
  };

  const toggleAvailability = async (product) => {
    await base44.entities.Product.update(product.id, { is_available: product.is_available === false });
    load();
  };

  const remove = async () => {
    if (!toDelete) return;
    await base44.entities.Product.delete(toDelete.id);
    setToDelete(null);
    load();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[13px] font-light leading-relaxed text-ink/55">
            {loading
              ? 'Chargement…'
              : `${filtered.length} pièce${filtered.length > 1 ? 's' : ''}${
                  needle ? ' trouvée' + (filtered.length > 1 ? 's' : '') : ' au catalogue'
                }`}
          </p>
        </div>
        <Button
          onClick={openNew}
          className="rounded-none bg-ink text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-forest"
        >
          <Plus className="mr-2 h-3.5 w-3.5" strokeWidth={1.6} />
          Nouvelle pièce
        </Button>
      </div>

      <div className="relative mt-6 max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/35"
          strokeWidth={1.6}
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Rechercher une pièce"
          placeholder="Rechercher une pièce, une catégorie, une matière…"
          className={`${inputClass} pl-9`}
        />
      </div>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement du catalogue…</p>}
        {!loading && filtered.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            {needle
              ? 'Aucune pièce ne correspond à cette recherche.'
              : 'Aucune pièce pour l’instant. Créez la première avec « Nouvelle pièce ».'}
          </p>
        )}
        {filtered.map((product) => {
          const sold = product.is_available === false;
          return (
            <div key={product.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
              <Image
                src={product.image}
                alt={product.name}
                className={`h-24 w-20 shrink-0 bg-linen ${sold ? 'opacity-60' : ''}`}
                fittingType="fill"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={`/produit/${product.slug}`}
                    className="font-display text-[16px] text-ink hover:text-clay"
                  >
                    {product.name}
                  </Link>
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] ${
                      sold ? 'bg-ink text-cream' : 'bg-forest/10 text-forest'
                    }`}
                  >
                    {sold ? 'Vendu' : 'En vente'}
                  </span>
                  {product.badge && !sold && (
                    <span className="bg-linen px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-ink/60">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink/45">
                  {product.category || '—'} · {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleAvailability(product)}
                  className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                >
                  {sold ? 'Remettre en vente' : 'Marquer vendu'}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(product)}
                  className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                >
                  <Pencil className="mr-1.5 inline h-3 w-3" strokeWidth={1.6} />
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => setToDelete(product)}
                  className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/50 transition-colors hover:border-destructive hover:text-destructive"
                  aria-label={`Supprimer ${product.name}`}
                >
                  <Trash2 className="h-3 w-3" strokeWidth={1.6} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {formOpen && (
        <ProductForm
          open={formOpen}
          product={editing}
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
              Supprimer cette pièce ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] font-light text-ink/60">
              « {toDelete?.name} » sera retirée du site. Si vous voulez seulement l’archiver,
              préférez « Marquer vendu ».
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