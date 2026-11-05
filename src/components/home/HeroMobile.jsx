import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Cta from '@/components/site/Cta';
import { IMAGES } from '@/lib/images';

// Première impression sur mobile : l’image de l’atelier occupe l’écran,
// la promesse se lit par-dessus, l’action principale est à portée de pouce.
export default function HeroMobile() {
  return (
    <section className="lg:hidden">
      <div className="relative h-[68svh] max-h-[600px] min-h-[420px] overflow-hidden bg-linen">
        <Image
          src={IMAGES.hero}
          alt="L’atelier Dimanche, 23 rue Burdeau à Lyon"
          className="h-full w-full"
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.4}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-ink/85" />

        <div className="absolute inset-x-0 top-0 flex items-center gap-2 px-6 pt-5">
          <span className="h-1 w-1 rounded-full bg-sand" />
          <p className="text-[9px] uppercase tracking-[0.22em] text-cream/85">
            Atelier-boutique · Lyon 1ᵉʳ
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
          <h1 className="font-display text-[2.25rem] leading-[1.04] tracking-[-0.02em] text-cream">
            Maroquinerie artisanale
            <br />
            &amp; éco-responsable.
            <span className="mt-1 block italic text-sand">Fait main à Lyon.</span>
          </h1>
          <p className="mt-3.5 max-w-[19rem] text-[13px] font-light leading-[1.6] text-cream/75">
            Pièces uniques taillées dans des cuirs réemployés, cousues main dans l’atelier lyonnais.
          </p>
        </div>
      </div>

      <div className="px-6 pt-5">
        <Cta to="/boutique" className="w-full py-4">
          Voir les pièces disponibles
        </Cta>
        <Link
          to="/ateliers"
          className="mt-4 flex items-center justify-center gap-2 border-b border-ink/15 pb-2 text-[10px] uppercase tracking-[0.2em] text-ink/55 transition-colors hover:text-ink"
        >
          Réserver un atelier création
        </Link>
      </div>
    </section>
  );
}