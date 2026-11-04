import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import CollectionSection from '@/components/home/CollectionSection';
import SurMesureTeaser from '@/components/home/SurMesureTeaser';
import WorkshopSection from '@/components/home/WorkshopSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import SignatureSection from '@/components/home/SignatureSection';
import StorySection from '@/components/home/StorySection';
import SocialSection from '@/components/home/SocialSection';
import VisitSection from '@/components/home/VisitSection';

// Parcours progressif : la promesse, puis les pièces à vendre, les commandes
// sur-mesure et illustrations, les ateliers à réserver, la preuve des clients,
// le savoir-faire, la marque, les arrivées du moment, et enfin la visite.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CollectionSection />
      <SurMesureTeaser />
      <WorkshopSection />
      <ReviewsSection />
      <SignatureSection />
      <StorySection />
      <SocialSection />
      <VisitSection />
    </>
  );
}