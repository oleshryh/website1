import { NAV, TALK_TO_SALES } from '../data/copy'
import { useT } from '../i18n'
import { CONTACT_PATH, url } from '../routes'
import Footer from './Footer'
import Header from './Header'
import PillButton from './PillButton'
import { ProductArt } from './Products'

// A placeholder page for each training system, until the design has one: the
// card's number, name and line, its picture at a larger size, a note that the
// full page is coming, and the way to sales. Built from the home page's pieces.
export default function ProductPage({ product: { number, title, tagline, art, notes } }) {
  const t = useT()

  return (
    <div className="bg-canvas">
      <Header />

      <main className="grid items-center gap-12 px-6 pb-[124px] pt-[180px] lg:min-h-[100svh] lg:grid-cols-2 lg:gap-6 lg:pt-[160px]">
        <div>
          <a
            href={url('#products')}
            className="mb-10 inline-block text-[14px] font-light underline underline-offset-4 transition-colors hover:text-[#929292]"
          >
            ← {t({ en: 'All products', ua: 'Усі продукти' })}
          </a>
          <p className="mb-3 text-[12px] uppercase leading-[14px] text-muted">
            // {t(NAV.products)} {number}
          </p>
          <h1 className="mb-2 text-[28px] font-light leading-[1.22] lg:text-[44px]">{t(title)}</h1>
          <p className="mb-8 text-[20px] font-thin leading-[1.2] text-muted lg:text-[24px]">
            {t(tagline)}
          </p>
          <p className="mb-10 max-w-[420px] text-[16px] font-light leading-[1.2] text-[#929292]">
            {t({
              en: 'A full page about this training system is on its way. Meanwhile we are glad to tell you everything in person and arrange a demo.',
              ua: 'Детальна сторінка про цей тренажер незабаром з’явиться. А поки що ми із задоволенням розповімо все особисто й організуємо демонстрацію.',
            })}
          </p>
          <PillButton href={CONTACT_PATH}>{t(TALK_TO_SALES)}</PillButton>
        </div>

        <div className="rounded-xl bg-paper px-6 py-12">
          <ProductArt art={art} notes={notes} grow={1.8} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
