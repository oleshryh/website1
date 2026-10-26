import { useT } from '../i18n'
import { url } from '../routes'
import { AboutText, Headline, PlatformLabel } from './About'
import { CtaButtons, HeroHeadline } from './Hero'
import ProductMark from './ProductMark'

// The first two screens on a phone, as in the mobile design: no animation and
// no flight between them — two ordinary blocks, each with the soldier still.
// Both pictures are frames of the same clip: the first (aiming) and the last
// (standing square), from the light set made for phones.
const AIMING = url('frames-sm/frame-000.webp')
const STANDING = url('frames-sm/frame-060.webp')

// Each frame is 800×494 with transparent margins around him. As in the mobile
// design he fills the screen from edge to edge — the frame runs past both sides
// and is cut off by the section. On a short phone that would put him over the
// buttons, so he is never taller than the room left under them.
const FRAME_HEIGHT = 'calc((100vw - 24px) / 0.57 * 494 / 800)'

const CALLOUTS = [
  [
    { en: 'Digital', ua: 'Цифрове' },
    { en: 'Environment', ua: 'середовище' },
  ],
  [
    { en: 'Realistic', ua: 'Реалістична' },
    { en: 'Weapon', ua: 'зброя' },
  ],
  [
    { en: 'Motion', ua: 'Відстеження' },
    { en: 'Tracking', ua: 'рухів' },
  ],
]

function MobileHero() {
  return (
    // One screen tall: the copy under the header, the soldier standing on the
    // bottom edge in whatever height is left.
    <section id="top" className="flex h-[100svh] flex-col overflow-hidden bg-canvas">
      <div className="px-3 pt-[147px]">
        <HeroHeadline />
        <CtaButtons />
      </div>
      <div className="relative mt-4 min-h-0 flex-1">
        <img
          src={AIMING}
          alt="ATMARAKSI VR training soldier"
          fetchPriority="high"
          className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none"
          style={{ maxHeight: FRAME_HEIGHT }}
          draggable={false}
        />
      </div>
    </section>
  )
}

function MobileAbout() {
  const t = useT()
  return (
    <section id="about" className="scroll-mt-[130px] bg-canvas px-3 pb-16">
      <ul className="grid h-[62px] grid-cols-3 items-center rounded-lg bg-paper text-center text-[12px] uppercase leading-[1.2]">
        {CALLOUTS.map(([title, subtitle], i) => (
          <li key={title.en} className={i > 0 ? 'border-l-[0.5px] border-muted/40' : ''}>
            <span className="block text-ink">{t(title)}</span>
            <span className="block font-light text-muted">{t(subtitle)}</span>
          </li>
        ))}
      </ul>

      <Headline className="mt-24" />

      {/* The frame is wider than the screen; only its middle, where he
          stands, is shown. */}
      <div className="-mx-3 mt-6 flex justify-center overflow-hidden">
        <img src={STANDING} alt="" className="h-[365px] max-w-none select-none" draggable={false} />
      </div>

      <p className="mt-6 text-[16px] font-light leading-[1.2] text-[#929292]">
        <AboutText />
      </p>

      <div className="mt-6 flex items-end justify-between">
        <p className="text-[12px] font-light uppercase leading-[1.25]">
          <PlatformLabel />
        </p>
        <span className="flex h-6 w-6 items-center justify-center">
          <ProductMark width={16} height={17} className="text-ink" />
        </span>
      </div>
    </section>
  )
}

export default function MobileIntro() {
  return (
    <>
      <MobileHero />
      <MobileAbout />
    </>
  )
}
