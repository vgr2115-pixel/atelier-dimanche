import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Container from '@/components/site/Container';
import Cta from '@/components/site/Cta';
import AvisSection from '@/components/avis/AvisSection';
import { getPublishedReviews } from '@/api/catalog';

const ofType = (reviews, type) =>
  reviews.filter((review) => (review.type ?? 'atelier') === type);

export default function Avis() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Avis clients — Dimanche, maroquinerie artisanale à Lyon';
    let active = true;
    getPublishedReviews(60)
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

  const productReviews = ofType(reviews, 'produit');
  const workshopReviews = ofType(reviews, 'atelier');

  return (
    <>
      <section className="border-b border-ink/10 bg-cream pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <Container>
          <p className="eyebrow text-forest/80">Avis</p>
          <h1 className="mt-4 max-w-[26ch] font-display text-[2.1rem] leading-[1.1] tracking-[-0.02em] text-ink sm:max-w-[32ch] sm:text-[3rem] lg:text-[3.4rem]">
            Ce qu’on nous écrit
            <span className="block italic text-clay">après l’achat ou l’atelier.</span>
          </h1>
          <p className="mt-6 max-w-[36rem] text-[15px] font-light leading-[1.75] text-ink/65">
            Deux familles de témoignages, présentées séparément : celles et ceux qui sont repartis
            avec une pièce, et celles et ceux qui l’ont fabriquée à l’établi. Tous sont reproduits
            mot pour mot, tels qu’ils nous ont été confiés.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="#pieces"
              className="inline-flex items-center justify-center gap-2 border border-ink/25 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              Les avis sur les pièces
              {!loading && productReviews.length > 0 && (
                <span className="text-ink/40">{productReviews.length}</span>
              )}
            </a>
            <a
              href="#ateliers"
              className="inline-flex items-center justify-center gap-2 border border-ink/25 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              Les avis sur les ateliers
              {!loading && workshopReviews.length > 0 && (
                <span className="text-ink/40">{workshopReviews.length}</span>
              )}
            </a>
          </div>
        </Container>
      </section>

      <AvisSection
        id="pieces"
        eyebrow="Achats & pièces"
        title="Elles sont reparties"
        accent="avec leur pièce."
        intro="Des retours reçus après une commande : la matière, le poids, la façon dont la pièce vieillit. Les pièces étant uniques, certaines ne sont plus disponibles."
        note="Commandes expédiées depuis Lyon sous 3 à 4 jours, retrait possible à l’atelier-boutique."
        reviews={productReviews}
        loading={loading}
        empty="Les premiers retours d’achat seront publiés ici prochainement."
      />

      <div className="border-t border-ink/10 bg-linen/50 py-10 lg:py-12">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow text-forest/80">Ateliers création</p>
              <h2 className="mt-3 font-display text-[1.6rem] leading-[1.15] text-ink sm:text-[2rem]">
                Trois heures à l’établi,
                <span className="italic text-clay"> une pièce au bout.</span>
              </h2>
              <p className="mt-3 max-w-[36rem] text-[14px] font-light leading-[1.8] text-ink/60">
                Cuir, outils et patronage fournis. Les ateliers se font en très petit comité, sans
                prérequis — c’est souvent le premier geste de maroquinerie des participants.
              </p>
            </div>
            <Cta to="/ateliers" className="w-full shrink-0 sm:w-auto">
              Voir les dates
            </Cta>
          </div>
        </Container>
      </div>

      <AvisSection
        id="ateliers"
        eyebrow="Ateliers création"
        title="Elles ont cousu"
        accent="leur première ceinture."
        intro="Ce qui revient dans les retours d’atelier : les gestes transmis un par un, le petit nombre de places, et la pièce qu’on emporte le soir même."
        note="Ces avis portent sur les ateliers création. Dimanche ne met pas en place de notation chiffrée : les témoignages affichés sont ceux que les participants nous ont confiés, et nous les publions tels quels."
        reviews={workshopReviews}
        loading={loading}
        empty="Les premiers témoignages d’atelier seront publiés ici prochainement."
      />

      <section className="border-t border-ink/10 bg-cream py-14 lg:py-20">
        <Container>
          <div className="max-w-[34rem]">
            <p className="eyebrow text-forest/80">Vous avez fabriqué ou acheté</p>
            <h2 className="mt-4 font-display text-[1.9rem] leading-[1.12] text-ink sm:text-[2.4rem]">
              Racontez votre pièce.
            </h2>
            <p className="mt-5 text-[15px] font-light leading-[1.8] text-ink/65">
              Un atelier suivi, une ceinture portée tous les jours, une réparation faite à
              l’atelier : votre retour aide les suivants à se lancer.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="mailto:marie@atelier-dimanche.fr?subject=Mon%20avis%20sur%20Dimanche"
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