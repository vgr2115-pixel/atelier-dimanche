import { Link } from 'react-router-dom';
import Container from '@/components/site/Container';

export default function MentionsLegales() {
  return (
    <div className="bg-cream">
      <Container className="py-16 lg:py-24">
        <p className="eyebrow text-forest/80">Informations légales</p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-ink sm:text-[3rem]">Mentions légales</h1>
        <p className="mt-4 max-w-2xl text-[13px] font-light leading-relaxed text-ink/55">
          Micro-entreprise Marie Bodilis, 23 rue Burdeau, 69001 Lyon — SIRET 795 268 812 00034.
          Dernière mise à jour : novembre 2026.
        </p>

        <div className="mt-10 max-w-2xl space-y-8 text-[14px] font-light leading-[1.85] text-ink/65">
          <section>
            <h2 className="font-display text-xl text-ink">Éditeur du site</h2>
            <p className="mt-3">
              Le site atelier-dimanche.fr est diffusé par la micro-entreprise Marie Bodilis,
              représentée par Marie Bodilis, artisan maroquinier.
              <br />
              23 rue Burdeau, 69001 Lyon, France.
              <br />
              SIRET : 795 268 812 00034.
              <br />
              TVA non applicable, article 293 B du Code général des impôts.
              <br />
              Contact : marie@atelier-dimanche.fr
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Directeur de la publication</h2>
            <p className="mt-3">Marie Bodilis, en qualité de responsable de la publication.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Activité</h2>
            <p className="mt-3">
              Création et fabrication artisanale de maroquinerie en cuir, vente en ligne et à
              l’atelier-boutique, ateliers d’initiation à la maroquinerie.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Hébergement</h2>
            <p className="mt-3">
              Ce site est hébergé sur la plateforme Base44 (www.base44.app). Les coordonnées de
              l’hébergeur peuvent être obtenues en écrivant à marie@atelier-dimanche.fr.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Propriété intellectuelle</h2>
            <p className="mt-3">
              L’ensemble des contenus du site (textes, photographies, créations, modèles, logo) est la
              propriété de Marie Bodilis et protégé par le droit d’auteur. Tous les textes et images du
              site sont réservés pour le monde entier au titre des droits d’auteur et de la propriété
              intellectuelle. Toute reproduction, même partielle, suppose une autorisation écrite
              préalable de Dimanche — Marie Bodilis.
            </p>
            <p className="mt-3">
              Crédits photo : les portraits d’atelier ont été réalisés par Rémy Lidereau pour
              Étonnantes (2019) ; la vidéo d’atelier par Fierce Productions (2021).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Données personnelles</h2>
            <p className="mt-3">
              Les informations transmises via les formulaires (commande, réservation d’atelier,
              contact, newsletter) servent uniquement à traiter votre demande, à préparer votre
              commande et, si vous y avez consenti, à vous informer des nouvelles pièces. Elles ne sont
              ni vendues ni transmises à des tiers en dehors des prestataires nécessaires au
              traitement du paiement et de la livraison.
            </p>
            <p className="mt-3">
              Vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition sur vos
              données. Pour l’exercer, écrivez à marie@atelier-dimanche.fr. En cas de désaccord, vous
              pouvez saisir la CNIL (www.cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Cookies</h2>
            <p className="mt-3">
              Le site ne dépose aucun cookie publicitaire ni traceur tiers. Seul le stockage local de
              votre navigateur conserve le contenu de votre panier entre deux visites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Vente en ligne</h2>
            <p className="mt-3">
              Les conditions de vente des pièces de maroquinerie et des ateliers — prix, commande,
              paiement, livraison, rétractation, entretien et litiges — sont détaillées dans les{' '}
              <Link
                to="/conditions-de-vente"
                className="border-b border-ink/25 pb-0.5 text-ink hover:border-ink"
              >
                conditions de vente
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Médiation de la consommation</h2>
            <p className="mt-3">
              Conformément aux articles L. 611-1 et suivants du code de la consommation, tout client
              particulier peut recourir gratuitement à un médiateur de la consommation en vue de la
              résolution amiable d’un litige, après avoir tenté de le résoudre directement auprès de
              l’atelier.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}