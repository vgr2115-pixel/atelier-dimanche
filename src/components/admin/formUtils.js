export const inputClass =
  'rounded-none border-ink/20 bg-cream text-[14px] text-ink placeholder:text-ink/30 focus-visible:ring-forest';

export const labelClass = 'text-[10px] uppercase tracking-[0.18em] text-ink/50';

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}