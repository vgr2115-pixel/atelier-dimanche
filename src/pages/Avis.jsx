import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Container from '@/components/site/Container';
import Cta from '@/components/site/Cta';
import { getPublishedReviews } from '@/api/catalog';
import { REVIEW_THEMES } from '@/components/reviews/reviews';

export default function Avis() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Avis clients — Dimanche, maroquinerie artisanale à Lyon';
    let active = true;
    getPublishedReviews(30)
      .then((data) => {
        if (active) setReviews(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="border-b border-ink/10 bg-cream pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <Container>
          <p className="eyebrow text-forest/80">Avis</p>
          <h1 className="mt-4 max-w-[24ch] font-display text-[2.1rem] leading-[1.1] tracking-[-0.02em] text-ink sm:max-w-[30ch] sm:text-[3rem] lg:text-[3.4rem]">
            Elles sont reparties
            <span className="block italic text-clay">avec leur pièce.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[15px] font-light leading-[1.75] text-ink/65">
            Les personnes qui ont suivi un atelier racontent. Les témoignages ci-dessous sont
            reproduits mot pour mot, tels qu’ils nous ont été confiés.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Cta to="/ateliers" className="w-full sm:w-auto">
              Réserver un atelier
            </Cta>
            <Cta to="/boutique" variant="outline" className="w-full sm:w-auto">
              Voir la boutique
            </Cta>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-14 lg:py-24">
        <Container>
          {loading ? (
            <p className="text-[13px] font-light text-ink/40">Chargement des avis…</p>
          ) : reviews.length === 0 ? (
            <p className="max-w-[34rem] text-[15px] font-light leading-[1.8] text-ink/55">
              Les premiers témoignages seront publiés ici prochainement.
            </p>
          ) : (
            <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <blockquote key={review.id} className="flex flex-col justify-between bg-cream p-6 sm:p-8">
                  <div>
                    {review.context && (
                      <p className="text-[10px] uppercase tracking-[0.18em] text-clay">
                        {review.context}
                      </p>
                    )}
                    <p className="mt-5 font-display text-[17px] leading-[1.8] text-ink/85">
                      « {review.text} »
                    </p>
                  </div>
                  <footer className="mt-7 border-t border-ink/10 pt-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-ink">{review.name}</p>
                    {review.date_label && (
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/50">
                        {review.date_label}
                      </p>
                    )}

                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-linen/60 py-14 lg:py-20">
        <Container>
          <h2 className="font-display text-[1.9rem] leading-[1.12] text-ink sm:text-[2.4rem]">
            Ce qu’ils disent,
            <span className="block italic text-clay">sans qu’on leur demande.</span>
          </h2>
          <ul className="mt-9 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {REVIEW_THEMES.map((theme) => (
              <li key={theme.title}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">{theme.title}</p>
                <p className="mt-2 text-[14px] font-light leading-[1.8] text-ink/60">{theme.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[38rem] text-[13px] font-light leading-relaxed text-ink/55">
            Ces avis portent sur les ateliers création. Dimanche ne met pas en place de notation
            chiffrée : les témoignages affichés sont ceux que les participants nous ont confiés, et
            nous les publions tels quels.
          </p>
        </Container>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <Container>
          <div className="max-w-[34rem]">
            <p className="eyebrow text-forest/80">Vous avez fabriqué ou acheté</p>
            <h2 className="mt-4 font-display text-[1.9rem] leading-[1.12] text-ink sm:text-[2.4rem]">
              Racontez votre pièce.
            </h2>
            <p className="mt-5 text-[15px] font-light leading-[1.8] text-ink/65">
              Un atelier suivi, une ceinture portée tous les jours, une réparation faite à l’atelier :
              votre retour aide les suivants à se lancer.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`mailto:marie@atelier-dimanche.fr?subject=Mon%20avis%20sur%20Dimanche`}
                className="inline-flex items-center justify-center gap-2 bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest"
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={1.4} />
                Écrire à l’atelier
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}