import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import CollectionSection from '@/components/home/CollectionSection';
import CraftSection from '@/components/home/CraftSection';
import MaterialsSection from '@/components/home/MaterialsSection';
import WorkshopSection from '@/components/home/WorkshopSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import StorySection from '@/components/home/StorySection';
import VisitSection from '@/components/home/VisitSection';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CollectionSection />
      <CraftSection />
      <MaterialsSection />
      <WorkshopSection />
      <ReviewsSection />
      <StorySection />
      <VisitSection />
    </>
  );
}