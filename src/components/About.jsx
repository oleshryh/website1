import { motion, useTransform } from 'framer-motion'
import { CtaButtons } from './Hero'

const SERVICES = [
  {
    title: 'VR Simulation Technology',
    body: 'Virtual environments, simulation software, motion tracking, and weapon modeling.',
  },
  {
    title: 'Electronic Systems Engineering',
    body: 'Custom hardware, sensors, cooling systems, and specialized electronic components.',
  },
]

export default function About({ progress }) {
  const opacity = useTransform(progress, [0.42, 0.55, 1], [0, 1, 1])

  return (
    <motion.section
      style={{ opacity }}
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-14"
    >
      <div className="max-w-sm lg:max-w-md">
        <h2 className="mb-6 text-3xl font-semibold leading-snug md:text-4xl">
          We develop next-generation{' '}
          <span className="font-normal text-muted">VR training systems</span> and
          electronic solutions for mission readiness.
        </h2>
        <p className="mb-8 max-w-sm leading-relaxed text-muted">
          Combining software, simulation technologies, and custom hardware, we create
          realistic training environments for developing skills and preparing
          specialists for real-world scenarios.
        </p>
        <CtaButtons />
      </div>

      <div className="absolute right-6 top-[38%] hidden max-w-xs space-y-8 text-sm md:right-14 lg:block">
        {SERVICES.map((service) => (
          <div key={service.title}>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide">
              {service.title}
            </h3>
            <p className="text-muted">{service.body}</p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
