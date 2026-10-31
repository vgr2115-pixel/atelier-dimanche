export function formatPrice(value) {
  const number = Number(value) || 0;
  return `${number.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €`;
}

export function formatDateLong(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function formatDateShort(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}