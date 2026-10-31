// Témoignages publics concernant Dimanche.
// Chaque avis est reproduit tel qu'il a été écrit et publié, avec sa source.
// Aucun avis n'est inventé ni reformulé : ne pas ajouter de témoignage sans source vérifiable.

const SOURCE_SITE = {
  label: 'Site officiel Dimanche',
  url: 'https://www.atelier-dimanche.fr/',
};

export const REVIEWS = [
  {
    id: 'laurane',
    name: 'Laurane D.',
    date: 'Avril 2025',
    context: 'Atelier ceinture',
    text:
      'Je viens de faire l’atelier pour apprendre à faire sa ceinture que l’on avait offert pour Noël. C’était super ! Marie est très pédagogue et très sympa. J’ai passé un super moment et je suis super contente de ma ceinture !',
    source: SOURCE_SITE,
  },
  {
    id: 'aurore',
    name: 'Aurore B.',
    date: 'Novembre 2024',
    context: 'Atelier ceinture',
    text:
      'J’ai eu la chance de réaliser une ceinture en cuir personnalisée avec Marie. J’ai passé un super moment en sa compagnie et ma ceinture me plaît beaucoup. Le cours est très pédagogique et très sympa. Je recommande vivement.',
    source: SOURCE_SITE,
  },
  {
    id: 'veronique',
    name: 'Véronique C.',
    date: 'Avril 2025',
    context: 'Atelier ceinture',
    text:
      'Marie nous apprend les gestes précis, nous entraîne et nous permet une réalisation dans les règles de l’art, par nous mêmes. Très bon moment passé et contents du résultat final ! Merci !',
    source: SOURCE_SITE,
  },
];

// Ce que ces témoignages mettent en avant, sans ajouter d'information absente des avis.
export const REVIEW_THEMES = [
  {
    title: 'La pédagogie',
    text: 'Les trois avis mentionnent la manière dont Marie transmet les gestes, pas à pas.',
  },
  {
    title: 'Le petit comité',
    text: 'Les ateliers se font en très petit nombre : chacun est suivi, personne ne reste au bord de l’établi.',
  },
  {
    title: 'La pièce qu’on emporte',
    text: 'À chaque fois, il est question du résultat : une ceinture portée, montrée, gardée.',
  },
];

export const REVIEWS_GOOGLE_URL =
  'https://www.google.com/maps/search/?api=1&query=Atelier+Dimanche+23+rue+Burdeau+69001+Lyon';