import Container from '@/components/site/Container';
import Cta from '@/components/site/Cta';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import ProcessTimeline from '@/components/savoirfaire/ProcessTimeline';
import Glossary from '@/components/savoirfaire/Glossary';
import HandmadeChecklist from '@/components/savoirfaire/HandmadeChecklist';
import AfterSalesSection from '@/components/savoirfaire/AfterSalesSection';
import MaterialsSection from '@/components/home/MaterialsSection';
import Faq from '@/components/savoirfaire/Faq';
import IdentityBlock from '@/components/savoirfaire/IdentityBlock';

const FACTS = [
  ['Un atelier', '23 rue Burdeau, Lyon 1ᵉʳ'],
  ['Une paire de mains', 'Création, fabrication, vente'],
  ['Des pièces uniques', 'Un seul exemplaire par modèle'],
];

export default function SavoirFaire() {
  useDocumentTitle('Le savoir-faire — Atelier Dimanche, maroquinerie à Lyon');

  return (
    <div className="bg-cream">
      <Container className="pb-14 pt-14 lg:pt-20">
        <p className="eyebrow text-forest/80">Le savoir-faire</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <h1 className="font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            Un vrai cousu main,
            <span className="block italic text-clay">ça se voit, et ça s’explique.</span>
          </h1>
          <p className="max-w-md text-[15px] font-light leading-[1.8] text-ink/60 lg:pb-2">
            Je ne sous-traite rien. Du choix de la peau au dernier coup de chiffon, tout se passe dans
            mon atelier lyonnais. Voici les étapes, les matières et les mots exacts, pour que vous
            sachiez précisément ce que vous achetez.
          </p>
        </div>

        <dl className="mt-10 grid gap-6 border-y border-ink/10 py-6 sm:grid-cols-3">
          {FACTS.map(([title, value]) => (
            <div key={title}>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-ink/40">{title}</dt>
              <dd className="mt-1 text-[13px] font-light text-ink/70">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container>
        <ProcessTimeline />
      </Container>

      <MaterialsSection />

      <Container>
        <Glossary />
        <HandmadeChecklist />
        <AfterSalesSection />
        <Faq />
        <IdentityBlock />
      </Container>

      <Container className="py-16 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow text-forest/80">La suite</p>
            <h2 className="mt-4 max-w-xl font-display text-[1.8rem] leading-tight text-ink sm:text-[2.3rem]">
              Voir les pièces disponibles,
              <span className="block italic text-clay">ou venir les faire vous-même.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Cta to="/boutique">Voir la boutique</Cta>
            <Cta to="/ateliers" variant="outline">
              Réserver un atelier
            </Cta>
          </div>
        </div>
      </Container>
    </div>
  );
}