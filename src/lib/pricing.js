// Une remise n'est valable que si elle est strictement inférieure au prix affiché.
export function salePrice(product) {
  const price = Number(product?.price) || 0;
  const sale = Number(product?.sale_price) || 0;
  return sale > 0 && sale < price ? sale : price;
}

export function discountPercent(product) {
  const price = Number(product?.price) || 0;
  const sale = salePrice(product);
  if (!price || sale >= price) return 0;
  return Math.round(((price - sale) / price) * 100);
}