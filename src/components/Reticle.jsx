import { useEffect, useRef, useState } from 'react'

// A sight that follows the pointer: four corner ticks and a centre dot, always
// a step behind the cursor. mix-blend-difference is what makes one element work
// on both halves of the site — it reads dark on the white panel and light on
// the black screen without any state.
//
// Delete <Reticle /> from App.jsx to remove it: it never touches the cursor
// property, never sets a class on the body, and registers no global CSS.
const FOLLOW = 0.16
const SIZE = 30

export default function Reticle() {
  const boxRef = useRef(null)
  // A touch screen has no cursor to trail, and someone who asked for less
  // motion did not ask for this. Neither gets the element at all.
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!enabled) return

    const box = boxRef.current
    if (!box) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const at = { ...target }
    let frame = null

    const draw = () => {
      at.x += (target.x - at.x) * FOLLOW
      at.y += (target.y - at.y) * FOLLOW
      box.style.transform = `translate3d(${at.x - SIZE / 2}px, ${at.y - SIZE / 2}px, 0)`

      // Stop once it has caught up, so a still page isn't burning frames.
      if (Math.abs(target.x - at.x) + Math.abs(target.y - at.y) < 0.2) {
        frame = null
        return
      }
      frame = requestAnimationFrame(draw)
    }

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      box.style.opacity = '1'
      if (frame === null) frame = requestAnimationFrame(draw)
    }

    const onOver = (event) => {
      const active = event.target.closest?.('a, button, input, textarea, select, [role="button"]')
      box.style.setProperty('--reticle-scale', active ? '1.55' : '1')
    }

    const onLeave = () => {
      box.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  // Hairline ticks at half strength: present, but quieter than the content.
  const tick = 'absolute h-[0.5px] w-[6px] bg-white/45'
  const tickV = 'absolute h-[6px] w-[0.5px] bg-white/45'

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      style={{ opacity: 0, '--reticle-scale': 1 }}
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[30px] w-[30px] mix-blend-difference transition-opacity duration-300 [&>*]:transition-transform"
    >
      <div className="h-full w-full scale-[var(--reticle-scale)] transition-transform duration-300 ease-out">
        <span className={`${tick} left-0 top-0`} />
        <span className={`${tickV} left-0 top-0`} />
        <span className={`${tick} right-0 top-0`} />
        <span className={`${tickV} right-0 top-0`} />
        <span className={`${tick} bottom-0 left-0`} />
        <span className={`${tickV} bottom-0 left-0`} />
        <span className={`${tick} bottom-0 right-0`} />
        <span className={`${tickV} bottom-0 right-0`} />
        <span className="absolute left-1/2 top-1/2 h-px w-px -translate-x-1/2 -translate-y-1/2 bg-white/45" />
      </div>
    </div>
  )
}
