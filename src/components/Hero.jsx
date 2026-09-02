import { useRef, useState } from 'react'
import DemoModal from './DemoModal'
import PillButton from './PillButton'
import { copyColumn, copySlot, figureBox } from './heroLayout'
import useScrollFade from './useScrollFade'
import useViewport from './useViewport'

// Horizontal run of the diagonal per pixel of rise — keeps its angle constant.
const DIAGONAL_SLOPE = 45 / 62
const DOT_RADIUS = 3
const PAD = 4
// The label sits this far above the point the line leaves the figure, which
// keeps the diagonal at the same angle whatever size the figure is.
const RISE = 62
// Preferred run of the flat stretch, and the shortest one that still leaves
// room for the diagonal.
const RUN = 180
const MIN_RUN = 78

// Leader line: rises diagonally off the figure, then runs flat to a dot by the
// label. The tip tracks the figure while the label stays put, so the flat run
// simply takes up whatever distance is left between them.
function Callout({ tipX, tipY, labelLeft, labelTop, labelWidth, title, subtitle }) {
  const lineY = labelTop + 8
  const dotX = labelLeft - 12
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
          stroke="#929292"
          strokeWidth="1"
        />
        <circle cx={width} cy={PAD} r={DOT_RADIUS} fill="#929292" />
      </svg>
      <span
        className="absolute text-[12px] font-normal leading-[1.35]"
        style={{ left: labelLeft, top: labelTop, width: labelWidth }}
      >
        <span className="text-[#0A0A0A]">{title}</span>{' '}
        <span className="text-[#929292]">{subtitle}</span>
      </span>
    </>
  )
}

export function CtaButtons({ onContact }) {
  const [demoOpen, setDemoOpen] = useState(false)
  const [demoOrigin, setDemoOrigin] = useState(null)
  const demoRef = useRef(null)

  const openDemo = () => {
    const rect = demoRef.current?.getBoundingClientRect()
    if (rect) setDemoOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setDemoOpen(true)
  }

  return (
    <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-9">
      <PillButton
        href="#contact"
        onClick={(event) => {
          if (!onContact) return
          event.preventDefault()
          onContact()
        }}
      >
        Contact Us
      </PillButton>
      <button
        type="button"
        ref={demoRef}
        onClick={openDemo}
        className="text-sm font-normal underline underline-offset-4 sm:text-[15px] lg:text-base"
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
    title: 'Digital',
    subtitle: 'Environment',
    tip: { fx: 0.478, fy: 0.126 },
    labelWidth: 150,
  },
  {
    title: 'Realistic',
    subtitle: 'Weapon Integration',
    tip: { fx: 0.679, fy: 0.319 },
    labelWidth: 124,
  },
]

// Rendered under the figure so the leader lines disappear behind the soldier.
export function HeroCallouts({ progress }) {
  const opacity = useScrollFade(progress, [0, 0.08], [1, 0])

  const { w: vw, h: vh } = useViewport()
  const box = figureBox(vw, vh)

  return (
    // Only from xl up: below that the figure reaches close enough to the right
    // edge that the lines would have nowhere to run.
    <div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden xl:block"
    >
      {CALLOUTS.map(({ tip, ...rest }) => {
        const tipX = box.left + tip.fx * box.width
        const tipY = box.top + tip.fy * box.height
        const labelLeft = Math.max(
          tipX + MIN_RUN,
          Math.min(tipX + RUN, vw - 36 - rest.labelWidth),
        )
        return (
          <Callout
            key={rest.title}
            tipX={tipX}
            tipY={tipY}
            labelLeft={labelLeft}
            labelTop={tipY - RISE}
            {...rest}
          />
        )
      })}
    </div>
  )
}

export default function Hero({ progress, exit, onContact }) {
  const { w: vw, h: vh } = useViewport()
  const box = figureBox(vw, vh)
  // Headline block and quote fade together, well before the second screen
  // arrives. The CTAs never fade — until the third screen takes over.
  const textOpacity = useScrollFade(progress, [0.12, 0.3], [1, 0])
  const exitOpacity = useScrollFade(exit, [0.05, 0.25], [1, 0])

  return (
    // The section covers the whole stage, so once it has faded it has to stop
    // taking pointer events or it swallows every click on the product list.
    <section
      id="top"
      style={{ opacity: exitOpacity, pointerEvents: exitOpacity === 0 ? 'none' : undefined }}
      className="absolute inset-0"
    >
      <div className="absolute" style={copySlot(vw, vh)}>
        <div style={copyColumn(vw, vh)}>
          <div style={{ opacity: textOpacity }}>
            <p className="mb-3 text-[13px] font-light text-muted sm:mb-4 sm:text-[14px] lg:text-[16px]">
              Immersive VR Training Environment
            </p>
            <h1 className="mb-7 text-[17px] font-medium leading-snug sm:mb-8 sm:text-[19px] lg:mb-9 lg:text-[22px]">
              Advanced virtual reality software designed for{' '}
              <span className="text-muted">realistic</span> military training{' '}
              <span className="text-muted">scenarios</span> and professional skills development.
            </h1>
          </div>
          <CtaButtons onContact={onContact} />
        </div>
      </div>

      {/* Bottom right, beside him — except in a window too narrow for him to
          stand in the middle, where that corner is where he ends up. */}
      <blockquote
        style={{
          opacity: textOpacity,
          top: box.centred ? 'auto' : '22%',
          bottom: box.centred ? 96 : 'auto',
        }}
        className="pointer-events-none absolute right-6 hidden w-[310px] text-right text-[15px] font-light leading-[1.45] text-ink/70 md:right-9 lg:block xl:text-[16px]"
      >
        "The future of professional training begins with technology that transforms
        virtual scenarios into real experience."
      </blockquote>
    </section>
  )
}
