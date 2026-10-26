import { PRODUCTS } from '../data/products'
import { SOCIALS } from '../data/socials'
import { SocialButton } from './SocialRail'
import { url } from '../routes'

// Links to pages that don't exist yet point nowhere for now.
const COLUMNS = [
  {
    title: 'Products',
    links: PRODUCTS.map(({ slug, title }) => ({ label: title, href: url(`products/${slug}`) })),
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Support', 'Jobs', 'Legal'].map((label) => ({ label, href: '#' })),
  },
  {
    title: 'Company',
    links: ['About', 'Case Studies', 'Gallery', 'Blog'].map((label) => ({ label, href: '#' })),
  },
]

function Rule() {
  return <div aria-hidden="true" className="h-[0.5px] bg-muted/40" />
}

export default function Footer() {
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
            Our VR training systems help military and security personnel develop critical skills
            through realistic, hands-on scenarios.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:w-[600px]">
          {COLUMNS.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-[18px]">
              <h3 className="text-[18px] font-medium">{title}</h3>
              <ul className="flex flex-col gap-2 text-[14px] text-muted">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="transition-colors hover:text-paper">
                      {label}
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
          2026 Atmaraksi, All rights reserved
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
