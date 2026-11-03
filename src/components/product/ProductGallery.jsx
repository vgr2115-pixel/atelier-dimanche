import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ProductGallery({ images, alt }) {
  const [index, setIndex] = useState(0);
  const list = images.filter(Boolean);

  if (!list.length) return null;

  const current = Math.min(index, list.length - 1);
  const go = (delta) => setIndex((current + delta + list.length) % list.length);

  return (
    <div>
      <div className="relative overflow-hidden bg-linen">
        <Image
          src={list[current]}
          alt={alt}
          className="aspect-[4/5] w-full"
          fittingType="fill"
        />
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-cream/85 p-2.5 text-ink backdrop-blur-sm transition-colors hover:bg-cream"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-cream/85 p-2.5 text-ink backdrop-blur-sm transition-colors hover:bg-cream"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.4} />
            </button>
            <span className="absolute right-3 top-3 bg-cream/85 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-ink/70">
              {current + 1} / {list.length}
            </span>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {list.map((src, position) => (
            <button
              key={`${src}-${position}`}
              type="button"
              onClick={() => setIndex(position)}
              aria-label={`Voir la photo ${position + 1}`}
              className={`shrink-0 overflow-hidden bg-linen transition-opacity ${
                position === current ? 'opacity-100 ring-1 ring-ink' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={alt}
                className="h-20 w-16"
                fittingType="fill"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}