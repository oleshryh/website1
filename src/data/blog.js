import { url } from '../routes'
import { LOREM } from './lorem'

// Blog posts — three sample entries to show how the blog works; the headlines
// are written, the bodies are fish text. Newest first.
export const POSTS = [
  {
    slug: 'new-fpv-defense-scenarios',
    date: '2026-10-14',
    category: { en: 'Product', ua: 'Продукт' },
    title: {
      en: 'New scenarios for FPV drone defense',
      ua: 'Нові сценарії для тренажера протидії FPV-дронам',
    },
    lead: {
      en: 'Night conditions, swarms and urban terrain join the drone defense trainer.',
      ua: 'У тренажері протидії дронам з’явилися нічні умови, рої та міська забудова.',
    },
    cover: url('products/cards/fpv-drone.png'),
    fit: 'contain',
    body: [
      { paragraphs: [LOREM[0], LOREM[1]] },
      { heading: { en: 'What changes for instructors', ua: 'Що зміниться для інструкторів' }, paragraphs: [LOREM[2], LOREM[3]] },
    ],
  },
  {
    slug: 'platform-in-two-languages',
    date: '2026-09-22',
    category: { en: 'Company', ua: 'Компанія' },
    title: {
      en: 'The platform now speaks Ukrainian and English',
      ua: 'Платформа тепер українською та англійською',
    },
    lead: {
      en: 'Every menu, briefing and report is available in both languages.',
      ua: 'Усі меню, брифінги та звіти доступні двома мовами.',
    },
    cover: url('gallery/soldier-standing.png'),
    fit: 'contain',
    body: [{ paragraphs: [LOREM[4], LOREM[2], LOREM[1]] }],
  },
  {
    slug: 'vr-and-the-cost-of-live-fire',
    date: '2026-08-30',
    category: { en: 'Insights', ua: 'Аналітика' },
    title: {
      en: 'How VR training lowers the cost of live-fire practice',
      ua: 'Як VR-тренування зменшує витрати на бойові стрільби',
    },
    lead: {
      en: 'Ammunition, fuel, range time: where the savings come from.',
      ua: 'Набої, пальне, час на полігоні: звідки береться економія.',
    },
    cover: url('clients/sbgsu-video.jpg'),
    fit: 'cover',
    body: [
      { paragraphs: [LOREM[3], LOREM[0]] },
      { heading: { en: 'Where it does not replace the range', ua: 'Де VR не замінює полігон' }, paragraphs: [LOREM[1], LOREM[4]] },
    ],
  },
]
