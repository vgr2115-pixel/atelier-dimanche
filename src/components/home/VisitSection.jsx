import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const HOURS = [
  ['Mercredi', '14h – 19h'],
  ['Jeudi', '14h – 18h'],
  ['Vendredi', '14h – 19h'],
  ['Samedi', '14h – 18h'],
];

export default function VisitSection() {
  return (
    <section className="border-t border-ink/10 bg-linen py-14 lg:py-28">
      <Container>
        <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <p className="eyebrow text-forest/80">L’atelier-boutique</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
              23 rue Burdeau,
              <span className="block italic text-clay">Lyon 1ᵉʳ.</span>
            </h2>
            <p className="mt-6 max-w-[30rem] text-[15px] font-light leading-[1.8] text-ink/65">
              Vous hésitez entre deux cuirs, vous voulez voir la teinte en vrai ou parler d’un projet ?
              Passez pendant les horaires d’ouverture, ou prenez rendez-vous à un autre moment. C’est
              aussi ici que les pièces sont réparées et entretenues.
            </p>

            <div className="mt-8 grid gap-6 border-t border-ink/10 pt-7 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink">Adresse</p>
                  <p className="mt-1 text-[13px] font-light leading-relaxed text-ink/55">
                    23 rue Burdeau
                    <br />
                    69001 Lyon
                  </p>
                  <a
                    href="https://maps.google.com/?q=23+rue+Burdeau+69001+Lyon"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block border-b border-ink/25 pb-0.5 text-[11px] uppercase tracking-[0.14em] text-ink/70 hover:border-ink hover:text-ink"
                  >
                    Voir sur la carte
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink">Ouverture</p>
                  <ul className="mt-1 space-y-0.5 text-[13px] font-light text-ink/55">
                    {HOURS.map(([day, time]) => (
                      <li key={day} className="flex justify-between gap-4">
                        <span>{day}</span>
                        <span className="tabular-nums">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="mailto:marie@atelier-dimanche.fr?subject=Rendez-vous%20%C3%A0%20l%27atelier"
                className="inline-flex items-center justify-center bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest"
              >
                Prendre rendez-vous
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[11px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:border-ink hover:text-ink"
              >
                Écrire à l’atelier
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden bg-cream">
            <Image
              src={IMAGES.boutique}
              alt="La vitrine de l’atelier-boutique Dimanche, 23 rue Burdeau à Lyon"
              className="aspect-[3/2] w-full"
              fittingType="fill"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}