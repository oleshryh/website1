import { url } from '../routes'
import { CLIENTS } from './clients'
import { LOREM } from './lorem'
import { PRODUCTS } from './products'

// Case studies — the longer stories behind the client quotes on the home page.
// Placeholders: the headline and lead are written, the body is fish text until
// the real stories come in. `client` and `product` point into clients.js and
// products.js; `cover` is the picture, `fit` how it fills the frame.
const product = (slug) => PRODUCTS.find((p) => p.slug === slug)

const BODY = [
  { heading: { en: 'The challenge', ua: 'Завдання' }, paragraphs: [LOREM[0], LOREM[1]] },
  { heading: { en: 'What we built', ua: 'Що ми зробили' }, paragraphs: [LOREM[2], LOREM[3]] },
  { heading: { en: 'Results', ua: 'Результати' }, paragraphs: [LOREM[4], LOREM[0]] },
]

export const CASES = [
  {
    slug: 'sbgsu-fpv-drone-defense',
    client: CLIENTS[3],
    product: product('ftp-drone-countermeasure-trainer'),
    title: {
      en: 'Training border guards to stop FPV drones',
      ua: 'Як прикордонники вчаться зупиняти FPV-дрони',
    },
    lead: {
      en: 'How the National Academy brought drone defense into its everyday course.',
      ua: 'Як Національна академія включила протидію дронам у щоденний курс.',
    },
    cover: url('clients/sbgsu-video.jpg'),
    fit: 'cover',
    body: BODY,
  },
  {
    slug: 'desna-machine-gun-course',
    client: CLIENTS[0],
    product: product('training-simulator-for-shooting-with-dshk-pkm-browning'),
    title: {
      en: 'A machine-gun course before the first live round',
      ua: 'Кулеметний курс до першого бойового пострілу',
    },
    lead: {
      en: 'Recruits at Desna reach the range already sure of the weapon.',
      ua: 'Новобранці «Десни» виходять на полігон, уже впевнено володіючи зброєю.',
    },
    cover: url('gallery/soldier-aiming.png'),
    fit: 'contain',
    body: BODY,
  },
  {
    slug: 'afu-fpv-duel',
    client: CLIENTS[1],
    product: product('duel-fpv-vs-gun'),
    title: {
      en: 'Drone operators and shooters, one scenario',
      ua: 'Оператори дронів і стрільці в одному сценарії',
    },
    lead: {
      en: 'The duel mode turns two crews into each other’s best teachers.',
      ua: 'Режим дуелі робить два екіпажі найкращими вчителями одне для одного.',
    },
    cover: url('products/cards/duel.png'),
    fit: 'contain',
    body: BODY,
  },
  {
    slug: 'mod-rpg-7-programme',
    client: CLIENTS[2],
    product: product('rpg-7-grenade-launcher-shooting-simulator'),
    title: {
      en: 'Measurable progress on the RPG-7',
      ua: 'Вимірюваний прогрес на РПГ-7',
    },
    lead: {
      en: 'Objective data from every exercise, for instructors and programme officers alike.',
      ua: 'Об’єктивні дані з кожної вправи — і для інструкторів, і для керівників програм.',
    },
    cover: url('gallery/soldier-standing.png'),
    fit: 'contain',
    body: BODY,
  },
]
