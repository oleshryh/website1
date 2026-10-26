import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, motionValue } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import { SOCIALS } from '../data/socials'
import { CONTACT_PATH } from '../routes'
import { ArrowUpRightIcon, ChevronDownIcon } from './icons'
import PillButton from './PillButton'
import ProductMark from './ProductMark'
import { SocialButton } from './SocialRail'
import useScrollFade from './useScrollFade'

const LANGUAGES = ['UA', 'EN']
const NO_PROGRESS = motionValue(0)

function LanguageSwitcher({ show }) {
  // Visual only for now — no translation wired up yet.
  const [lang, setLang] = useState('EN')

  return (
    <div
      className={`h-[41px] items-center gap-1 rounded bg-paper p-1 sm:flex ${show ? 'flex' : 'hidden'}`}
    >
      {LANGUAGES.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`flex h-full items-center rounded px-3 text-[14px] transition-colors ${
              active ? 'bg-[#e9e9e9] text-ink' : 'text-muted hover:text-ink'
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
      className="group relative flex h-[30px] w-full items-center justify-center gap-3 overflow-hidden rounded-t-3xl rounded-b-lg bg-gradient-to-r from-[#797973] to-[#7f7f7a] px-2.5 text-[11px] font-light leading-[18px] text-paper sm:text-[12px]"
    >
      <span className="promo-gradient pointer-events-none absolute inset-0" />
      <span className="relative whitespace-nowrap max-[359px]:hidden">
        Realistic training without live ammunition
      </span>
      <span aria-hidden="true" className="relative h-0.5 w-0.5 rounded-full bg-paper max-[359px]:hidden" />
      <span className="relative flex items-center gap-1 whitespace-nowrap font-medium">
        Download PDF
        <ArrowUpRightIcon
          width={12}
          height={12}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
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

const PHONE_LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'Products', href: '/#products' },
  { label: 'About Us', href: '/#about' },
  { label: 'Support', href: CONTACT_PATH },
]

// The phone menu from the design: the page dims and blurs behind, the header
// stays on top, and the links stand large down the left with the socials under
// them. The page underneath doesn't scroll while it is open.
function PhoneMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="phone-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-40 bg-canvas/95 px-3 pt-[159px] backdrop-blur-[20px] lg:hidden"
        >
          <nav className="flex flex-col items-start gap-5">
            {PHONE_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={onClose}
                className="text-[32px] font-thin leading-[39px] text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-16 flex gap-3">
            {SOCIALS.map((social) => (
              <SocialButton key={social.label} {...social} size="large" />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function ProductCard({ slug, title, tagline }) {
  return (
    <a
      href={`/products/${slug}`}
      className="group flex h-[128px] flex-col justify-between rounded-lg bg-[#ececec] p-[18px] transition-colors duration-300 hover:bg-[#c3d1b3]"
    >
      <ProductMark
        width={16}
        height={17}
        className="text-ink transition-colors duration-300 group-hover:text-[#32471f]"
      />
      <span className="flex flex-col gap-1">
        <span className="text-[16px] text-ink">{title}</span>
        <span className="text-[14px] text-muted transition-colors duration-300 group-hover:text-[#32471f]">
          {tagline}
        </span>
      </span>
    </a>
  )
}

// `progress` is the first screen's own 0..1: the sales button joins the header
// once the first screen, which has its own big one, is on its way out. Pages
// without the stage leave it out and never show the button.
export default function Header({ progress }) {
  const [productsOpen, setProductsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeTimer = useRef(null)
  const salesOpacity = useScrollFade(progress ?? NO_PROGRESS, [0.13, 0.26], [0, 1])

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
    <header className="fixed inset-x-0 top-[18px] z-50 flex flex-col gap-2 px-3 md:px-6">
      <PromoBar />

      <div onMouseLeave={hideProducts} className="w-full overflow-hidden rounded-lg bg-paper">
        {/* Three columns with equal sides, so the menu sits dead centre
            whatever appears at the right. */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-2 py-3">
          <a href="/#top" className="flex items-center gap-1 justify-self-start text-ink">
            <span className="px-2 py-1">
              <img src="/brand/logo.png" width={28} height={28} alt="" />
            </span>
            <span className="text-[16px] font-medium sm:text-[18px]">ATMARAKSI</span>
          </a>

          <nav className="hidden items-center gap-[38px] text-[14px] font-light text-ink lg:flex">
            <a href="/#top" onMouseEnter={hideProducts} className="transition-opacity hover:opacity-60">
              Home
            </a>
            <button
              type="button"
              onMouseEnter={showProducts}
              onFocus={showProducts}
              aria-expanded={productsOpen}
              className="flex items-center gap-1 transition-opacity hover:opacity-60"
            >
              Products
              <ChevronDownIcon
                width={12}
                height={13}
                className={`transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <a href="/#about" onMouseEnter={hideProducts} className="transition-opacity hover:opacity-60">
              About Us
            </a>
            <a
              href={CONTACT_PATH}
              onMouseEnter={hideProducts}
              className="transition-opacity hover:opacity-60"
            >
              Support
            </a>
          </nav>

          <div className="col-start-3 flex items-center gap-3 justify-self-end">
            <LanguageSwitcher show={menuOpen} />
            {/* Out of the row entirely while hidden, so on the first screen the
                language switch stands at the right edge as in the design. */}
            {salesOpacity > 0 && (
              <div style={{ opacity: salesOpacity }} className="hidden lg:block">
                <PillButton size="medium" href={CONTACT_PATH}>
                  Talk To Sales
                </PillButton>
              </div>
            )}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Menu"
              className="flex h-[41px] w-[41px] items-center justify-center rounded bg-ink text-paper transition-colors hover:bg-ink/85 lg:hidden"
            >
              <MenuIcon open={menuOpen} />
            </button>
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
              <div className="grid grid-cols-4 gap-[11px] px-3 pb-3 pt-[22px]">
                {PRODUCTS.map((product) => (
                  <ProductCard key={product.slug} {...product} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PhoneMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
