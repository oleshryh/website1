import { useRef } from 'react'
import { useT } from '../i18n'
import { copySlot, view } from './heroLayout'
import ProductMark from './ProductMark'
import { useReportCopyHeight } from './stackedCopy'
import useScrollFade from './useScrollFade'
import useViewport from './useViewport'

// The design lines the headline and the paragraph up with the top of the social
// rail, which is centred on the window and 168px tall.
const TOP = 'calc(50% - 84px)'
// The paragraph and the shield stop short of the rail: 24px margin, 36px rail,
// 25px gap.
const RIGHT = 85

// The second screen's texts, shared with the phone layout.
export function Headline({ className = '' }) {
  const t = useT()
  return (
    <h2 className={`text-[24px] font-light leading-[1.22] sm:text-[28px] lg:text-[32px] ${className}`}>
      {t({
        en: (
          <>
            We develop next-generation{' '}
            <span className="font-thin text-muted">VR training systems</span> and electronic
            solutions for mission readiness.
          </>
        ),
        ua: (
          <>
            Ми розробляємо <span className="font-thin text-muted">VR-системи підготовки</span>{' '}
            нового покоління та електронні рішення для бойової готовності.
          </>
        ),
      })}
    </h2>
  )
}

export function AboutText() {
  const t = useT()
  return t({
    en: (
      <>
        Our VR training systems enable <span className="text-ink">safe practice</span> without live
        ammunition, reduce costs, and allow repeated exercises.
        <br />
        <br />
        <span className="text-ink">Realistic scenarios</span> and performance tracking help
        military personnel develop practical skills, assess progress, and identify mistakes.
      </>
    ),
    ua: (
      <>
        Наші VR-тренажери дають змогу <span className="text-ink">безпечно тренуватися</span> без
        бойових набоїв, скорочують витрати й дозволяють повторювати вправи стільки, скільки
        потрібно.
        <br />
        <br />
        <span className="text-ink">Реалістичні сценарії</span> та відстеження результатів
        допомагають військовим відпрацьовувати практичні навички, оцінювати прогрес і бачити
        помилки.
      </>
    ),
  })
}

export function PlatformLabel() {
  const t = useT()
  return (
    <>
      Atmaraksi
      <br />
      {t({ en: 'VR platform', ua: 'VR-платформа' })}
      <br />
      (2026)
    </>
  )
}

export default function About({ progress }) {
  const { w: vw, h: vh } = useViewport()
  const stacked = view(vw, vh) === 'stacked'
  const copyRef = useRef(null)
  useReportCopyHeight('about', copyRef, stacked)
  // Fades in once the first screen's copy is gone (0.06): about 0.9–1.3s into
  // the flight. The flight's sine curve moves slowly at its ends, so these
  // numbers sit low to land early in time.
  const opacity = useScrollFade(progress, [0.13, 0.26], [0, 1])

  return (
    <section
      id="about"
      style={{ opacity }}
      className="pointer-events-none absolute inset-0"
    >
      {stacked ? (
        // Above him, in the slot the first screen's copy just left.
        <div ref={copyRef} className="absolute" style={copySlot(vw, vh)}>
          <Headline />
        </div>
      ) : (
        <>
          <div className="absolute left-6 max-w-[453px]" style={{ top: TOP }}>
            <Headline />
          </div>

          <p
            className="absolute w-[393px] text-right text-[16px] font-light leading-[1.2] text-[#929292]"
            style={{ top: TOP, right: RIGHT }}
          >
            <AboutText />
          </p>

          <p className="absolute bottom-[46px] left-6 text-[12px] font-light uppercase leading-[1.25]">
            <PlatformLabel />
          </p>

          <span
            className="absolute bottom-[46px] flex h-6 w-6 items-center justify-center"
            style={{ right: RIGHT }}
          >
            <ProductMark width={16} height={17} className="text-ink" />
          </span>
        </>
      )}
    </section>
  )
}
