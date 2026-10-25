// Drop a replacement photo at the same path to swap the artwork — the tint on
// top keeps every card in the same green key whatever the source image is.
// `title` and `tagline` are the design's wording (header menu); `name` and
// `description` still feed the product rows until that screen is redone.
export const PRODUCTS = [
  {
    slug: 'training-simulator-for-shooting-with-dshk-pkm-browning',
    name: 'Machine Gun Training',
    description: 'Realistic training on DShK, PKM and Browning.',
    title: 'Machine Gun',
    tagline: 'DShK, PKM and Browning training',
    image: '/products/machine-gun.jpg',
  },
  {
    slug: 'rpg-7-grenade-launcher-shooting-simulator',
    name: 'RPG-7 Training',
    description: 'Master the RPG-7 launcher safely.',
    title: 'RPG-7',
    tagline: 'Master RPG-7 launcher safety',
    image: '/products/rpg-7.jpg',
  },
  {
    slug: 'ftp-drone-countermeasure-trainer',
    name: 'FPV Drone Defense Training',
    description: 'Detect and counter FPV drone threats.',
    title: 'FPV Drone Defense',
    tagline: 'Detect and counter FPV threats',
    image: '/products/fpv-drone.jpg',
  },
  {
    slug: 'duel-fpv-vs-gun',
    name: 'Duel: FPV vs GUN',
    description: 'VR training for FPV operators and shooters.',
    title: 'Duel: FPV vs GUN',
    tagline: 'VR training for FPV operators and shooters',
    // Placeholder until the design's artwork is exported.
    image: '/products/fpv-drone.jpg',
  },
]

export const PHOTO_TINT = 'linear-gradient(155deg, rgba(255,255,255,0.34), rgba(240,246,231,0.5))'
