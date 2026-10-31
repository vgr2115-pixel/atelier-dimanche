import { Image } from '@/components/ui/image';
import Cta from '@/components/site/Cta';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const FACTS = [
  { value: '1 h 45 – 3 h', label: 'Selon l’atelier' },
  { value: '2 à 4', label: 'Personnes maximum' },
  { value: '55 € – 95 €', label: 'Tout compris' },
];

export default function WorkshopSection() {
  return (
    <section className="bg-ink py-20 text-cream lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="overflow-hidden">
            <Image
              src={IMAGES.atelierCeinture}
              alt="Une ceinture en cuir terminée, tenue au-dessus du tapis de découpe de l’atelier"
              className="aspect-[4/3] w-full lg:aspect-[4/5]"
              fittingType="fill"
            />
          </div>

          <div>
            <p className="eyebrow text-sand/80">Ateliers création · au 23 rue Burdeau</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] tracking-[-0.01em] text-cream sm:text-[2.8rem]">
              Venez couper, coudre,
              <span className="block italic text-sand">et repartir avec.</span>
            </h2>
            <p className="mt-6 max-w-[32rem] text-[15px] font-light leading-[1.8] text-cream/65">
              Ceinture, porte-monnaie ou boucles d’oreilles : on découpe, on perce, on coud. Le cuir,
              les outils et les finitions sont compris, et vous repartez avec votre pièce. Les trois
              ateliers abordent des gestes différents : vous pouvez les enchaîner.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-cream/15 py-6">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <p className="font-display text-[22px] leading-tight text-sand">{fact.value}</p>
                  <p className="mt-1 text-[10px] uppercase leading-relaxed tracking-[0.16em] text-cream/40">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Cta to="/ateliers" variant="sand">
                Voir les dates
              </Cta>
              <div className="space-y-1.5">
                <p className="text-[11px] uppercase leading-relaxed tracking-[0.16em] text-cream/40">
                  Mercredi soir, samedi matin et après-midi
                </p>
                <p className="text-[11px] font-light leading-relaxed text-cream/40">
                  Ici on fabrique : le cuir est fourni, vous repartez avec votre pièce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}