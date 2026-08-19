import { motion, useTransform } from 'framer-motion'

const SERVICES = [
  {
    title: 'VR Simulation Technology',
    lines: ['Virtual environments, simulation software,', 'motion tracking, and weapon modeling.'],
  },
  {
    title: 'Electronic Systems Engineering',
    lines: ['Custom hardware, sensors, cooling systems,', 'and specialized electronic components.'],
  },
]

export default function About({ progress }) {
  const opacity = useTransform(progress, [0.5, 0.62], [0, 1])

  return (
    <motion.section
      id="about"
      style={{ opacity }}
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute left-6 top-[36%] md:left-14">
        <h2 className="mb-6 text-[22px] font-medium leading-snug">
          We develop next-generation <span className="text-muted">VR training systems</span>
          <br />
          and electronic solutions for mission readiness.
        </h2>
        <p className="text-sm font-light leading-relaxed text-muted">
          Combining software, simulation technologies,
          <br />
          and custom hardware, we create realistic
          <br />
          training environments for developing skills and
          <br />
          preparing specialists for real-world scenarios.
        </p>
      </div>

      <div className="absolute right-6 top-[64%] hidden space-y-8 text-right md:right-14 lg:block">
        {SERVICES.map(({ title, lines }) => (
          <div key={title}>
            <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wide">{title}</h3>
            <p className="text-sm font-light leading-relaxed text-muted">
              {lines[0]}
              <br />
              {lines[1]}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
