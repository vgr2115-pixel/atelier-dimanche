import { Link } from 'react-router-dom';

export default function IdentityBlock() {
  return (
    <section className="border-t border-ink/10 py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="eyebrow text-forest/80">Qui vous répond</p>
          <p className="mt-3 font-display text-[18px] text-ink">Marie Bodilis</p>
          <p className="mt-1 text-[12px] font-light leading-relaxed text-ink/55">
            Artisan maroquinier, fondatrice de Dimanche
          </p>
        </div>
        <div>
          <p className="eyebrow text-forest/80">L’atelier</p>
          <address className="mt-3 space-y-0.5 text-[12px] font-light not-italic leading-relaxed text-ink/55">
            <p>23 rue Burdeau</p>
            <p>69001 Lyon, France</p>
          </address>
        </div>
        <div>
          <p className="eyebrow text-forest/80">Statut</p>
          <p className="mt-3 text-[12px] font-light leading-relaxed text-ink/55">
            Micro-entreprise Marie Bodilis
            <br />
            SIRET 795 268 812 00034
          </p>
        </div>
        <div>
          <p className="eyebrow text-forest/80">Écrire</p>
          <a
            href="mailto:marie@atelier-dimanche.fr"
            className="mt-3 inline-block border-b border-ink/25 pb-0.5 text-[12px] font-light text-ink/70 transition-colors hover:border-ink hover:text-ink"
          >
            marie@atelier-dimanche.fr
          </a>
          <p className="mt-3 text-[12px] font-light leading-relaxed text-ink/50">
            <Link to="/mentions-legales" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
              Mentions légales
            </Link>{' '}
            ·{' '}
            <Link to="/conditions-de-vente" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
              CGV
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}