import Container from '@/components/site/Container';

export default function MentionsLegales() {
  return (
    <div className="bg-cream">
      <Container className="py-16 lg:py-24">
        <p className="eyebrow text-forest/80">Informations légales</p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-ink sm:text-[3rem]">Mentions légales</h1>

        <div className="mt-10 max-w-2xl space-y-8 text-[14px] font-light leading-[1.85] text-ink/65">
          <section>
            <h2 className="font-display text-xl text-ink">Éditeur du site</h2>
            <p className="mt-3">
              Atelier Dimanche — maroquinerie artisanale, entreprise individuelle représentée par Marie
              Bodilis.
              <br />
              23 rue Burdeau, 69001 Lyon, France.
              <br />
              Contact : marie@atelier-dimanche.fr
              <br />
              Numéro SIRET : à compléter.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Hébergement</h2>
            <p className="mt-3">
              Le site est hébergé sur la plateforme Base44. Les photographies et textes sont la
              propriété de l’Atelier Dimanche.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Propriété intellectuelle</h2>
            <p className="mt-3">
              L’ensemble des contenus du site (textes, photographies, créations, modèles) est protégé
              par le droit d’auteur. Toute reproduction, même partielle, est interdite sans accord
              écrit préalable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Données personnelles</h2>
            <p className="mt-3">
              Les informations transmises via les formulaires (commande, atelier, contact, newsletter)
              servent uniquement à traiter votre demande et à vous informer des actualités de
              l’atelier si vous y avez consenti. Elles ne sont jamais vendues ni transmises à des tiers.
              Vous pouvez demander leur suppression à tout moment à marie@atelier-dimanche.fr.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Cookies</h2>
            <p className="mt-3">
              Le site ne dépose aucun cookie publicitaire. Seul le stockage local du navigateur est
              utilisé pour conserver le contenu de votre panier entre deux visites.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}