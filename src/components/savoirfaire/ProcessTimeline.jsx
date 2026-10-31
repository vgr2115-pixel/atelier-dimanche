import { Image } from '@/components/ui/image';
import { IMAGES } from '@/lib/images';

const STEPS = [
  {
    title: 'Sélection des peaux',
    text: 'Je choisis chaque peau dans les chutes et sur-stocks de grandes maisons de maroquinerie, à la sensation et au coup de cœur. Une peau ne se remplace pas : elle décide du modèle, de la couleur et de la quantité.',
  },
  {
    title: 'Patronage et tracé',
    text: 'Le modèle est dessiné, puis le patron tracé à la main sur l’envers du cuir. C’est l’étape qui détermine la tenue de la pièce : un centimètre mal placé et le sac tombe mal.',
  },
  {
    title: 'Découpe',
    text: 'Découpe au tranchefil, à la règle et au geste. Je travaille dans le sens de la peau, en évitant les zones plus souples, pour que la pièce ne se déforme pas à l’usage.',
  },
  {
    title: 'Parage et refente',
    text: 'Les épaisseurs sont réduites là où les coutures se croisent, pour éviter les surépaisseurs. C’est invisible sur une photo, et pourtant c’est ce qui fait la différence à l’usage.',
  },
  {
    title: 'Couture au point sellier',
    text: 'Deux aiguilles, un fil de lin ciré, un point régulier et incliné. La couture est serrée à la main, noœud caché entre deux épaisseurs : elle ne se détricote pas.',
  },
  {
    title: 'Marquage, tranches, contrôle',
    text: 'Logo marqué à chaud au fer, tranches teintées puis lustrées une à une, pièce retournée et vérifiée en main. Si un détail me déplaît, je recommence.',
  },
];

export default function ProcessTimeline() {
  return (
    <section className="border-t border-ink/10 py-14 lg:py-20">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden bg-linen">
          <Image
            src={IMAGES.atelierLarge}
            alt="L’atelier de maroquinerie Dimanche, à Lyon : établi, outils et cuirs"
            className="aspect-[4/3] w-full"
            fittingType="fill"
          />
        </div>
        <div className="overflow-hidden bg-linen">
          <Image
            src={IMAGES.geste}
            alt="Le cuir travaillé à l’établi de l’atelier"
            className="aspect-[4/3] w-full"
            fittingType="fill"
          />
        </div>
      </div>

      <ol className="mt-12 grid gap-x-12 gap-y-9 border-t border-ink/10 pt-10 sm:grid-cols-2">
        {STEPS.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[40px_1fr] gap-4">
            <p className="font-display text-[15px] text-clay">{String(index + 1).padStart(2, '0')}</p>
            <div>
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-ink">{step.title}</h3>
              <p className="mt-2 text-[13px] font-light leading-[1.8] text-ink/60">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}