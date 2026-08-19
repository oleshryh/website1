const NAV_LINKS = ['All Products', 'About Us', 'Support']

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.8 8.6h1.4V6.2h-1.6c-1.9 0-2.9 1.1-2.9 2.8v1.4H9.2v2.4h1.5V18h2.5v-5.2h1.7l.4-2.4h-2.1V9.2c0-.4.2-.6.6-.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}

const SOCIALS = [
  { Icon: YoutubeIcon, label: 'YouTube' },
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
]

function Logo() {
  return (
    <svg width="34" height="32" viewBox="0 0 34 32" fill="none" aria-hidden="true">
      <path
        d="M17 1 L31 8 V17 C31 24 25 29 17 31 C9 29 3 24 3 17 V8 Z"
        fill="currentColor"
      />
      <path d="M17 5 V27 M9 12 L17 17 L25 12" stroke="#eeeeec" strokeWidth="1.3" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 border-b border-black/5 bg-canvas/85 px-6 py-5 backdrop-blur md:px-14">
      <a href="#top" className="flex items-center gap-3 text-ink">
        <Logo />
        <span className="text-lg font-semibold tracking-wide">ATMARAKSI</span>
      </a>

      <nav className="hidden items-center gap-9 text-sm text-ink/80 md:flex">
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className="transition-colors hover:text-ink">
            {link}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden text-sm text-ink/60 sm:block">
          UA / <span className="font-semibold text-ink underline underline-offset-4">EN</span>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          {SOCIALS.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-ink shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Icon width={16} height={16} />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
