import { POSTS } from '../data/blog'
import { useFormatDate, useT } from '../i18n'
import { BLOG_PATH, postPath } from '../routes'
import ArticlePage from './ArticlePage'
import Cover from './Cover'
import PageShell, { PageHeading } from './PageShell'

// One post as a long read.
export function PostPage({ post }) {
  const formatDate = useFormatDate()
  return (
    <ArticlePage
      back={{ href: BLOG_PATH, label: { en: 'All news', ua: 'Усі новини' } }}
      label={{ en: '// blog', ua: '// блог' }}
      title={post.title}
      lead={post.lead}
      facts={[
        { term: { en: 'Category', ua: 'Рубрика' }, value: post.category },
        { term: { en: 'Date', ua: 'Дата' }, value: formatDate(post.date) },
      ]}
      cover={post.cover}
      fit={post.fit}
      body={post.body}
    />
  )
}

// The blog: the newest post large across the top, the rest as cards below.
export default function BlogPage() {
  const t = useT()
  const formatDate = useFormatDate()
  const [latest, ...rest] = POSTS

  return (
    <PageShell>
      <PageHeading
        label={{ en: '// blog', ua: '// блог' }}
        title={{ en: 'News from', ua: 'Новини' }}
        thin={{ en: 'the training ground.', ua: 'з полігону.' }}
        lead={{
          en: 'Product updates, field notes and how VR is changing military training.',
          ua: 'Оновлення продуктів, нотатки з полігону та те, як VR змінює військову підготовку.',
        }}
      />

      <a href={postPath(latest.slug)} className="group mb-16 grid gap-6 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-12">
        <Cover src={latest.cover} fit={latest.fit} hover className="aspect-[16/10]" />
        <div className="flex flex-col gap-3">
          <p className="text-[12px] uppercase text-muted">
            {t(latest.category)} · {formatDate(latest.date)}
          </p>
          <h2 className="text-[28px] font-light leading-[1.2] transition-colors group-hover:text-[#32471f] lg:text-[36px]">
            {t(latest.title)}
          </h2>
          <p className="text-[16px] font-light leading-[1.3] text-[#929292]">{t(latest.lead)}</p>
          <span className="mt-2 text-[14px] underline underline-offset-4">
            {t({ en: 'Read', ua: 'Читати' })} →
          </span>
        </div>
      </a>

      <ul className="grid gap-x-2 gap-y-12 md:grid-cols-2">
        {rest.map(({ slug, date, category, title, lead, cover, fit }) => (
          <li key={slug}>
            <a href={postPath(slug)} className="group flex flex-col gap-5">
              <Cover src={cover} fit={fit} hover className="aspect-[16/10]" />
              <div className="flex flex-col gap-2 px-1">
                <p className="text-[12px] uppercase text-muted">
                  {t(category)} · {formatDate(date)}
                </p>
                <h3 className="text-[24px] font-light leading-[1.2] transition-colors group-hover:text-[#32471f]">
                  {t(title)}
                </h3>
                <p className="text-[16px] font-light leading-[1.3] text-[#929292]">{t(lead)}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
