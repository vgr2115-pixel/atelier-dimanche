import { base44 } from '@/api/base44Client';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

// Les pièces vendues restent visibles (badge « Vendu ») mais passent en fin de liste.
const sortByStatus = (list) =>
  [...list].sort((a, b) => {
    const soldA = a.is_available === false ? 1 : 0;
    const soldB = b.is_available === false ? 1 : 0;
    return soldA - soldB || (a.position ?? 0) - (b.position ?? 0);
  });

export async function getProducts() {
  const data = await base44.entities.Product.list('position', 200);
  return sortByStatus(asArray(data));
}

export async function getAvailableProducts() {
  const products = await getProducts();
  return products.filter((product) => product.is_available !== false);
}

export async function getProductsByCategory(category) {
  if (!category || category === 'Tout') return getProducts();
  const data = await base44.entities.Product.filter({ category });
  return sortByStatus(asArray(data));
}

export async function getProductBySlug(slug) {
  const data = await base44.entities.Product.filter({ slug });
  return asArray(data)[0] ?? null;
}

export async function getRelatedProducts(product) {
  if (!product) return [];
  const data = await base44.entities.Product.filter({ category: product.category });
  return sortByStatus(asArray(data))
    .filter((item) => item.id !== product.id && item.slug !== product.slug)
    .slice(0, 3);
}

export async function getPublishedReviews(limit = 20) {
  const data = await base44.entities.Review.filter(
    { is_published: true },
    { sort: 'position', limit },
  );
  return asArray(data);
}

export async function getWorkshops() {
  const data = await base44.entities.Workshop.list('position', 50);
  return asArray(data).filter((workshop) => workshop.is_active !== false);
}

export async function getUpcomingSessions(limit = 40) {
  const data = await base44.entities.WorkshopSession.list('date', 200);
  const today = new Date().toISOString().slice(0, 10);
  return asArray(data)
    .filter((session) => session.date >= today)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .slice(0, limit);
}

export async function getNextSessionFor(workshopSlug) {
  const sessions = await getUpcomingSessions(200);
  return sessions.find((session) => session.workshop_slug === workshopSlug) ?? null;
}