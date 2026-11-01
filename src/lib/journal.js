// Sélection des trois pièces mises en avant dans « Nouvelles pièces ».
// Une même pièce ne peut apparaître qu'une fois : seul le modèle (avant le « — »)
// compte, sinon deux finitions du même modèle occupent deux emplacements.

const pieceKey = (title) =>
  String(title ?? '')
    .split('—')[0]
    .trim()
    .toLowerCase();

export const selectHomeEntries = (entries, limit = 3) => {
  const seen = new Set();
  const selected = [];

  for (const entry of entries) {
    const key = pieceKey(entry.title) || entry.id;
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(entry);
    if (selected.length === limit) break;
  }

  return selected;
};