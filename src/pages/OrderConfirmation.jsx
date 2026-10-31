import { Link, useSearchParams } from 'react-router-dom';
import { Check, Mail, MapPin } from 'lucide-react';
import Container from '@/components/site/Container';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref') ?? '';

  return (
    <div className="bg-cream">
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10">
            <Check className="h-5 w-5 text-forest" strokeWidth={1.6} />
          </div>
          <p className="eyebrow mt-6 text-forest/80">Commande reçue</p>
          <h1 className="mt-3 font-display text-[2.2rem] leading-[1.1] text-ink sm:text-[2.8rem]">
            Merci, votre commande est enregistrée.
          </h1>
          {reference && (
            <p className="mt-4 inline-block border border-ink/15 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-ink/60">
              Référence {reference}
            </p>
          )}
          <p className="mt-6 text-[15px] font-light leading-[1.8] text-ink/65">
            Votre pièce est préparée à l’atelier. Vous recevez sous 24 h un lien de paiement sécurisé,
            puis un email d’expédition dès que le colis part de l’atelier.
          </p>

          <div className="mt-8 space-y-4 border-y border-ink/10 py-6 text-[13px] font-light text-ink/60">
            <p className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              Un doute sur votre commande ? Répondez directement à l’email de confirmation ou écrivez
              à marie@atelier-dimanche.fr.
            </p>
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              Retrait possible à l’atelier-boutique, 23 rue Burdeau, Lyon 1ᵉʳ — mercredi, jeudi,
              vendredi et samedi après-midi.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/boutique"
              className="inline-flex bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream hover:bg-forest"
            >
              Continuer la visite
            </Link>
            <Link
              to="/ateliers"
              className="inline-flex border border-ink/20 px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-ink hover:bg-ink hover:text-cream"
            >
              Offrir un atelier
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}