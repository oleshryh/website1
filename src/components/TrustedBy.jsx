import { useT } from '../i18n'
import { url } from '../routes'

// Badges of the units that train on the systems, exported from Figma at 3×.
// Widths as in the design: every badge is 48px tall, some are wider.
const UNITS = [
  { src: url('units/unit-1.png'), w: 48 },
  { src: url('units/unit-2.png'), w: 48 },
  { src: url('units/unit-3.png'), w: 48 },
  { src: url('units/unit-4.png'), w: 54 },
  { src: url('units/unit-5.png'), w: 42 },
  { src: url('units/unit-6.png'), w: 59 },
]

export default function TrustedBy() {
  const t = useT()
  return (
    <section className="relative flex flex-col items-center bg-canvas px-6 pb-12 pt-24 lg:min-h-[650px] lg:pb-0 lg:pt-[188px]">
      <blockquote className="max-w-[856px] text-center text-[24px] font-light leading-[1.2] sm:text-[32px] lg:text-[44px]">
        {t({
          en: (
            <>
              Our goal{' '}
              <span className="font-thin text-muted">
                is not to simulate combat,
                <br className="hidden lg:block" /> but
              </span>{' '}
              to create conditions{' '}
              <span className="font-thin text-muted">
                where every
                <br className="hidden lg:block" /> decision and action carries the weight
              </span>{' '}
              of reality.
            </>
          ),
          ua: (
            <>
              Наша мета{' '}
              <span className="font-thin text-muted">
                — не імітувати бій,
                <br className="hidden lg:block" /> а
              </span>{' '}
              створити умови,{' '}
              <span className="font-thin text-muted">
                у яких кожне
                <br className="hidden lg:block" /> рішення й дія мають вагу
              </span>{' '}
              реальності.
            </>
          ),
        })}
      </blockquote>

      {/* Bottom right on a wide screen, centred under the quote otherwise. */}
      <div className="mt-16 flex flex-col items-center gap-3 lg:absolute lg:bottom-6 lg:right-6 lg:mt-0 lg:items-end">
        <p className="text-[12px] font-light uppercase text-muted">
          {t({
            en: (
              <>
                Trusted by <span className="font-medium">100+</span> Ukrainian units
              </>
            ),
            ua: (
              <>
                Нам довіряють <span className="font-medium">100+</span> українських підрозділів
              </>
            ),
          })}
        </p>
        <ul className="flex max-w-[215px] flex-wrap justify-center gap-1 lg:max-w-none">
          {UNITS.map(({ src, w }) => (
            <li
              key={src}
              className="rounded bg-paper p-2 shadow-[0_4px_10px_rgba(69,69,69,0.15)]"
            >
              <img src={src} alt="" width={w} height={48} className="h-12" style={{ width: w }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
