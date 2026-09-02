import { useEffect, useRef } from 'react'

// A screen of the sticky stage is over a viewport of scroll deep, which is a
// lot of wheel work for a visitor who only wants to see the next one. One nudge
// at a stop plays the whole screen for them — down to the next stop, back up to
// the previous — and anything they do afterwards hands control back.
//
// Timed by distance rather than a flat duration: the screens aren't equal
// lengths, and the figure's animation is tied to scroll position, so a fixed
// duration would play him faster on one screen than the next.
const MS_PER_VIEWPORT = 1700
// Treat "still parked at a stop" generously — a pixel or two of rubber banding
// shouldn't count as having scrolled away.
const END_SLACK = 4
// An interior stop is passed through during ordinary scrolling too. Waiting for
// the scroll to actually settle there keeps a mid-gesture wheel tick from being
// read as a fresh nudge and teleporting the visitor.
const SETTLE_MS = 150

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

export default function useScrollAutoAdvance(stageRef, stops = [0, 1]) {
  // Handed back so a nav link can play the way to a screen instead of
  // teleporting past the whole animation.
  const flyTo = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const stopY = (i) => stage.offsetTop + (stage.offsetHeight - window.innerHeight) * stops[i]
    const clampStop = (i) => Math.min(stops.length - 1, Math.max(0, i))

    // Reduced motion loses the flight, not the destination: the nav link still
    // has to reach the contact screen.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      flyTo.current = (index) => window.scrollTo(0, stopY(clampStop(index)))
      return () => {
        flyTo.current = null
      }
    }

    let frame = null
    // 1 while flying down the stage, -1 while flying back up, 0 when parked.
    let heading = 0
    // Arms whenever the page settles on a stop, so the nudge is available in
    // both directions — but never part-way between two screens.
    let armed = true

    // useScroll runs 'start start' to 'end end', so a progress fraction maps
    // straight onto a scroll position.
    const parkedAt = () => stops.findIndex((_, i) => Math.abs(window.scrollY - stopY(i)) <= END_SLACK)

    let settle = null

    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      heading = 0
    }

    const advance = (to, direction, overrideDuration) => {
      const from = window.scrollY
      if (to === from) return

      const started = performance.now()
      const duration =
        overrideDuration ?? (Math.abs(to - from) / window.innerHeight) * MS_PER_VIEWPORT
      heading = direction
      const step = (now) => {
        const t = Math.min(1, (now - started) / duration)
        window.scrollTo(0, from + (to - from) * easeInOutCubic(t))
        if (t < 1) {
          frame = requestAnimationFrame(step)
        } else {
          frame = null
          heading = 0
          // Arm the return trip here rather than waiting on a scroll event —
          // the last frame often lands on the pixel the previous one already
          // reached, and then no scroll event ever comes.
          armed = true
        }
      }
      frame = requestAnimationFrame(step)
    }

    const onWheel = (event) => {
      if (event.deltaY === 0) return
      const direction = event.deltaY > 0 ? 1 : -1

      if (frame !== null) {
        // Trackpad inertia keeps firing wheel events long after the nudge, so
        // only input against the flight counts as taking control back.
        if (direction !== heading) {
          stop()
          armed = false
        }
        return
      }

      if (!armed) return
      // The demo modal parks the page by locking the body; don't fight it.
      if (document.body.style.overflow === 'hidden') return

      const here = parkedAt()
      if (here === -1) return
      const next = here + direction
      if (next < 0 || next >= stops.length) return

      armed = false
      advance(stopY(next), direction)
    }

    const onScroll = () => {
      if (frame !== null) return
      clearTimeout(settle)
      settle = setTimeout(() => {
        if (parkedAt() !== -1) armed = true
      }, SETTLE_MS)
    }

    // A link jumping the whole page would otherwise take seven seconds at the
    // wheel nudge's pace, so nav flights get their own, faster curve.
    flyTo.current = (index) => {
      const to = stopY(clampStop(index))
      const span = Math.abs(to - window.scrollY) / window.innerHeight
      stop()
      armed = false
      advance(to, to > window.scrollY ? 1 : -1, Math.min(2600, 700 + Math.sqrt(span) * 900))
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      stop()
      flyTo.current = null
      clearTimeout(settle)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
      window.removeEventListener('scroll', onScroll)
    }
  }, [stageRef, stops])

  return flyTo
}
