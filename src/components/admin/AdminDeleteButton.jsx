import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminDeleteButton({ label, description, onConfirm }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label={label}
          title={label}
          className="border border-ink/20 px-3 py-2 text-ink/50 transition-colors hover:border-destructive hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" strokeWidth={1.6} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-none border-ink/15 bg-cream">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-[20px] text-ink">
            Supprimer définitivement ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13px] font-light leading-relaxed text-ink/60">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none border-ink/20 text-[10px] uppercase tracking-[0.16em] text-ink/60">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-none bg-ink text-[10px] uppercase tracking-[0.16em] text-cream hover:bg-destructive"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}