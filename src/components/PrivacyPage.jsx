import { PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_UPDATED } from '../data/privacy'
import { EMAIL, PHONE } from '../data/socials'
import { useT } from '../i18n'
import Footer from './Footer'
import Header from './Header'

// The privacy policy, in the site's type: label and headline as every block
// opens, then the sections in one readable column. Texts — src/data/privacy.js.
export default function PrivacyPage() {
  const t = useT()

  return (
    <div className="bg-canvas">
      <Header />

      <main className="px-6 pb-[124px] pt-[180px] lg:pt-[220px]">
        <p className="mb-3 text-[12px] uppercase leading-[14px] text-muted">
          {t({ en: '// legal', ua: '// правова інформація' })}
        </p>
        <h1 className="mb-2 text-[24px] font-light leading-[1.22] sm:text-[28px] lg:text-[32px]">
          {t({ en: 'Privacy policy', ua: 'Політика конфіденційності' })}
        </h1>
        <p className="mb-12 text-[14px] font-light text-muted">{t(PRIVACY_UPDATED)}</p>

        <div className="flex max-w-[720px] flex-col gap-10 text-[16px] font-light leading-[1.45]">
          <p>{t(PRIVACY_INTRO)}</p>

          {PRIVACY_SECTIONS.map(({ title, paragraphs }) => (
            <section key={title.en} className="flex flex-col gap-3">
              <h2 className="text-[18px] font-medium">{t(title)}</h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.en} className="text-ink/80">
                  {t(paragraph)}
                </p>
              ))}
            </section>
          ))}

          <section className="flex flex-col gap-3">
            <h2 className="text-[18px] font-medium">{t({ en: 'Contacts', ua: 'Контакти' })}</h2>
            <p className="text-ink/80">
              ATMARAKSI ·{' '}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                {EMAIL}
              </a>{' '}
              ·{' '}
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="underline underline-offset-4">
                {PHONE}
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
