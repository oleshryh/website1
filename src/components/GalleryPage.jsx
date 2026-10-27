import { useEffect, useState } from 'react'
import { GALLERY, GALLERY_TAGS } from '../data/gallery'
import { useT } from '../i18n'
import { ArrowRightIcon } from './icons'
import PageShell, { PageHeading } from './PageShell'
import ProductMark from './ProductMark'

const pad = (n) => String(n).padStart(2, '0')

// An empty tile where a photo will go: a faint hatch, the shield and a note.
function Placeholder({ caption }) {
  const t = useT()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,transparent_0_11px,rgba(167,167,167,0.18)_11px_12px)] text-center">
      <ProductMark width={20} height={21} className="text-muted" />
      <span className="text-[12px] uppercase text-muted">
        {t({ en: '// photo coming soon', ua: '// фото незабаром' })}
      </span>
      <span className="px-6 text-[14px] font-light text-ink/70">{t(caption)}</span>
    </div>
  )
}

function Picture({ src, fit }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
        fit === 'cover' ? 'object-cover' : 'object-contain p-6'
      }`}
    />
  )
}

// Full-screen view of one picture, with the neighbours a click or an arrow key
// away. Escape or a click on the dark closes it.
function Lightbox({ items, index, onMove, onClose }) {
  const t = useT()
  const item = items[index]

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onMove(1)
      if (event.key === 'ArrowLeft') onMove(-1)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onMove, onClose])

  const arrow =
    'flex h-12 w-12 items-center justify-center rounded-full border-[0.5px] border-paper/60 text-paper transition-colors hover:bg-paper hover:text-ink'

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-ink/90 p-6 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative aspect-[4/3] w-full max-w-[960px] overflow-hidden rounded-xl bg-paper"
      >
        {item.placeholder ? <Placeholder caption={item.caption} /> : <Picture src={item.src} fit={item.fit} />}
      </div>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-[960px] items-center justify-between gap-4 text-paper"
      >
        <span className="text-[12px] uppercase text-paper/60">
          {pad(index + 1)} / {pad(items.length)}
        </span>
        <span className="text-center text-[16px] font-light">{t(item.caption)}</span>
        <span className="flex gap-2">
          <button type="button" aria-label="Previous" onClick={() => onMove(-1)} className={arrow}>
            <ArrowRightIcon width={24} height={24} className="rotate-180" />
          </button>
          <button type="button" aria-label="Next" onClick={() => onMove(1)} className={arrow}>
            <ArrowRightIcon width={24} height={24} />
          </button>
        </span>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const t = useT()
  const [tag, setTag] = useState('all')
  const [open, setOpen] = useState(null)
  const items = tag === 'all' ? GALLERY : GALLERY.filter((item) => item.tag === tag)

  return (
    <PageShell>
      <PageHeading
        label={{ en: '// gallery', ua: '// галерея' }}
        title={{ en: 'Behind', ua: 'Як ми' }}
        thin={{ en: 'the simulators.', ua: 'працюємо.' }}
        lead={{
          en: 'Training sessions, field trials, our workshop and the people who build the systems.',
          ua: 'Заняття, польові випробування, наша майстерня та люди, які створюють тренажери.',
        }}
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {GALLERY_TAGS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTag(id)}
            aria-pressed={tag === id}
            className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
              tag === id ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-[#c0ceac]'
            }`}
          >
            {t(label)}
          </button>
        ))}
      </div>

      <ul className="columns-1 gap-2 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <li key={`${tag}-${i}`} className="mb-2 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-xl bg-paper text-left"
              style={{ aspectRatio: item.ratio }}
            >
              {item.placeholder ? <Placeholder caption={item.caption} /> : <Picture src={item.src} fit={item.fit} />}
              {!item.placeholder && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/60 to-transparent p-4 text-[14px] font-light text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {t(item.caption)}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onMove={(step) => setOpen((current) => (current + step + items.length) % items.length)}
          onClose={() => setOpen(null)}
        />
      )}
    </PageShell>
  )
}
