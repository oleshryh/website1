import { motion, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Leader line: rises diagonally from the figure, then runs flat to a dot by the label.
function Callout({ style, title, subtitle, width, height, elbow, labelWidth }) {
  const y = 8

  return (
    <div className="absolute flex items-start text-[12px] font-normal" style={style}>
      <svg width={width} height={height} fill="none" className="shrink-0">
        <path
          d={`M0 ${height} L${elbow} ${y} H${width - 4}`}
          stroke="#929292"
          strokeWidth="1"
        />
        <circle cx={width - 4} cy={y} r="3" fill="#929292" />
      </svg>
      <span className="ml-2 leading-[1.35]" style={{ width: labelWidth }}>
        <span className="text-[#0A0A0A]">{title}</span>{' '}
        <span className="text-[#929292]">{subtitle}</span>
      </span>
    </div>
  )
}

export function CtaButtons() {
  return (
    <div className="flex flex-wrap items-center gap-9">
      <a
        href="#contact"
        className="group flex h-12 items-center gap-3 rounded-[4px] bg-ink px-7 text-base font-medium text-white shadow-sm transition-colors duration-300 hover:bg-ink/80"
      >
        Contact Us
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
      <a href="#demo" className="text-base font-normal underline underline-offset-4">
        View Demo
      </a>
    </div>
  )
}

// Rendered under the figure so the leader lines disappear behind the soldier.
export function HeroCallouts({ progress }) {
  const opacity = useTransform(progress, [0, 0.1], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <Callout
        style={{ left: '48.5%', top: '33%' }}
        title="Digital"
        subtitle="Environment"
        width={260}
        height={70}
        elbow={45}
        labelWidth={150}
      />
      <Callout
        style={{ left: '62.1%', top: '45.9%' }}
        title="Realistic"
        subtitle="Weapon Integration"
        width={260}
        height={70}
        elbow={40}
        labelWidth={110}
      />
    </motion.div>
  )
}

export default function Hero({ progress }) {
  // Headline block and quote fade together; the CTAs never fade.
  const textOpacity = useTransform(progress, [0.35, 0.48], [1, 0])

  return (
    <section
      id="top"
      className="absolute inset-0 flex flex-col justify-end px-6 pb-24 md:px-14"
    >
      <div className="max-w-[442px]">
        <motion.div style={{ opacity: textOpacity }}>
          <p className="mb-4 text-[16px] font-light text-muted">
            Immersive VR Training Environment
          </p>
          <h1 className="mb-9 text-[22px] font-medium leading-snug">
            Advanced virtual reality software designed for{' '}
            <span className="text-muted">realistic</span> military training{' '}
            <span className="text-muted">scenarios</span> and professional skills development.
          </h1>
        </motion.div>
        <CtaButtons />
      </div>

      <motion.blockquote
        style={{ opacity: textOpacity }}
        className="pointer-events-none absolute bottom-24 right-6 hidden w-[310px] text-right text-[16px] font-light text-ink/70 md:right-14 lg:block"
      >
        "The future of professional training begins with technology that transforms
        virtual scenarios into real experience."
      </motion.blockquote>
    </section>
  )
}
