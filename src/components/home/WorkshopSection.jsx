import { Image } from '@/components/ui/image';
import Cta from '@/components/site/Cta';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/catalog';

const FACTS = [
  { value: '3 h', label: 'Le temps qu’il faut' },
  { value: '6', label: 'Participants maximum' },
  { value: '1', label: 'Ceinture à emporter' },
];

export default function WorkshopSection() {
  return (
    <section className="bg-ink py-20 text-cream lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="overflow-hidden">
            <Image
              src={IMAGES.atelierCeinture}
              alt="Une participante perçant une ceinture en cuir dans l’atelier"
              className="aspect-[4/3] w-full lg:aspect-[4/5]"
              fittingType="fill"
            />
          </div>

          <div>
            <p className="eyebrow text-sand/80">Les ateliers</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] tracking-[-0.01em] text-cream sm:text-[2.8rem]">
              Trois heures pour repartir
              <span className="block italic text-sand">avec votre ceinture.</span>
            </h2>
            <p className="mt-6 max-w-[32rem] text-[15px] font-light leading-[1.8] text-cream/65">
              En petit comité, dans l’atelier-boutique : la découpe du cuir, la couture à la main,
              le travail des tranches. Aucun prérequis, tous les outils sont fournis, et le cuir
              vient de nos chutes de grandes maisons.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-cream/15 py-6">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <p className="font-display text-[26px] text-sand">{fact.value}</p>
                  <p className="mt-1 text-[10px] uppercase leading-relaxed tracking-[0.16em] text-cream/40">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta to="/ateliers" variant="sand">
                Réserver mon atelier
              </Cta>
              <p className="text-[11px] uppercase tracking-[0.16em] text-cream/40">
                120 € · dates chaque semaine
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}