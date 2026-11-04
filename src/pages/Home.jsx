import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import CollectionSection from '@/components/home/CollectionSection';
import SignatureSection from '@/components/home/SignatureSection';
import SurMesureTeaser from '@/components/home/SurMesureTeaser';
import WorkshopSection from '@/components/home/WorkshopSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import StorySection from '@/components/home/StorySection';
import SocialSection from '@/components/home/SocialSection';
import VisitSection from '@/components/home/VisitSection';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CollectionSection />
      <SurMesureTeaser />
      <SignatureSection />
      <WorkshopSection />
      <ReviewsSection />
      <StorySection />
      <SocialSection />
      <VisitSection />
    </>
  );
}