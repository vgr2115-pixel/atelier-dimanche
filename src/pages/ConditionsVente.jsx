import { Link } from 'react-router-dom';
import Container from '@/components/site/Container';

export default function ConditionsVente() {
  return (
    <div className="bg-cream">
      <Container className="py-16 lg:py-24">
        <p className="eyebrow text-forest/80">Informations légales</p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-ink sm:text-[3rem]">
          Conditions de vente
        </h1>
        <p className="mt-4 max-w-2xl text-[13px] font-light leading-relaxed text-ink/55">
          Micro-entreprise Marie Bodilis, 23 rue Burdeau, 69001 Lyon — SIRET 795 268 812 00034.
          Dernière mise à jour : 2026.
        </p>

        <div className="mt-10 max-w-2xl space-y-8 text-[14px] font-light leading-[1.85] text-ink/65">
          <section>
            <h2 className="font-display text-xl text-ink">1. Objet</h2>
            <p className="mt-3">
              Les présentes conditions régissent les ventes en ligne des pièces de maroquinerie
              artisanale Dimanche ainsi que les réservations d’ateliers. Toute commande implique
              l’acceptation sans réserve de ces conditions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">2. Produits</h2>
            <p className="mt-3">
              Les pièces sont fabriquées à la main, à l’unité, à partir de cuirs issus de chutes et de
              sur-stocks de grandes maisons de maroquinerie ou de cuirs au tannage végétal. Chaque peau
              étant différente, de très légères variations de teinte, de grain ou de veines existent
              entre la photographie et la pièce reçue. Elles ne constituent pas un défaut.
            </p>
            <p className="mt-3">
              Les pièces sont proposées jusqu’à épuisement du stock. Une pièce vendue n’est en général
              pas réapprovisionnée : nous vous informons par email si un produit commandé n’est plus
              disponible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">3. Prix</h2>
            <p className="mt-3">
              Les prix sont indiqués en euros. TVA non applicable, article 293 B du Code général des
              impôts. Les frais de livraison
              apparaissent avant la validation de la commande. Le prix facturé est celui affiché au
              moment de l’enregistrement de la commande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">4. Commande et paiement</h2>
            <p className="mt-3">
              La commande est enregistrée sur le site, puis confirmée par email sous 24 heures. Le
              règlement s’effectue par carte bancaire sur une page de paiement sécurisée, dont le lien
              est adressé avec cette confirmation. Aucun montant n’est prélevé avant.
            </p>
          </section>

          <section id="livraison" className="scroll-mt-28">
            <h2 className="font-display text-xl text-ink">5. Livraison</h2>
            <p className="mt-3">
              Les pièces disponibles sont expédiées en lettre suivie sous 3 à 4 jours ouvrés après la
              commande ; les pièces volumineuses sont expédiées en Colissimo. Les délais d’acheminement
              de La Poste vont de 2 à 5 jours ouvrés.
            </p>
            <p className="mt-3">
              Le retrait gratuit à l’atelier-boutique, 23 rue Burdeau à Lyon 1ᵉʳ, est possible pendant
              les horaires d’ouverture.
            </p>
          </section>

          <section id="retours" className="scroll-mt-28">
            <h2 className="font-display text-xl text-ink">6. Rétractation et retours</h2>
            <p className="mt-3">
              Vous disposez de quatorze jours francs à compter de la réception pour exercer votre droit
              de rétractation, sans avoir à justifier de motif. Le délai qui expire un samedi, un
              dimanche ou un jour férié est prorogé au premier jour ouvrable suivant.
            </p>
            <p className="mt-3">
              La pièce doit être retournée en parfait état, non portée, dans son emballage d’origine ;
              les frais de retour restent à votre charge. Le retour donne lieu à un échange ou à un
              avoir d’un montant égal à la somme versée hors frais de port, dans un délai maximum de
              quatorze jours après réception de la pièce. Les produits sur mesure ou personnalisés ne
              sont pas repris.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">7. Entretien et réparation</h2>
            <p className="mt-3">
              Si une pièce métallique cède dans le cadre d’un usage normal, elle est remplacée sans
              frais. Les réparations et l’entretien se font à l’atelier, sur rendez-vous. Ce service
              reste disponible plusieurs années après l’achat :{' '}
              <Link to="/savoir-faire" className="border-b border-ink/25 pb-0.5 text-ink hover:border-ink">
                en savoir plus sur le savoir-faire
              </Link>
              .
            </p>
          </section>

          <section id="ateliers" className="scroll-mt-28">
            <h2 className="font-display text-xl text-ink">8. Ateliers</h2>
            <p className="mt-3">
              La réservation d’un atelier constitue une demande de place : elle est confirmée par email
              sous 24 heures, avec le lien de paiement. Les ateliers accueillent 2 à 4 personnes selon
              le modèle, à partir de 16 ans. Le cuir, les outils et les finitions sont compris.
            </p>
            <p className="mt-3">
              En cas d’empêchement, contactez l’atelier dès que possible : la place est reportée sur une
              autre session, dans la limite des disponibilités.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">9. Données personnelles</h2>
            <p className="mt-3">
              Les informations recueillies sont nécessaires au traitement des commandes et des
              réservations. Elles ne sont pas revendues. Vous pouvez demander leur consultation, leur
              rectification ou leur suppression à marie@atelier-dimanche.fr.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">10. Litiges</h2>
            <p className="mt-3">
              Les présentes conditions sont régies par le droit français. En cas de litige, une
              solution amiable sera recherchée en priorité ; à défaut, les tribunaux français sont
              compétents. Le client particulier peut également recourir gratuitement à un médiateur de
              la consommation.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}