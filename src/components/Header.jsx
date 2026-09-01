import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PHOTO_TINT, PRODUCTS } from '../data/products'
import ProductMark from './ProductMark'

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
    <div className="hidden h-9 items-center gap-0.5 rounded-[4px] bg-ink/[0.05] p-1 sm:flex">
      {LANGUAGES.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`flex h-full items-center rounded-[4px] px-2.5 text-xs transition-colors ${
              active ? 'bg-white font-medium text-ink shadow-sm' : 'text-ink/40 hover:text-ink/70'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}

function PromoBar() {
  return (
    <a
      href="#"
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-t-3xl rounded-b-lg bg-gradient-to-r from-[#6d6d66] via-[#78786f] to-[#6d6d66] px-4 py-2 text-[11px] text-white/90 shadow-[0_6px_16px_rgba(20,20,18,0.1)] sm:text-xs"
    >
      <span className="promo-gradient pointer-events-none absolute inset-0" />
      <SparkleIcon width={12} height={12} className="relative hidden shrink-0 opacity-80 sm:block" />
      <span className="relative">Realistic training without live ammunition</span>
      <span className="relative hidden text-white/50 sm:inline">·</span>
      <span className="relative flex items-center gap-1 font-medium text-white">
        Learn more
        <ArrowUpRightIcon width={12} height={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  )
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d={open ? 'M6 6 18 18M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
        <div className="flex items-center justify-between gap-6 px-3 py-4">
          <a href="#top" className="flex items-center gap-2.5 text-ink">
            <Logo />
            <span className="text-base font-medium tracking-wide sm:text-[17px] lg:text-lg">
              ATMARAKSI
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-ink/70 lg:flex">
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

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="flex h-8 items-center justify-center rounded-[4px] bg-ink px-3 text-[11px] font-medium text-white shadow-sm transition-colors duration-300 hover:bg-ink/80 sm:h-9 sm:px-4 sm:text-xs"
            >
              Contact Us
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-[4px] text-ink transition-colors hover:bg-ink/[0.06] lg:hidden"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25, ease: 'easeOut' },
              }}
              className="lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-3 pb-3 text-sm text-ink/70">
                <a href="#top" className="rounded-lg px-3 py-2.5 hover:bg-ink/[0.05]">
                  Home
                </a>
                <a href="#about" className="rounded-lg px-3 py-2.5 hover:bg-ink/[0.05]">
                  About Us
                </a>
                <p className="px-3 pb-1 pt-3 text-xs uppercase tracking-wide text-ink/35">
                  Products
                </p>
                {PRODUCTS.map(({ slug, name }) => (
                  <a
                    key={slug}
                    href={`/products/${slug}`}
                    className="rounded-lg px-3 py-2.5 text-ink hover:bg-ink/[0.05]"
                  >
                    {name}
                  </a>
                ))}
                <a href="#" className="mt-3 rounded-lg px-3 py-2.5 hover:bg-ink/[0.05]">
                  Support
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

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
              <div className="grid grid-cols-1 gap-3 px-3 pb-3 sm:grid-cols-3">
                {PRODUCTS.map(({ slug, name, description, image }) => (
                  <a
                    key={slug}
                    href={`/products/${slug}`}
                    className="group relative isolate overflow-hidden rounded-xl bg-ink/[0.06] p-5 transition-colors hover:bg-ink/[0.1]"
                  >
                    <span
                      aria-hidden="true"
                      style={{ backgroundImage: `${PHOTO_TINT}, url('${image}')` }}
                      className="absolute inset-0 -z-10 bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <ProductMark
                      width={16}
                      height={15}
                      className="mb-6 text-ink/70 transition-colors duration-300 group-hover:text-[#31461f]"
                    />
                    <h3 className="mb-0.5 text-sm font-normal text-ink transition-colors duration-300 group-hover:text-[#223213]">
                      {name}
                    </h3>
                    <p className="text-xs leading-snug text-ink/55 transition-colors duration-300 group-hover:text-[#3d5228]">
                      {description}
                    </p>
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
