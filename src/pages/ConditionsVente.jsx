import Container from '@/components/site/Container';

export default function ConditionsVente() {
  return (
    <div className="bg-cream">
      <Container className="py-16 lg:py-24">
        <p className="eyebrow text-forest/80">Informations légales</p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-ink sm:text-[3rem]">
          Conditions de vente
        </h1>

        <div className="mt-10 max-w-2xl space-y-8 text-[14px] font-light leading-[1.85] text-ink/65">
          <section>
            <h2 className="font-display text-xl text-ink">Commande</h2>
            <p className="mt-3">
              Les pièces proposées sont uniques ou réalisées en très petite série. La commande est
              enregistrée sur le site, puis confirmée par email avec un lien de paiement sécurisé.
              Aucun montant n’est prélevé avant cette confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Prix</h2>
            <p className="mt-3">
              Les prix sont indiqués en euros, toutes taxes comprises. Ils comprennent la matière, le
              temps de fabrication et l’emballage. Les frais de livraison sont ajoutés au moment de la
              commande.
            </p>
          </section>

          <section id="livraison">
            <h2 className="font-display text-xl text-ink">Livraison &amp; retours</h2>
            <p className="mt-3">
              Expédition sous 3 jours ouvrés en France métropolitaine (6,90 €), offerte dès 150
              d’achat. Le retrait à l’atelier-boutique, 23 rue Burdeau à Lyon 1ᵉʳ, est gratuit.
            </p>
            <p className="mt-3">
              Vous disposez de 14 jours après réception pour retourner une pièce non portée, dans son
              emballage d’origine. Le remboursement intervient sous 14 jours après réception du
              retour. Les pièces personnalisées ne sont pas reprises.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Ateliers</h2>
            <p className="mt-3">
              La réservation d’un atelier constitue une demande de place : elle est confirmée par email
              sous 24 h, avec le lien de paiement. Annulation possible jusqu’à 7 jours avant la date,
              avec report sur une autre session. Les ateliers accueillent 2 à 6 personnes, à partir de
              16 ans.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Garantie</h2>
            <p className="mt-3">
              Les coutures sont garanties à vie. Une retouche ou une réparation liée à l’usure normale
              peut être réalisée à l’atelier, sur rendez-vous.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}