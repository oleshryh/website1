import { url } from '../routes'

// Gallery — the pictures the site already has, plus empty tiles marking where
// the company's own photos will go. To add a photo: put it in public/gallery/
// and add an entry; `ratio` is the tile's shape, `fit` whether the picture
// fills it (a photo) or sits whole on the paper (a cut-out).
export const GALLERY_TAGS = [
  { id: 'all', label: { en: 'All', ua: 'Усі' } },
  { id: 'training', label: { en: 'Training', ua: 'Підготовка' } },
  { id: 'products', label: { en: 'Products', ua: 'Продукти' } },
  { id: 'events', label: { en: 'Events', ua: 'Події' } },
  { id: 'team', label: { en: 'Team', ua: 'Команда' } },
]

export const GALLERY = [
  {
    src: url('clients/sbgsu-video.jpg'),
    fit: 'cover',
    ratio: '16/10',
    tag: 'training',
    caption: { en: 'Drone defense session at the Academy', ua: 'Заняття з протидії дронам в академії' },
  },
  {
    src: url('gallery/soldier-aiming.png'),
    fit: 'contain',
    ratio: '4/3',
    tag: 'training',
    caption: { en: 'Weapon tracking in VR', ua: 'Трекінг зброї у VR' },
  },
  { placeholder: true, ratio: '3/4', tag: 'events', caption: { en: 'Defense exhibition', ua: 'Оборонна виставка' } },
  {
    src: url('products/cards/machine-gun.png'),
    fit: 'contain',
    ratio: '1/1',
    tag: 'products',
    caption: { en: 'Machine gun trainer', ua: 'Тренажер кулемета' },
  },
  {
    src: url('gallery/soldier-standing.png'),
    fit: 'contain',
    ratio: '3/4',
    tag: 'team',
    caption: { en: 'Ready for the exercise', ua: 'Готовий до вправи' },
  },
  {
    src: url('products/cards/rpg-7.png'),
    fit: 'contain',
    ratio: '4/3',
    tag: 'products',
    caption: { en: 'RPG-7 trainer', ua: 'Тренажер РПГ-7' },
  },
  { placeholder: true, ratio: '4/3', tag: 'team', caption: { en: 'The engineering team', ua: 'Команда інженерів' } },
  {
    src: url('frames/frame-060.webp'),
    fit: 'contain',
    ratio: '16/10',
    tag: 'training',
    caption: { en: 'Motion capture for the simulator', ua: 'Захоплення руху для тренажера' },
  },
  {
    src: url('products/cards/fpv-drone.png'),
    fit: 'contain',
    ratio: '1/1',
    tag: 'products',
    caption: { en: 'FPV drone defense', ua: 'Захист від FPV-дронів' },
  },
  { placeholder: true, ratio: '1/1', tag: 'events', caption: { en: 'Field trials', ua: 'Польові випробування' } },
  {
    src: url('products/cards/duel.png'),
    fit: 'contain',
    ratio: '4/3',
    tag: 'products',
    caption: { en: 'Duel: FPV vs GUN', ua: 'Дуель: FPV проти стрілка' },
  },
  { placeholder: true, ratio: '3/4', tag: 'team', caption: { en: 'Workshop', ua: 'Майстерня' } },
]
