import { CASES } from '../data/cases'
import { useT } from '../i18n'
import { CASES_PATH, casePath } from '../routes'
import ArticlePage from './ArticlePage'
import Cover from './Cover'
import PageShell, { PageHeading } from './PageShell'

// One case as a long read, closing on the client's own quote.
export function CasePage({ story }) {
  return (
    <ArticlePage
      back={{ href: CASES_PATH, label: { en: 'All cases', ua: 'Усі кейси' } }}
      label={{ en: '// case study', ua: '// кейс' }}
      title={story.title}
      lead={story.lead}
      facts={[
        { term: { en: 'Client', ua: 'Клієнт' }, value: story.client.name },
        { term: { en: 'System', ua: 'Тренажер' }, value: story.product.title },
      ]}
      cover={story.cover}
      fit={story.fit}
      body={story.body}
      quote={{ text: story.client.quote, author: story.client.author }}
    />
  )
}

// Case studies: every client story as a card; each opens as a long read.
export default function CasesPage() {
  const t = useT()

  return (
    <PageShell>
      <PageHeading
        label={{ en: '// case studies', ua: '// кейси' }}
        title={{ en: 'How units train', ua: 'Як підрозділи тренуються' }}
        thin={{ en: 'with ATMARAKSI.', ua: 'з ATMARAKSI.' }}
        lead={{
          en: 'The longer stories behind our clients’ words: the task, what we built and what changed.',
          ua: 'Розгорнуті історії за словами наших клієнтів: завдання, що ми зробили і що змінилося.',
        }}
      />

      <ul className="grid gap-x-2 gap-y-12 md:grid-cols-2">
        {CASES.map(({ slug, client, product, title, lead, cover, fit }) => (
          <li key={slug}>
            <a href={casePath(slug)} className="group flex flex-col gap-5">
              <Cover src={cover} fit={fit} hover className="aspect-[16/10]" />
              <div className="flex flex-col gap-2 px-1">
                <p className="text-[12px] uppercase text-muted">
                  {t(client.name)} · {t(product.title)}
                </p>
                <h2 className="text-[24px] font-light leading-[1.2] transition-colors group-hover:text-[#32471f] lg:text-[28px]">
                  {t(title)}
                </h2>
                <p className="text-[16px] font-light leading-[1.3] text-[#929292]">{t(lead)}</p>
                <span className="mt-2 text-[14px] underline underline-offset-4">
                  {t({ en: 'Read the case', ua: 'Читати кейс' })} →
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
