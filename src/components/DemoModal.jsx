import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Placeholder clip — swap the id for the real demo when it exists.
const VIDEO_ID = 'aqz-KE-bpKQ'

const ENTER_MS = 20
const EXIT_MS = 420

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function DemoModal({ open, origin, onClose }) {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)

  // Mount first, then flip to the active state a tick later so the browser has
  // a frame to transition from.
  useEffect(() => {
    if (open) {
      setMounted(true)
      const id = setTimeout(() => setActive(true), ENTER_MS)
      return () => clearTimeout(id)
    }

    setActive(false)
    const id = setTimeout(() => setMounted(false), EXIT_MS)
    return () => clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!mounted) return null

  // Grow the panel out of the button the viewer clicked.
  const panelWidth = window.innerWidth * 0.8
  const panelHeight = window.innerHeight * 0.78
  const panelLeft = (window.innerWidth - panelWidth) / 2
  const panelTop = (window.innerHeight - panelHeight) / 2
  const transformOrigin = origin
    ? `${origin.x - panelLeft}px ${origin.y - panelTop}px`
    : 'center'

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <button
        type="button"
        aria-label="Close demo"
        onClick={onClose}
        className={`absolute inset-0 bg-white/40 backdrop-blur-2xl transition-opacity duration-500 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Product demo"
        style={{
          width: panelWidth,
          height: panelHeight,
          transformOrigin,
          transitionDuration: `${EXIT_MS}ms`,
        }}
        className={`relative overflow-hidden rounded-2xl border border-white/60 bg-ink shadow-[0_40px_120px_rgba(20,20,18,0.35)] transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? 'scale-100 opacity-100' : 'scale-[0.08] opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close demo"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-[4px] bg-white/85 text-ink backdrop-blur transition-colors hover:bg-white"
        >
          <CloseIcon width={16} height={16} />
        </button>

        {active && (
          <iframe
            title="Product demo"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        )}
      </div>
    </div>,
    document.body,
  )
}
