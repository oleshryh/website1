import { useRef, useState } from 'react'
import { CONTACT_PATH } from '../routes'
import DemoModal from './DemoModal'
import PillButton from './PillButton'
import { clearsFigure, copyColumn, copySlot, figureBox, view } from './heroLayout'
import { useReportCopyHeight } from './stackedCopy'
import useScrollFade from './useScrollFade'
import useViewport from './useViewport'

// Horizontal run of the diagonal per pixel of rise: the design draws it at 45°.
const DIAGONAL_SLOPE = 1
const DOT_RADIUS = 2
const PAD = 4
// Where the label's title row sits below its top — the line meets it there.
const TITLE_DROP = 21
// Shortest flat stretch kept between the diagonal and the dot.
const MIN_FLAT = 34
// Labels stay clear of the social rail at the right edge.
const RIGHT_LANE = 24 + 36 + 24
const QUOTE_WIDTH = 275

// Leader line: rises diagonally off the figure, then runs flat to a dot by the
// label. The tip tracks the figure while the label stays put, so the flat run
// simply takes up whatever distance is left between them.
function Callout({ tipX, tipY, labelLeft, labelTop, labelWidth, number, title, subtitle }) {
  // The line meets the label at its title, under the small number.
  const lineY = labelTop + TITLE_DROP
  const dotX = labelLeft - 14
  const rise = tipY - lineY
  const elbow = rise * DIAGONAL_SLOPE
  const width = dotX - tipX

  return (
    <>
      <svg
        fill="none"
        className="absolute overflow-visible"
        style={{ left: tipX, top: lineY - PAD, width: width + PAD, height: rise + PAD }}
      >
        <path
          d={`M0 ${rise + PAD} L${elbow} ${PAD} H${width}`}
          stroke="#a7a7a7"
          strokeWidth="0.5"
        />
        <circle cx={width} cy={PAD} r={DOT_RADIUS} fill="#a7a7a7" />
      </svg>
      <span
        className="absolute text-[12px] uppercase leading-[1.2]"
        style={{ left: labelLeft, top: labelTop, width: labelWidth }}
      >
        <span className="block text-muted">{number}</span>
        <span className="text-ink">{title}</span>{' '}
        <span className="font-light text-muted">{subtitle}</span>
      </span>
    </>
  )
}

export function CtaButtons() {
  const [demoOpen, setDemoOpen] = useState(false)
  const [demoOrigin, setDemoOrigin] = useState(null)
  const demoRef = useRef(null)

  const openDemo = () => {
    const rect = demoRef.current?.getBoundingClientRect()
    if (rect) setDemoOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setDemoOpen(true)
  }

  return (
    <div className="flex flex-wrap items-center gap-4 lg:gap-[15px]">
      <PillButton href={CONTACT_PATH}>
        Talk To Sales
      </PillButton>
      <button
        type="button"
        ref={demoRef}
        onClick={openDemo}
        className="px-6 text-[16px] font-light underline underline-offset-4 max-[359px]:px-3 transition-colors hover:text-[#929292] lg:text-[18px]"
      >
        View Demo
      </button>

      <DemoModal open={demoOpen} origin={demoOrigin} onClose={() => setDemoOpen(false)} />
    </div>
  )
}

// tip is a fraction of the figure's own box, so each line keeps touching the
// goggles and the weapon at any window size; the label follows it out to the
// right, as far as the window allows.
const CALLOUTS = [
  {
    number: '01/',
    title: 'Digital',
    subtitle: 'Environment',
    tip: { fx: 0.478, fy: 0.126 },
    labelWidth: 107,
    // Label offset from the tip: puts the label where the design has it at
    // 1440px, while the line still starts on this figure's goggles.
    run: 278,
    rise: 41,
  },
  {
    number: '02/',
    title: 'Realistic',
    subtitle: 'Weapon Integration',
    tip: { fx: 0.679, fy: 0.319 },
    labelWidth: 117,
    run: 248,
    rise: 39,
  },
]

// Rendered under the figure so the leader lines disappear behind the soldier.
export function HeroCallouts({ progress }) {
  const opacity = useScrollFade(progress, [0, 0.04], [1, 0])

  const { w: vw, h: vh } = useViewport()
  const box = figureBox(vw, vh)
  // With the copy above him there is no room for labels beside him either.
  if (view(vw, vh) === 'stacked') return null

  return (
    // Not on a phone: the lines need room to the right of him that a small
    // screen does not have.
    <div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {CALLOUTS.map(({ tip, run, rise, ...rest }) => {
        const tipX = box.left + tip.fx * box.width
        const tipY = box.top + tip.fy * box.height
        const labelLeft = Math.max(
          tipX + (rise - TITLE_DROP) * DIAGONAL_SLOPE + MIN_FLAT,
          Math.min(tipX + run, vw - RIGHT_LANE - rest.labelWidth),
        )
        return (
          <Callout
            key={rest.title}
            tipX={tipX}
            tipY={tipY}
            labelLeft={labelLeft}
            labelTop={tipY - rise}
            {...rest}
          />
        )
      })}
    </div>
  )
}

// The first screen's label and headline, shared with the phone layout.
export function HeroHeadline() {
  return (
    <>
      <p className="mb-2 text-[12px] uppercase leading-[14px] text-muted lg:mb-3">
        // Electronics &amp; Software Development
      </p>
      {/* Broken into the design's three lines at every size. */}
      <h1 className="mb-6 text-[24px] font-light leading-[1.22] sm:text-[28px] lg:mb-12 lg:text-[32px]">
        Advanced <span className="font-thin text-muted">VR solutions</span>
        <br /> for <span className="font-thin text-muted">military training</span> and
        <br /> professional development.
      </h1>
    </>
  )
}

export default function Hero({ progress }) {
  const { w: vw, h: vh } = useViewport()
  const box = figureBox(vw, vh)
  const copyRef = useRef(null)
  useReportCopyHeight('hero', copyRef)
  // Headline block, buttons and quote fade together the moment the flight
  // starts — gone within about half a second.
  const textOpacity = useScrollFade(progress, [0.002, 0.06], [1, 0])

  return (
    // The section covers the whole screen, so only its buttons take clicks.
    <section id="top" className="pointer-events-none absolute inset-0">
      <div ref={copyRef} className="absolute" style={copySlot(vw, vh)}>
        <div style={copyColumn(vw, vh)}>
          <div style={{ opacity: textOpacity }}>
            <HeroHeadline />
          </div>
          {/* The second screen has no buttons of its own — the header's
              sales button takes over — so these leave with the text. */}
          <div
            style={{ opacity: textOpacity }}
            className={textOpacity === 0 ? '' : 'pointer-events-auto'}
          >
            <CtaButtons />
          </div>
        </div>
      </div>

      {/* Bottom right, beside him. It is decoration, so in a window where he
          reaches that corner it simply steps out rather than moving. */}
      {clearsFigure(box, vw, QUOTE_WIDTH) && (
        <blockquote
          style={{ opacity: textOpacity, width: QUOTE_WIDTH }}
          className="pointer-events-none absolute bottom-6 right-6 hidden text-right text-[16px] font-light leading-[1.2] text-muted lg:block"
        >
          "The future of professional training begins with technology that transforms
          virtual scenarios into real experience."
        </blockquote>
      )}
    </section>
  )
}
