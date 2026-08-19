import { motion, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function Callout({ style, title, subtitle }) {
  return (
    <div className="absolute flex items-center gap-3 text-sm" style={style}>
      <span className="h-px w-9 bg-ink/40" />
      <span>
        <span className="font-semibold text-ink">{title}</span>{' '}
        <span className="text-muted">{subtitle}</span>
      </span>
    </div>
  )
}

export function CtaButtons() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <a
        href="#contact"
        className="flex items-center gap-4 rounded-full bg-ink py-2.5 pl-8 pr-2.5 text-base font-medium text-white"
      >
        Contact Us
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink">
          <ArrowRight size={20} />
        </span>
      </a>
      <a href="#demo" className="text-base font-medium underline underline-offset-4">
        View Demo
      </a>
    </div>
  )
}

export default function Hero({ progress }) {
  const opacity = useTransform(progress, [0, 0.35, 0.48], [1, 1, 0])
  const calloutOpacity = useTransform(progress, [0, 0.1], [1, 0])

  return (
    <motion.section
      id="top"
      style={{ opacity }}
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-14"
    >
      <div className="max-w-sm lg:max-w-md">
        <p className="mb-4 text-sm text-muted">Immersive VR Training Environment</p>
        <h1 className="mb-8 text-3xl font-semibold leading-snug md:text-4xl">
          Advanced virtual reality software designed for realistic military training
          scenarios and professional skills development.
        </h1>
        <CtaButtons />
      </div>

      <motion.div
        style={{ opacity: calloutOpacity }}
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <Callout style={{ left: '63%', top: '24%' }} title="Digital" subtitle="Environment" />
        <Callout
          style={{ left: '80%', top: '48%' }}
          title="Realistic"
          subtitle="Weapon Integration"
        />
      </motion.div>

      <motion.blockquote
        style={{ opacity: calloutOpacity }}
        className="pointer-events-none absolute bottom-16 right-6 hidden max-w-xs text-right text-sm italic text-ink/70 md:right-14 lg:block"
      >
        "The future of professional training begins with technology that transforms
        virtual scenarios into real experience."
      </motion.blockquote>
    </motion.section>
  )
}
