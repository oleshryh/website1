import { url } from '../routes'

// The four training systems, worded as in the design, in English and Ukrainian. `tagline` is the line
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
    title: { en: 'Machine Gun', ua: 'Кулемет' },
    tagline: { en: 'DShK, PKM and Browning training', ua: 'Навчання на ДШК, ПКМ і Browning' },
    cardLine: { en: 'DShK, PKM and Browning training', ua: 'Навчання на ДШК, ПКМ і Browning' },
    art: [
      { src: url('products/cards/machine-gun.png'), x: 13, y: 32, w: 280, h: 187 },
      { src: url('products/cards/machine-gun-reticle.svg'), x: 31, y: 49, w: 26, h: 26 },
    ],
    notes: [{ text: { en: '// realistic ballistics', ua: '// реалістична балістика' }, x: 224, y: 117, w: 59 }],
  },
  {
    slug: 'rpg-7-grenade-launcher-shooting-simulator',
    number: '02',
    title: { en: 'RPG-7', ua: 'РПГ-7' },
    tagline: { en: 'Master RPG-7 launcher safety', ua: 'Безпечне опанування РПГ-7' },
    cardLine: { en: 'Master RPG-7 launcher safety', ua: 'Безпечне опанування РПГ-7' },
    art: [{ src: url('products/cards/rpg-7.png'), x: 23, y: 43, w: 261, h: 131 }],
    notes: [{ text: { en: '// launcher simulation', ua: '// симуляція гранатомета' }, x: 204, y: 43, w: 87 }],
  },
  {
    slug: 'ftp-drone-countermeasure-trainer',
    number: '03',
    title: { en: 'FPV Drone Defense', ua: 'Захист від FPV-дронів' },
    tagline: { en: 'Detect and counter FPV threats', ua: 'Виявлення та протидія FPV-загрозам' },
    cardLine: { en: 'Detect and counter FPV threats', ua: 'Виявлення та протидія FPV-загрозам' },
    art: [
      // A faint radar behind the drone, laid over the card in overlay mode.
      { src: url('products/cards/fpv-drone-radar.png'), x: 13, y: 98, w: 120, h: 115, overlay: true },
      { src: url('products/cards/fpv-drone.png'), x: 13, y: 26, w: 280, h: 159 },
    ],
    notes: [
      { text: { en: '// threat detection', ua: '// виявлення загроз' }, x: 234, y: 26, w: 59 },
      { text: { en: '// combat scenarios', ua: '// бойові сценарії' }, x: 110, y: 167, w: 59 },
    ],
  },
  {
    slug: 'duel-fpv-vs-gun',
    number: '04',
    title: { en: 'Duel: FPV vs GUN', ua: 'Дуель: FPV проти стрілка' },
    tagline: {
      en: 'VR training for FPV operators and shooters',
      ua: 'VR-навчання для FPV-операторів і стрільців',
    },
    cardLine: { en: 'FPV operators vs shooters', ua: 'FPV-оператори проти стрільців' },
    art: [{ src: url('products/cards/duel.png'), x: 0, y: 21, w: 280, h: 179 }],
    notes: [
      {
        text: { en: '// two perspectives one scenario', ua: '// дві перспективи, один сценарій' },
        x: 9,
        y: 42,
        w: 89,
      },
    ],
  },
]
