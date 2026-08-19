import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Shared mark for every product card — the site's shield outline, filled on hover.
function ProductMark(props) {
  return (
    <svg viewBox="0 0 34 32" fill="none" {...props}>
      <path
        d="M17 1 L31 8 V17 C31 24 25 29 17 31 C9 29 3 24 3 17 V8 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fill-transparent transition-colors duration-300 group-hover:fill-current"
      />
    </svg>
  )
}

const PRODUCTS = [
  {
    slug: 'training-simulator-for-shooting-with-dshk-pkm-browning',
    name: 'Machine Gun Training',
    description: 'Realistic training on DShK, PKM and Browning.',
  },
  {
    slug: 'rpg-7-grenade-launcher-shooting-simulator',
    name: 'RPG-7 Training',
    description: 'Master the RPG-7 launcher safely.',
  },
  {
    slug: 'ftp-drone-countermeasure-trainer',
    name: 'FPV Drone Defense Training',
    description: 'Detect and counter FPV drone threats.',
  },
]

function Logo() {
  return (
    <svg width="30" height="28" viewBox="0 0 34 32" fill="none" aria-hidden="true">
      <path d="M17 1 L31 8 V17 C31 24 25 29 17 31 C9 29 3 24 3 17 V8 Z" fill="currentColor" />
      <path d="M17 5 V27 M9 12 L17 17 L25 12" stroke="#eeeeec" strokeWidth="1.3" />
    </svg>
  )
}

function ChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c.6 3.4 2.1 5.4 5.5 6C13.6 8.6 12 10.6 12 14c-.6-3.4-2.1-5.4-5.5-6C10 7.4 11.4 5.4 12 2Z" />
      <path d="M19 14c.3 1.7 1 2.4 2.7 2.7-1.8.3-2.4 1-2.7 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1 2.7-2.7Z" />
    </svg>
  )
}

function ArrowUpRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const LANGUAGES = ['UA', 'EN']

function LanguageSwitcher() {
  // Visual only for now — no translation wired up yet.
  const [lang, setLang] = useState('EN')

  return (
    <div className="hidden items-center gap-1.5 text-sm sm:flex">
      {LANGUAGES.map((code, i) => {
        const active = code === lang
        return (
          <span key={code} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink/20">/</span>}
            <button
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={active}
              className={`transition-colors ${
                active
                  ? 'font-medium text-ink underline decoration-ink/30 underline-offset-4'
                  : 'text-ink/40 hover:text-ink'
              }`}
            >
              {code}
            </button>
          </span>
        )
      })}
    </div>
  )
}

function PromoBar() {
  return (
    <a
      href="#"
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-t-3xl rounded-b-lg bg-gradient-to-r from-[#3c3c35] via-[#46463f] to-[#3c3c35] px-4 py-2 text-xs text-white/50 shadow-[0_6px_16px_rgba(20,20,18,0.12)]"
    >
      <span className="promo-gradient pointer-events-none absolute inset-0" />
      <SparkleIcon width={12} height={12} className="relative shrink-0 opacity-60" />
      <span className="relative">Realistic training without live ammunition</span>
      <span className="relative text-white/25">·</span>
      <span className="relative flex items-center gap-1 font-medium text-white/75">
        Learn more
        <ArrowUpRightIcon width={12} height={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  )
}

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const closeTimer = useRef(null)
  const wrapRef = useRef(null)

  const showProducts = () => {
    clearTimeout(closeTimer.current)
    setProductsOpen(true)
  }
  const hideProducts = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 150)
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex flex-col items-center gap-1.5 px-4 md:px-6">
      <PromoBar />

      <div
        ref={wrapRef}
        onMouseLeave={hideProducts}
        className="w-full overflow-hidden rounded-t-lg rounded-b-3xl border border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(20,20,18,0.12)] backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between gap-6 px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5 text-ink">
            <Logo />
            <span className="text-lg font-medium tracking-wide">ATMARAKSI</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-ink/70 md:flex">
            <a href="#top" onMouseEnter={hideProducts} className="transition-colors hover:text-ink">
              Home
            </a>
            <a href="#about" onMouseEnter={hideProducts} className="transition-colors hover:text-ink">
              About Us
            </a>
            <button
              type="button"
              onMouseEnter={showProducts}
              onFocus={showProducts}
              aria-expanded={productsOpen}
              className="flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              Products
              <ChevronDown
                width={13}
                height={13}
                className={`transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <a href="#" onMouseEnter={hideProducts} className="transition-colors hover:text-ink">
              Support
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="rounded-lg bg-ink px-4 py-2 text-xs font-medium text-white shadow-sm transition-colors duration-300 hover:bg-ink/80"
            >
              Contact Us
            </a>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {productsOpen && (
            <motion.div
              key="products-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              <div className="grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-3">
                {PRODUCTS.map(({ slug, name, description }) => (
                  <a
                    key={slug}
                    href={`/products/${slug}`}
                    className="group rounded-xl bg-ink/[0.06] p-5 transition-colors hover:bg-ink/[0.1]"
                  >
                    <ProductMark width={16} height={15} className="mb-6 text-ink/70" />
                    <h3 className="mb-0.5 text-sm font-normal text-ink">{name}</h3>
                    <p className="text-xs leading-snug text-ink/55">{description}</p>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
