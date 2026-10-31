import { useCart } from '@/components/cart/CartContext';
import Hero from '@/components/home/Hero';
import ValueStrip from '@/components/home/ValueStrip';
import DualEngine from '@/components/home/DualEngine';
import WorkshopSection from '@/components/home/WorkshopSection';
import StorySection from '@/components/home/StorySection';
import ReviewsSection from '@/components/home/ReviewsSection';
import VisitSection from '@/components/home/VisitSection';

export default function Home() {
  const { addItem } = useCart();

  const addProduct = (product) =>
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      meta: product.leather,
      type: 'product',
    });

  return (
    <>
      <Hero />
      <ValueStrip />
      <DualEngine onQuickAdd={addProduct} />
      <WorkshopSection />
      <StorySection />
      <ReviewsSection />
      <VisitSection />
    </>
  );
}