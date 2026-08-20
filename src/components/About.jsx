import useScrollFade from './useScrollFade'

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
  // Fades in only after the first screen's copy is fully gone at 0.3, then
  // stays for the rest of the scroll — this is the final state.
  const opacity = useScrollFade(progress, [0.42, 0.55], [0, 1])

  return (
    <section
      id="about"
      style={{ opacity }}
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute left-6 right-6 top-[45.3%] md:left-9 md:right-9">
        <h2 className="mb-3 max-w-[497px] text-[17px] font-medium leading-[21px] sm:mb-4 sm:text-[19px] sm:leading-[23px] lg:text-[22px] lg:leading-[27px]">
          We develop next-generation <span className="text-muted">VR training systems</span>
          <br className="hidden lg:inline" />{' '}
          and electronic solutions for mission readiness.
        </h2>
        <p className="max-w-[333px] text-[13px] font-light leading-[17px] text-muted sm:text-[14px] sm:leading-[18px] lg:text-[16px] lg:leading-[19px]">
          Combining software, simulation technologies,
          <br className="hidden lg:inline" />{' '}
          and custom hardware, we create realistic
          <br className="hidden lg:inline" />{' '}
          training environments for developing skills and
          <br className="hidden lg:inline" />{' '}
          preparing specialists for real-world scenarios.
        </p>
      </div>

      <div className="absolute right-9 top-[71.4%] hidden space-y-6 text-right lg:block">
        {SERVICES.map(({ title, lines }) => (
          <div key={title}>
            <h3 className="text-[16px] font-medium uppercase leading-[19px]">{title}</h3>
            <p className="text-[16px] font-light leading-[19px] text-muted">
              {lines[0]}
              <br className="hidden lg:inline" />{' '}
              {lines[1]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
