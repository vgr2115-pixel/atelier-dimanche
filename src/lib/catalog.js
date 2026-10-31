export const IMAGES = {
  hero: '/__generating__/9b1078c1-3cb4-4682-bd20-72f68b60a72b.png',
  cabas: '/__generating__/cb46336e-666b-4d2a-ba7e-82b088594829.png',
  ceinture: '/__generating__/648416a9-e8e0-4aa3-a138-bdabe2dc4cd6.png',
  portemonnaie: '/__generating__/ae24b10c-dcca-4425-af65-8a6fbb1e254d.png',
  pochette: '/__generating__/3ae3ef48-9673-40b8-9e0f-10c3574b9c84.png',
  atelierCeinture: '/__generating__/6d6b5a79-23b5-43ec-9790-0f7e037d1774.png',
  boutique: '/__generating__/be8261e2-741a-4aaa-a522-ed951c1e00d5.png',
  portrait: '/__generating__/d5b739ed-41a8-4bf7-ad30-7af92e33d7f3.png',
};

// Contenus de démonstration — remplacés par la base de données une fois les produits publiés.
export const PRODUCTS = [
  {
    id: 'le-cabas-dimanche',
    slug: 'le-cabas-dimanche',
    name: 'Le Cabas Dimanche',
    price: 240,
    category: 'Sacs',
    leather: 'Cuir de veau tanné végétal',
    badge: 'Pièce unique',
    image: IMAGES.cabas,
    short: 'Le cabas structuré qui accompagne les dimanches comme les lundis.',
    description:
      "Un cabas à la silhouette nette, monté à la main à partir d'une chute de cuir de grande maison. Deux anses plates, une poche intérieure, des tranches teintées et lustrées une à une.",
    details: ['Cuir de veau pleine fleur upcyclé', 'Doublure en toile de coton bio', 'Couture sellier au fil de lin ciré', 'Tranches teintées et lustrées à la main'],
    dimensions: '32 × 28 × 12 cm',
    duration: '10 h de travail',
  },
  {
    id: 'la-ceinture-lyon',
    slug: 'la-ceinture-lyon',
    name: 'La Ceinture Lyon',
    price: 95,
    category: 'Ceintures',
    leather: 'Cuir tanné végétal',
    badge: 'Sur-mesure',
    image: IMAGES.ceinture,
    short: 'La ceinture que vous pouvez aussi venir fabriquer vous-même.',
    description:
      "Découpée dans une bande de cuir pleine fleur, arrondie à la main, percée à votre mesure. Boucle laiton massif, passant cousu au fil de lin. Disponible en cinq coloris d'atelier.",
    details: ['Largeur 3 cm', 'Boucle laiton massif', 'Percée à vos mesures', 'Finition à la cire d’abeille'],
    dimensions: 'Du 75 au 115 cm',
    duration: '3 h en atelier',
  },
  {
    id: 'le-porte-monnaie-samedi',
    slug: 'le-porte-monnaie-samedi',
    name: 'Le Porte-monnaie Samedi',
    price: 55,
    category: 'Petite maroquinerie',
    leather: 'Chute de cuir de veau',
    badge: 'Upcyclé',
    image: IMAGES.portemonnaie,
    short: 'Un petit format, tout en rondeur, qui tient dans la main.',
    description:
      "Un rabat unique, une pression laiton, une couture continue. Le porte-monnaie le plus simple à réaliser, et celui que l'on garde le plus longtemps.",
    details: ['Cuir de veau souple', 'Pression laiton doré', 'Couture sellier apparente', 'Intérieur non doublé'],
    dimensions: '10 × 8 cm',
    duration: '2 h 30 en atelier',
  },
  {
    id: 'la-pochette-burdeau',
    slug: 'la-pochette-burdeau',
    name: 'La Pochette Burdeau',
    price: 130,
    category: 'Sacs',
    leather: 'Cuir de veau chocolat',
    badge: 'Upcyclé',
    image: IMAGES.pochette,
    short: 'La pochette du soir, bandoulière ajustable.',
    description:
      "Une pochette trapézoïdale, un rabat ourlé, une bandoulière fine qui se règle à la main. Assez petite pour le dîner, assez grande pour l'essentiel.",
    details: ['Cuir de veau upcyclé', 'Bandoulière réglable', 'Fermoir laiton', 'Tranches cirées'],
    dimensions: '21 × 14 × 6 cm',
    duration: '8 h de travail',
  },
];

export const WORKSHOPS = [
  {
    id: 'atelier-ceinture',
    name: 'Créez votre propre ceinture',
    duration: '3 h',
    price: 120,
    participants: '2 à 6 personnes',
    level: 'Tous niveaux',
    image: IMAGES.atelierCeinture,
    description:
      'Découpe, arrondi, perçage, couture du passant et finition des tranches : vous repartez avec votre ceinture, portée à la taille.',
    includes: ['Le cuir et la boucle laiton', 'Tous les outils de l’atelier', 'Un café et beaucoup de patience', 'Votre ceinture, terminée'],
  },
  {
    id: 'atelier-porte-monnaie',
    name: 'Fabriquez votre porte-monnaie',
    duration: '2 h 30',
    price: 85,
    participants: '2 à 6 personnes',
    level: 'Débutant',
    image: IMAGES.portemonnaie,
    description:
      "Une première approche du cuir : traçage, découpe, collage, couture sellier et pose de la pression. Idéal pour découvrir le métier.",
    includes: ['Le cuir et la pression laiton', 'Tous les outils de l’atelier', 'Les gestes du sellier', 'Votre porte-monnaie'],
  },
  {
    id: 'atelier-porte-cartes',
    name: 'Initiation à la couture sellier',
    duration: '2 h',
    price: 70,
    participants: '2 à 6 personnes',
    level: 'Débutant',
    image: IMAGES.portrait,
    description:
      "Deux aiguilles, un fil de lin, un point régulier. L'atelier le plus court pour comprendre pourquoi une couture main ne ressemble à aucune autre.",
    includes: ['Cuir et fil de lin', 'Tous les outils', 'Le geste du point sellier', 'Votre porte-cartes'],
  },
];