import { Image } from '@/components/ui/image';
import { IMAGES } from '@/lib/images';

export default function StoryHero() {
  return (
    <>
      <p className="eyebrow text-forest/80">La marque</p>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <h1 className="max-w-3xl font-display text-[2.4rem] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            Dimanche, c’est le jour où l’on prend le temps
            <span className="block italic text-clay">de faire les choses soi-même.</span>
          </h1>
          <div className="mt-8 space-y-4 text-[15px] font-light leading-[1.85] text-ink/65">
            <p>
              Dimanche est né d’une bascule : graphiste-coloriste d’abord, maroquinière ensuite. Le
              goût des couleurs et le soin du détail viennent de là, comme l’envie de faire soi-même
              plutôt que de faire faire.
            </p>
            <p>
              Dimanche naît au printemps 2015, avec quelques pochettes vendues sur des salons de
              créateurs. En 2016, je passe mon CAP de maroquinerie pour apprendre ce qu’une semaine
              d’initiation ne pouvait pas donner : les montages, le parage, la machine, les finitions.
              Depuis, l’atelier a grandi sans jamais changer de principe : une seule paire de mains.
            </p>
          </div>
        </div>

        <figure>
          <div className="overflow-hidden bg-linen">
            <Image
              src={IMAGES.portraitAtelier}
              alt="Un cuir travaillé à la main dans l’atelier Dimanche, à Lyon"
              className="aspect-[4/5] w-full"
              fittingType="fill"
              focalPointY={0.35}
            />
          </div>
          <figcaption className="mt-3 text-[11px] font-light leading-relaxed text-ink/45">
            À l’atelier. Portrait : Rémy Lidereau, pour Étonnantes (2019).
          </figcaption>
        </figure>
      </div>
    </>
  );
}