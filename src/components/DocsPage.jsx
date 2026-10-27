import { DOCS } from '../data/docs'
import { EMAIL, PHONE } from '../data/socials'
import { useT } from '../i18n'
import PageShell, { PageHeading } from './PageShell'
import ProductMark from './ProductMark'

const pad = (n) => String(n).padStart(2, '0')

// Documentation — a placeholder: the sections the manuals will cover, each
// marked as coming soon, and who to ask in the meantime.
export default function DocsPage() {
  const t = useT()

  return (
    <PageShell>
      <PageHeading
        label={{ en: '// documentation', ua: '// документація' }}
        title={{ en: 'Everything about', ua: 'Усе про роботу' }}
        thin={{ en: 'working with the platform.', ua: 'з платформою.' }}
        lead={{
          en: 'Manuals for instructors and technicians are being prepared. Here is what they will cover.',
          ua: 'Посібники для інструкторів і техніків готуються. Ось що в них буде.',
        }}
      />

      <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {DOCS.map(({ title, text }, i) => (
          <li key={title.en} className="flex min-h-[220px] flex-col justify-between rounded-xl bg-paper p-6">
            <div className="flex items-center justify-between text-[14px] text-muted">
              <span>{pad(i + 1)}</span>
              <ProductMark width={16} height={17} className="text-ink" />
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <h2 className="text-[24px] text-ink">{t(title)}</h2>
              <p className="text-[16px] font-light leading-[1.3] text-[#929292]">{t(text)}</p>
            </div>
            <p className="mt-6 text-[12px] uppercase text-muted">
              {t({ en: '// PDF · coming soon', ua: '// PDF · незабаром' })}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-[16px] font-light text-[#929292]">
        {t({ en: 'Need something now? ', ua: 'Потрібно щось уже зараз? ' })}
        <a href={`mailto:${EMAIL}`} className="text-ink underline underline-offset-4">
          {EMAIL}
        </a>{' '}
        ·{' '}
        <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-ink underline underline-offset-4">
          {PHONE}
        </a>
      </p>
    </PageShell>
  )
}
