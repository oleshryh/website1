import { TALK_TO_SALES } from '../data/copy'
import { useT } from '../i18n'
import { CONTACT_PATH } from '../routes'
import Cover from './Cover'
import PageShell from './PageShell'
import PillButton from './PillButton'

// One long read, shared by case studies and blog posts: a way back, the
// headline and lead, a row of facts, a large cover, the sections of text, an
// optional pull quote, and the way to sales at the end.
export default function ArticlePage({ back, label, title, lead, facts, cover, fit, body, quote }) {
  const t = useT()

  return (
    <PageShell>
      <article className="mx-auto max-w-[920px]">
        <a
          href={back.href}
          className="mb-10 inline-block text-[14px] font-light underline underline-offset-4 transition-colors hover:text-[#929292]"
        >
          ← {t(back.label)}
        </a>
        <p className="mb-3 text-[12px] uppercase leading-[14px] text-muted">{t(label)}</p>
        <h1 className="mb-4 text-[28px] font-light leading-[1.2] lg:text-[44px]">{t(title)}</h1>
        <p className="mb-8 max-w-[640px] text-[20px] font-thin leading-[1.25] text-muted lg:text-[24px]">
          {t(lead)}
        </p>

        <dl className="mb-10 flex flex-wrap gap-x-10 gap-y-3 border-t-[0.5px] border-muted/50 pt-4 text-[12px] uppercase">
          {facts.map(({ term, value }) => (
            <div key={term.en} className="flex flex-col gap-1">
              <dt className="text-muted">{t(term)}</dt>
              <dd className="text-ink">{t(value)}</dd>
            </div>
          ))}
        </dl>

        <Cover src={cover} fit={fit} className="mb-14 aspect-[16/9]" />

        <div className="flex max-w-[680px] flex-col gap-10 text-[17px] font-light leading-[1.55]">
          {body.map(({ heading, paragraphs }, i) => (
            <section key={heading?.en ?? i} className="flex flex-col gap-4">
              {heading && <h2 className="text-[24px] font-light leading-[1.2]">{t(heading)}</h2>}
              {paragraphs.map((paragraph, j) => (
                <p key={j} className="text-ink/80">
                  {t(paragraph)}
                </p>
              ))}
            </section>
          ))}

          {quote && (
            <figure className="rounded-xl bg-paper p-8">
              <blockquote className="text-[22px] font-light leading-[1.25] lg:text-[26px]">
                {t(quote.text)}
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase text-muted">{t(quote.author)}</figcaption>
            </figure>
          )}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 rounded-xl bg-ink p-8 text-paper md:flex-row md:items-center md:justify-between lg:p-12">
          <p className="text-[24px] font-thin leading-[1.2] lg:text-[32px]">
            {t({ en: 'Want the same for your unit?', ua: 'Хочете так само для свого підрозділу?' })}
          </p>
          <PillButton variant="light" href={CONTACT_PATH}>
            {t(TALK_TO_SALES)}
          </PillButton>
        </div>
      </article>
    </PageShell>
  )
}
