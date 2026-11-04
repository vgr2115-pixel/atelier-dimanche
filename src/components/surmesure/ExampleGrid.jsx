import { Image } from '@/components/ui/image';
import { SUR_MESURE_EXAMPLES } from '@/components/surmesure/surMesureExamples';

export default function ExampleGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
      {SUR_MESURE_EXAMPLES.map((example) => (
        <figure key={example.title}>
          <div className="overflow-hidden bg-linen">
            <Image
              src={example.image}
              alt={example.title}
              className="aspect-[4/5] w-full"
              fittingType="fill"
            />
          </div>
          <figcaption className="mt-3 text-[12px] font-light leading-relaxed text-ink/65">
            {example.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}