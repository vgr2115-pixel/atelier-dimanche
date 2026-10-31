import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
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
import ReviewForm from '@/components/admin/ReviewForm';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.Review.list('position', 100);
    setReviews(asArray(data));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (review) => {
    setEditing(review);
    setFormOpen(true);
  };

  const togglePublished = async (review) => {
    await base44.entities.Review.update(review.id, { is_published: review.is_published === false });
    load();
  };

  const remove = async () => {
    if (!toDelete) return;
    await base44.entities.Review.delete(toDelete.id);
    setToDelete(null);
    load();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-light leading-relaxed text-ink/55">
          {loading
            ? 'Chargement…'
            : `${reviews.length} avis · ${reviews.filter((r) => r.is_published !== false).length} affiché(s) sur le site`}
        </p>
        <Button
          onClick={openNew}
          className="rounded-none bg-ink text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-forest"
        >
          <Plus className="mr-2 h-3.5 w-3.5" strokeWidth={1.6} />
          Nouvel avis
        </Button>
      </div>

      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {loading && <p className="py-10 text-[13px] font-light text-ink/40">Chargement des avis…</p>}
        {!loading && reviews.length === 0 && (
          <p className="py-10 text-[13px] font-light text-ink/45">
            Aucun avis enregistré. Ajoutez un témoignage avec sa source.
          </p>
        )}
        {reviews.map((review) => {
          const published = review.is_published !== false;
          return (
            <div key={review.id} className="py-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">{review.name}</p>
                <span
                  className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] ${
                    published ? 'bg-forest/10 text-forest' : 'bg-linen text-ink/50'
                  }`}
                >
                  {published ? 'Publié' : 'Masqué'}
                </span>
                {review.context && (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink/40">
                    {review.context}
                  </span>
                )}
                {review.date_label && (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink/40">
                    {review.date_label}
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-[52rem] font-display text-[15px] leading-[1.7] text-ink/80">
                « {review.text} »
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {review.source_url ? (
                  <a
                    href={review.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-ink/50 hover:text-ink"
                  >
                    {review.source_label}
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                  </a>
                ) : (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink/50">
                    {review.source_label}
                  </span>
                )}
                <span className="ml-auto flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublished(review)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                  >
                    {published ? 'Masquer' : 'Publier'}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(review)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                  >
                    <Pencil className="mr-1.5 inline h-3 w-3" strokeWidth={1.6} />
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setToDelete(review)}
                    className="border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/50 transition-colors hover:border-destructive hover:text-destructive"
                    aria-label={`Supprimer l’avis de ${review.name}`}
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
        Seuls les avis publiés apparaissent sur{' '}
        <Link to="/avis" className="underline decoration-ink/25 hover:text-ink">
          la page Avis
        </Link>{' '}
        et sur l’accueil. La source est obligatoire : publier un témoignage inventé est sanctionnable.
      </p>

      {formOpen && (
        <ReviewForm
          open={formOpen}
          review={editing}
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
              Supprimer cet avis ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] font-light text-ink/60">
              Le témoignage de {toDelete?.name} sera définitivement retiré. Pour le cacher
              temporairement, préférez « Masquer ».
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