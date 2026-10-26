import { Headline } from './About'
import { CtaButtons, HeroHeadline } from './Hero'
import ProductMark from './ProductMark'

// The first two screens on a phone, as in the mobile design: no animation and
// no flight between them — two ordinary blocks, each with the soldier still.
// Both pictures are frames of the same clip: the first (aiming) and the last
// (standing square), from the light set made for phones.
const AIMING = '/frames-sm/frame-000.webp'
const STANDING = '/frames-sm/frame-060.webp'

// Each frame is 800×494 with transparent margins around him. Sized so that,
// as in the mobile design, he fills the screen from edge to edge — the frame
// itself runs past both sides and is cut off by the section.
const FRAME_WIDTH = 'calc((100vw - 24px) / 0.57)'

const CALLOUTS = [
  ['Digital', 'Environment'],
  ['Realistic', 'Weapon'],
  ['Motion', 'Tracking'],
]

function MobileHero() {
  return (
    // One screen tall, the soldier standing on its bottom edge.
    <section id="top" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-canvas">
      <div className="relative z-10 px-3 pt-[147px]">
        <HeroHeadline />
        <CtaButtons />
      </div>
      <img
        src={AIMING}
        alt="ATMARAKSI VR training soldier"
        className="absolute bottom-0 left-1/2 max-w-none -translate-x-1/2 select-none"
        style={{ width: FRAME_WIDTH }}
        draggable={false}
      />
    </section>
  )
}

function MobileAbout() {
  return (
    <section id="about" className="bg-canvas px-3 pb-16">
      <ul className="grid h-[62px] grid-cols-3 items-center rounded-lg bg-paper text-center text-[12px] uppercase leading-[1.2]">
        {CALLOUTS.map(([title, subtitle], i) => (
          <li key={title} className={i > 0 ? 'border-l-[0.5px] border-muted/40' : ''}>
            <span className="block text-ink">{title}</span>
            <span className="block font-light text-muted">{subtitle}</span>
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
        Our VR training systems enable <span className="text-ink">safe practice</span> without
        live ammunition, reduce costs, and allow repeated exercises.
        <br />
        <br />
        <span className="text-ink">Realistic scenarios</span> and performance tracking help
        military personnel develop practical skills, assess progress, and identify mistakes.
      </p>

      <div className="mt-6 flex items-end justify-between">
        <p className="text-[12px] font-light uppercase leading-[1.25]">
          Atmaraksi
          <br />
          VR platform
          <br />
          (2026)
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
