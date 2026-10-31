import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Cta from '@/components/site/Cta';
import Container from '@/components/site/Container';
import { IMAGES } from '@/lib/images';

const PROOF = ['Cuirs de grandes maisons', 'Point sellier, fil de lin', 'Fabriqué à Lyon'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <Container className="px-0 sm:px-0 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 pb-9 pt-9 sm:px-10 sm:pb-14 sm:pt-14 lg:px-16 lg:py-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] uppercase tracking-[0.24em] text-forest/80 sm:text-[11px] sm:tracking-[0.28em]"
            >
              Atelier-boutique · 23 rue Burdeau, Lyon 1ᵉʳ
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[2.1rem] leading-[1.08] tracking-[-0.02em] text-ink sm:mt-7 sm:text-[3.4rem] sm:leading-[1.06] lg:text-[3.9rem] xl:text-[4.3rem]"
            >
              Maroquinerie artisanale
              <br className="hidden sm:block" /> &amp; éco-responsable.
              <span className="mt-1 block font-display italic text-clay sm:mt-2">Fait main à Lyon.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-[30rem] text-[14px] font-light leading-[1.7] text-ink/65 sm:mt-7 sm:text-[15px] sm:leading-[1.75]"
            >
              <span className="sm:hidden">
                Pièces uniques en cuir réemployé, découpées et cousues main par Marie Bodilis, au 23
                rue Burdeau.
              </span>
              <span className="hidden sm:inline">
                Je m’appelle Marie Bodilis. Depuis 2015, je dessine, découpe et couds chaque pièce dans
                mon atelier lyonnais, à partir de chutes de cuir de grandes maisons et de cuirs au
                tannage végétal. Aucune série : chaque modèle n’existe qu’en un exemplaire.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            >
              <Cta to="/boutique" className="w-full sm:w-auto">
                Voir les pièces disponibles
              </Cta>
              <Cta to="/ateliers" variant="outline" className="hidden sm:inline-flex">
                Réserver un atelier
              </Cta>
              <Link
                to="/ateliers"
                className="self-start border-b border-ink/25 pb-1 text-[11px] uppercase tracking-[0.2em] text-ink/65 transition-colors hover:border-ink hover:text-ink sm:hidden"
              >
                Réserver un atelier création
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="no-scrollbar -mx-6 mt-8 flex gap-x-6 overflow-x-auto border-t border-ink/10 px-6 pt-5 text-[10px] uppercase tracking-[0.2em] text-ink/45 sm:mx-0 sm:mt-12 sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:px-0 sm:pt-6 lg:mt-16"
            >
              {PROOF.map((item) => (
                <li key={item} className="shrink-0 whitespace-nowrap">
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="relative min-h-[330px] overflow-hidden bg-linen sm:min-h-[520px] lg:min-h-[760px]">
            <motion.div style={{ y: imageY }} className="absolute inset-0 h-[112%]">
              <Image
                src={IMAGES.hero}
                alt="L’atelier Dimanche, 23 rue Burdeau à Lyon"
                className="h-full w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent p-5 sm:p-6 lg:p-10">
              <div>
                <p className="max-w-[16rem] text-[10px] uppercase tracking-[0.2em] text-cream/90 sm:text-[11px]">
                  Découpe, parage, couture main
                </p>
                <Link
                  to="/savoir-faire"
                  className="mt-2.5 inline-block border-b border-cream/40 pb-1 text-[10px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream hover:text-sand sm:mt-3"
                >
                  Voir le geste
                </Link>
              </div>
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