// The four training systems, worded as in the design. `tagline` is the line
// under the name in the header's menu; `cardLine` the one on the home page card,
// where the design words the duel a little shorter.
//
// `art` places the card's pictures inside its 295×220 picture area, in px, as
// drawn in Figma. Pictures live in public/products/cards/ — export a new one
// from Figma at 2× and drop it in at the same name to swap it.
export const PRODUCTS = [
  {
    slug: 'training-simulator-for-shooting-with-dshk-pkm-browning',
    number: '01',
    title: 'Machine Gun',
    tagline: 'DShK, PKM and Browning training',
    cardLine: 'DShK, PKM and Browning training',
    art: [
      { src: '/products/cards/machine-gun.png', x: 13, y: 32, w: 280, h: 187 },
      { src: '/products/cards/machine-gun-reticle.svg', x: 31, y: 49, w: 26, h: 26 },
    ],
    notes: [{ text: '// realistic ballistics', x: 224, y: 117, w: 59 }],
  },
  {
    slug: 'rpg-7-grenade-launcher-shooting-simulator',
    number: '02',
    title: 'RPG-7',
    tagline: 'Master RPG-7 launcher safety',
    cardLine: 'Master RPG-7 launcher safety',
    art: [{ src: '/products/cards/rpg-7.png', x: 23, y: 43, w: 261, h: 131 }],
    notes: [{ text: '// launcher simulation', x: 204, y: 43, w: 87 }],
  },
  {
    slug: 'ftp-drone-countermeasure-trainer',
    number: '03',
    title: 'FPV Drone Defense',
    tagline: 'Detect and counter FPV threats',
    cardLine: 'Detect and counter FPV threats',
    art: [
      // A faint radar behind the drone, laid over the card in overlay mode.
      { src: '/products/cards/fpv-drone-radar.png', x: 13, y: 98, w: 120, h: 115, overlay: true },
      { src: '/products/cards/fpv-drone.png', x: 13, y: 26, w: 280, h: 159 },
    ],
    notes: [
      { text: '// threat detection', x: 234, y: 26, w: 59 },
      { text: '// combat scenarios', x: 110, y: 167, w: 59 },
    ],
  },
  {
    slug: 'duel-fpv-vs-gun',
    number: '04',
    title: 'Duel: FPV vs GUN',
    tagline: 'VR training for FPV operators and shooters',
    cardLine: 'FPV operators vs shooters',
    art: [{ src: '/products/cards/duel.png', x: 0, y: 21, w: 280, h: 179 }],
    notes: [{ text: '// two perspectives one scenario', x: 9, y: 42, w: 89 }],
  },
]
