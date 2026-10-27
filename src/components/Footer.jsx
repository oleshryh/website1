import { NAV } from '../data/copy'
import { PRODUCTS } from '../data/products'
import { SOCIALS } from '../data/socials'
import { useT } from '../i18n'
import {
  BLOG_PATH,
  CASES_PATH,
  CONTACT_PATH,
  DOCS_PATH,
  GALLERY_PATH,
  JOBS_PATH,
  PRIVACY_PATH,
  productPath,
  url,
} from '../routes'
import { SocialButton } from './SocialRail'

const COLUMNS = [
  {
    title: NAV.products,
    links: PRODUCTS.map(({ slug, title }) => ({ label: title, href: productPath(slug) })),
  },
  {
    title: { en: 'Resources', ua: 'Ресурси' },
    links: [
      { label: { en: 'Documentation', ua: 'Документація' }, href: DOCS_PATH },
      { label: NAV.support, href: CONTACT_PATH },
      { label: { en: 'Jobs', ua: 'Вакансії' }, href: JOBS_PATH },
      { label: { en: 'Legal', ua: 'Правова інформація' }, href: PRIVACY_PATH },
    ],
  },
  {
    title: { en: 'Company', ua: 'Компанія' },
    links: [
      { label: { en: 'About', ua: 'Про нас' }, href: url('#about') },
      { label: { en: 'Case Studies', ua: 'Кейси' }, href: CASES_PATH },
      { label: { en: 'Gallery', ua: 'Галерея' }, href: GALLERY_PATH },
      { label: { en: 'Blog', ua: 'Блог' }, href: BLOG_PATH },
    ],
  },
]

function Rule() {
  return <div aria-hidden="true" className="h-[0.5px] bg-muted/40" />
}

export default function Footer() {
  const t = useT()
  return (
    <footer className="relative overflow-hidden bg-ink pb-40 text-paper lg:min-h-[575px] lg:pb-0">
      <div className="hidden px-6 pt-[31px] lg:block lg:px-[35px]">
        <Rule />
      </div>

      <div className="flex flex-col gap-12 px-3 pt-24 lg:flex-row lg:justify-between lg:pl-16 lg:pr-6 lg:pt-[69px]">
        <div className="flex max-w-[305px] flex-col gap-6">
          <div className="flex flex-col gap-2.5 py-2.5">
            <a href={url('#top')} className="flex h-9 items-center gap-1">
              <img src={url('brand/logo-light.png')} width={28} height={28} alt="" />
              <span className="text-[18px] font-medium">ATMARAKSI</span>
            </a>
            <div className="flex gap-2">
              {SOCIALS.map((social) => (
                <SocialButton key={social.label} {...social} />
              ))}
            </div>
          </div>
          <p className="text-[14px] font-light leading-[1.2] text-muted">
            {t({
              en: 'Our VR training systems help military and security personnel develop critical skills through realistic, hands-on scenarios.',
              ua: 'Наші VR-тренажери допомагають військовим і силовим структурам відпрацьовувати критично важливі навички в реалістичних практичних сценаріях.',
            })}
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:w-[600px]">
          {COLUMNS.map(({ title, links }) => (
            <div key={title.en} className="flex flex-col gap-[18px]">
              <h3 className="text-[18px] font-medium">{t(title)}</h3>
              <ul className="flex flex-col gap-2 text-[14px] text-muted">
                {links.map(({ label, href }) => (
                  <li key={label.en}>
                    <a href={href} className="transition-colors hover:text-paper">
                      {t(label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="px-3 pt-[34px] lg:px-[35px]">
        <Rule />
        <p className="pt-[28px] text-[12px] text-muted lg:pl-7">
          {t({ en: '2026 Atmaraksi, All rights reserved', ua: '2026 Atmaraksi, усі права захищені' })}
        </p>
      </div>

      {/* The faded wordmark along the bottom edge, exported from the design. */}
      <img
        src={url('brand/footer-wordmark.svg')}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none"
      />
    </footer>
  )
}
