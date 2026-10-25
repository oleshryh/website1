import { useRef } from 'react'
import { clearsFigure, copyColumn, copySlot, CTA_SPACER, figureBox } from './heroLayout'
import { useReportCopyHeight } from './stackedCopy'
import useScrollFade from './useScrollFade'
import useViewport from './useViewport'

const SERVICES_WIDTH = 430

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

export default function About({ progress, exit }) {
  const { w: vw, h: vh } = useViewport()
  const box = figureBox(vw, vh)
  const copyRef = useRef(null)
  useReportCopyHeight('about', copyRef)
  // Fades in only after the first screen's copy is fully gone at 0.3, then
  // holds until the third screen clears the stage for the product list.
  const opacity =
    useScrollFade(progress, [0.42, 0.55], [0, 1]) * useScrollFade(exit, [0.05, 0.28], [1, 0])

  return (
    <section
      id="about"
      style={{ opacity }}
      className="pointer-events-none absolute inset-0"
    >
      {/* The same slot the first screen writes into, so this copy takes its
          place rather than landing somewhere else on the screen — and the
          buttons underneath stay clear of it. */}
      <div ref={copyRef} className="absolute" style={copySlot(vw, vh)}>
        <div style={copyColumn(vw, vh)}>
          <h2 className="mb-3 text-[17px] font-medium leading-[21px] sm:mb-4 sm:text-[19px] sm:leading-[23px] lg:text-[22px] lg:leading-[27px]">
            We develop next-generation <span className="text-muted">VR training systems</span>{' '}
            and electronic solutions for mission readiness.
          </h2>
          <p className="text-[13px] font-light leading-[17px] text-muted sm:text-[14px] sm:leading-[18px] lg:text-[16px] lg:leading-[19px]">
            Combining software, simulation technologies, and custom hardware, we create
            realistic training environments for developing skills and preparing specialists
            for real-world scenarios.
          </p>
          <div aria-hidden="true" className={CTA_SPACER} />
        </div>
      </div>

      {/* Beside him on the right, and above his head instead in a window too
          narrow for him to stand in the middle. */}
      <div
        style={
          clearsFigure(box, vw, SERVICES_WIDTH)
            ? { top: '71.4%', width: SERVICES_WIDTH }
            : { top: '19%', width: SERVICES_WIDTH }
        }
        className="absolute right-6 hidden space-y-5 text-right md:right-9 lg:block"
      >
        {SERVICES.map(({ title, lines }) => (
          <div key={title}>
            <h3 className="text-[14px] font-medium uppercase leading-[18px] xl:text-[16px] xl:leading-[19px]">
              {title}
            </h3>
            <p className="text-[14px] font-light leading-[18px] text-muted xl:text-[16px] xl:leading-[19px]">
              {lines[0]}
              <br className="hidden xl:inline" />{' '}
              {lines[1]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
