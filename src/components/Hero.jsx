import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import DemoModal from './DemoModal'
import useScrollFade from './useScrollFade'

// The figure is bottom-anchored, centred, and two thirds of the viewport tall,
// so its box can be derived from the window alone.
const FIGURE_ASPECT = 800 / 494
// Horizontal run of the diagonal per pixel of rise — keeps its angle constant.
const DIAGONAL_SLOPE = 45 / 62
const DOT_RADIUS = 3
const PAD = 4

function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}

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
    <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-9">
      <a
        href="#contact"
        className="group flex h-11 items-center gap-2.5 rounded-[4px] bg-ink px-5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-ink/80 sm:gap-3 sm:px-6 sm:text-[15px] lg:h-12 lg:px-7 lg:text-base"
      >
        Contact Us
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1 lg:h-[18px] lg:w-[18px]"
        />
      </a>
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
// goggles and the weapon at any window size; the label sits at a fixed spot.
const CALLOUTS = [
  {
    title: 'Digital',
    subtitle: 'Environment',
    tip: { fx: 0.478, fy: 0.126 },
    label: { leftRatio: 0.485, leftOffset: 268, topRatio: 0.33 },
    labelWidth: 150,
  },
  {
    title: 'Realistic',
    subtitle: 'Weapon Integration',
    tip: { fx: 0.679, fy: 0.319 },
    label: { leftRatio: 0.621, leftOffset: 268, topRatio: 0.459 },
    labelWidth: 110,
  },
]

// Rendered under the figure so the leader lines disappear behind the soldier.
export function HeroCallouts({ progress }) {
  const opacity = useScrollFade(progress, [0, 0.08], [1, 0])

  const { w: vw, h: vh } = useViewport()

  // Mirrors the lg sizing rule in SoldierScrollFigure.
  const figureHeight = Math.min((vh * 2) / 3, vw * 0.45)
  const figureWidth = figureHeight * FIGURE_ASPECT
  const figureX = (vw - figureWidth) / 2
  const figureY = vh - figureHeight

  return (
    <div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {CALLOUTS.map(({ tip, label, ...rest }) => (
        <Callout
          key={rest.title}
          tipX={figureX + tip.fx * figureWidth}
          tipY={figureY + tip.fy * figureHeight}
          labelLeft={label.leftRatio * vw + label.leftOffset}
          labelTop={label.topRatio * vh}
          {...rest}
        />
      ))}
    </div>
  )
}

export default function Hero({ progress, exit }) {
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
      className="absolute inset-0 flex flex-col justify-start px-6 pt-44 sm:justify-end sm:pb-24 sm:pt-0 md:px-9"
    >
      <div className="max-w-full sm:max-w-[min(442px,60vw)] lg:max-w-[442px]">
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
        <CtaButtons />
      </div>

      <blockquote
        style={{ opacity: textOpacity }}
        className="pointer-events-none absolute bottom-24 right-6 hidden w-[310px] text-right text-[16px] font-light text-ink/70 md:right-9 lg:block"
      >
        "The future of professional training begins with technology that transforms
        virtual scenarios into real experience."
      </blockquote>
    </section>
  )
}
