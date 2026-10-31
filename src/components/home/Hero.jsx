import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Cta from '@/components/site/Cta';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/catalog';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <Container className="px-0 sm:px-0 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 pb-14 pt-14 sm:px-10 lg:px-16 lg:py-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-forest/80"
            >
              Atelier-boutique · 23 rue Burdeau, Lyon 1ᵉʳ
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-[2.45rem] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[3.4rem] lg:text-[3.9rem] xl:text-[4.3rem]"
            >
              Maroquinerie artisanale
              <br className="hidden sm:block" /> &amp; éco-responsable.
              <span className="mt-2 block font-display italic text-clay">Fait main à Lyon.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[30rem] text-[15px] font-light leading-[1.75] text-ink/65"
            >
              Des pièces uniques façonnées à partir de chutes de cuir de grandes maisons et de cuirs
              tannés végétal. Chaque couture, chaque tranche, chaque finition : à la main, dans mon
              atelier lyonnais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Cta to="/boutique">Découvrir la collection</Cta>
              <Cta to="/ateliers" variant="outline">
                Réserver un atelier
              </Cta>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6 text-[10px] uppercase tracking-[0.24em] text-ink/40 lg:mt-16"
            >
              <span>Cuirs upcyclés</span>
              <span className="h-3 w-px bg-ink/15" />
              <span>Pièces uniques</span>
              <span className="h-3 w-px bg-ink/15" />
              <span>Fabrication française</span>
            </motion.div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden bg-linen sm:min-h-[520px] lg:min-h-[760px]">
            <motion.div style={{ y: imageY }} className="absolute inset-0 h-[112%]">
              <Image
                src={IMAGES.hero}
                alt="Mains d’artisan cousant au point sellier deux épaisseurs de cuir fauve"
                className="h-full w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent p-6 lg:p-10">
              <p className="max-w-[16rem] text-[11px] uppercase tracking-[0.2em] text-cream/90">
                Couture sellier · fil de lin ciré
              </p>
              <p className="hidden text-[11px] uppercase tracking-[0.2em] text-cream/60 sm:block">
                Atelier Dimanche, Lyon
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}