import { useEffect, useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import Container from '@/components/site/Container';
import ProductCard from '@/components/product/ProductCard';
import { Image } from '@/components/ui/image';
import { useCart } from '@/components/cart/CartContext';
import { getProductsByCategory } from '@/api/catalog';
import { salePrice } from '@/lib/pricing';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const media = (file) => `https://static.wixstatic.com/media/${file}`;

const BANNER = media('dc3d95_8b48eef8fb2346b69068f0ddd2838901~mv2.jpg');

const PIECES = [
  media('dc3d95_4a473b537bb2496d9b9cf40cc1e14b7a~mv2.jpg'),
  media('dc3d95_42da0a7751d04ba8b31fa924dd813b23~mv2.jpg'),
  media('dc3d95_d6c8e08ca68a433b8bad12244fcab70b~mv2.jpg'),
  media('dc3d95_0b8e8743bb7f4057b916b3bc666e9943~mv2.jpg'),
  media('dc3d95_d4c5f8b2caab4c9997ccf43d9501d1be~mv2.jpg'),
];

export default function Illustrations() {
  useDocumentTitle('Illustrations — Atelier Dimanche, papiers et collages');
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProductsByCategory('Illustrations').then((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleAdd = (product) =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: salePrice(product),
      image: product.image,
      meta: product.leather,
      type: 'product',
      max: product.stock ?? 1,
    });

  return (
    <div className="bg-cream">
      <div className="relative overflow-hidden">
        <Image src={BANNER} alt="Papiers anciens et collages de l’atelier" className="h-[220px] w-full sm:h-[320px]" fittingType="fill" />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 flex items-end">
          <Container className="pb-8">
            <p className="eyebrow text-cream/70">Avant Dimanche</p>
            <h1 className="mt-2 font-display text-[2rem] leading-tight text-cream sm:text-[3rem]">
              L’illustration
            </h1>
          </Container>
        </div>
      </div>

      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-forest/80">L’histoire</p>
            <p className="mt-4 text-[14px] font-light leading-[1.85] text-ink/70">
              Avant Dimanche, il y a eu Marie au Lait, une maison de papeterie née comme un projet de
              fin d’études, puis devenue un laissez-passer dans la vie professionnelle. Les
              illustrations se déclinaient alors sur des cartes postales, des carnets et des
              affiches. Les marchés de créateurs ont fait le reste&nbsp;: les rencontres, les points
              de vente, l’envie de continuer.
            </p>
          </div>
          <div className="space-y-5 text-[14px] font-light leading-[1.85] text-ink/70">
            <p>
              L’amour des photos anciennes et des papiers colorés n’a jamais faibli. Les invitations
              d’amies, dans leurs boutiques-galeries, ont été autant d’occasions de reprendre du
              temps pour créer. Aujourd’hui, ce travail d’illustration a sa place ici&nbsp;: les
              couleurs passent du papier au cuir, les jeux de matière se répondent.
            </p>
            <p>
              Partant d’un attachement porté aux photos de familles des années 1950, les images sont
              mises en scène d’une façon nouvelle, pour réinterpréter la mémoire collective. Une
              trame se dessine dans ces photographies&nbsp;: une semaine à la mer, la nouvelle
              voiture familiale, le vélo du dernier. Chacun pose un peu maladroitement, devant le
              cerisier en fleurs, figé dans le temps.
            </p>
            <p>
              Aujourd’hui, ils sortent de leur décor pour en intégrer un nouveau, fait de morceaux de
              papiers anciens et de plantes découpées, et nous renvoient à notre propre histoire
              familiale.
            </p>
          </div>
        </div>

        <div className="no-scrollbar mt-12 flex gap-3 overflow-x-auto">
          {PIECES.map((src, index) => (
            <div key={src} className="w-[46%] shrink-0 overflow-hidden bg-linen sm:w-[30%] lg:w-[19%]">
              <Image
                src={src}
                alt={`Collage original ${index + 1}`}
                className="aspect-[3/4] w-full"
                fittingType="fill"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">
            En carte postale ou en collage original, un petit bout de poésie
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/marie.bdls/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink"
            >
              <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} /> marie.bdls
            </a>
            <a
              href="https://www.facebook.com/lamarquemarieaulait/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink"
            >
              <Facebook className="h-3.5 w-3.5" strokeWidth={1.5} /> marie au lait
            </a>
          </div>
        </div>
      </Container>

      <Container className="border-t border-ink/10 pb-20 pt-14 lg:pb-24">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-display text-[1.6rem] leading-tight text-ink sm:text-[2rem]">
            Les pièces disponibles
          </h2>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">
            {loading ? 'Chargement…' : `${products.length} pièces`}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickAdd={handleAdd} />
          ))}
        </div>
        {!loading && products.length === 0 && (
          <p className="py-12 text-center text-sm font-light text-ink/45">
            Aucune pièce disponible pour le moment.
          </p>
        )}
      </Container>
    </div>
  );
}