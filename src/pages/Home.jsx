import Hero from '@/components/home/Hero';
import ValueStrip from '@/components/home/ValueStrip';
import DualEngine from '@/components/home/DualEngine';
import WorkshopSection from '@/components/home/WorkshopSection';
import StorySection from '@/components/home/StorySection';
import ReviewsSection from '@/components/home/ReviewsSection';
import VisitSection from '@/components/home/VisitSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <DualEngine />
      <WorkshopSection />
      <StorySection />
      <ReviewsSection />
      <VisitSection />
    </>
  );
}