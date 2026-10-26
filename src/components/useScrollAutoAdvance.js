import { useEffect } from 'react'

// The stage between two screens is a scrub through the soldier's animation,
// and the page must never come to rest halfway through it.
//
// So the screens are detents, and the way between them is a flight the page
// plays on its own. The first turn of the wheel on a screen — either way — sets
// it off; while it plays the wheel does nothing, neither speeding it up nor
// stopping it. Coming back up from the blocks below works the same: the moment
// the page enters the stage it flies the rest of the way to the first screen.
// Whatever a trackpad or a spun wheel still sends after the landing is
// swallowed too, so the page stays on the screen it arrived at.
//
// Timed by distance rather than a flat duration: the figure's animation is tied
// to scroll position, so this keeps him at one pace however far the flight is.
const MS_PER_VIEWPORT = 1700
// Wheel events closer together than this belong to one gesture (a flick and its
// inertia, or a run of notches). Only after a pause this long does the wheel
// count as a new push.
const GESTURE_GAP_MS = 200
// The gesture that was running at the landing is swallowed for at most this
// long. Someone who simply keeps scrolling never pauses, and without a cap
// they would be held on the screen for good.
const LANDING_HOLD_MS = 700
// Treat "still parked at a stop" generously — a pixel or two of rubber banding
// shouldn't count as having scrolled away.
const END_SLACK = 4
// Touch scrolling can't be taken over mid-swipe without fighting the finger, so
// on a touch screen the page waits this long after the swipe has stopped and
// then flies to the nearest screen.
const SETTLE_MS = 240

// A gentle sine curve rather than a cubic one: at its fastest it runs at about
// one and a half times the average speed instead of three, so in the middle of
// the flight the soldier still gets every frame on screen instead of skipping
// two or three at a time.
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2

export default function useScrollAutoAdvance(stageRef, stops = [0, 1]) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const stopY = (i) => stage.offsetTop + (stage.offsetHeight - window.innerHeight) * stops[i]
    const first = () => stopY(0)
    const last = () => stopY(stops.length - 1)

    // Reduced motion: no flights, the page scrolls the ordinary way.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = null
    // While set, the wheel is swallowed: during a flight, and after one until
    // the gesture that was still running at the landing has died away.
    let holding = false
    let landedAt = 0
    let lastWheelAt = 0
    // What moved the page last — touch scrolling is left alone until it stops.
    let lastInput = 'wheel'
    let lastY = window.scrollY
    let settle = null

    const parkedAt = () => stops.findIndex((_, i) => Math.abs(window.scrollY - stopY(i)) <= END_SLACK)
    const insideStage = () =>
      window.scrollY > first() + END_SLACK && window.scrollY < last() - END_SLACK
    const modalOpen = () => document.body.style.overflow === 'hidden'

    // The next stop in the given direction from where the page is now.
    const stopToward = (direction) => {
      const y = window.scrollY
      if (direction > 0) {
        for (let i = 0; i < stops.length; i += 1) if (stopY(i) > y + END_SLACK) return i
        return stops.length - 1
      }
      for (let i = stops.length - 1; i >= 0; i -= 1) if (stopY(i) < y - END_SLACK) return i
      return 0
    }

    const fly = (index) => {
      const from = window.scrollY
      const to = stopY(index)
      if (Math.abs(to - from) <= END_SLACK) return
      if (frame !== null) cancelAnimationFrame(frame)

      const started = performance.now()
      const duration = (Math.abs(to - from) / window.innerHeight) * MS_PER_VIEWPORT
      holding = true
      const step = (now) => {
        const t = Math.min(1, (now - started) / duration)
        window.scrollTo(0, from + (to - from) * easeInOutSine(t))
        lastY = window.scrollY
        if (t < 1) {
          frame = requestAnimationFrame(step)
        } else {
          frame = null
          landedAt = now
        }
      }
      frame = requestAnimationFrame(step)
    }

    const onWheel = (event) => {
      if (event.deltaY === 0 || modalOpen()) return
      lastInput = 'wheel'
      const direction = event.deltaY > 0 ? 1 : -1
      const now = performance.now()
      const sameGesture = now - lastWheelAt < GESTURE_GAP_MS
      lastWheelAt = now

      // In flight: the wheel changes nothing.
      if (frame !== null) {
        if (event.cancelable) event.preventDefault()
        return
      }

      const here = parkedAt()
      if (here === -1) {
        // Outside the stage the page scrolls the ordinary way. (Inside it, off a
        // stop, can only be a moment before onScroll launches a flight.)
        if (insideStage() && event.cancelable) event.preventDefault()
        return
      }

      // Just landed and the same gesture is still coming in: keep the page on
      // the screen it arrived at — for a moment, not for good.
      if (holding && sameGesture && now - landedAt < LANDING_HOLD_MS) {
        if (event.cancelable) event.preventDefault()
        return
      }
      holding = false

      const next = here + direction
      // Nothing above the first screen; below the last one the page carries on
      // into the blocks underneath the ordinary way.
      if (next < 0 || next >= stops.length) return

      if (event.cancelable) event.preventDefault()
      fly(next)
    }

    const onScroll = () => {
      const y = window.scrollY
      const direction = y > lastY ? 1 : -1
      lastY = y
      if (frame !== null || modalOpen()) return

      clearTimeout(settle)
      if (!insideStage()) return

      // Wheel, keys or scrollbar brought the page into the stage (from below,
      // most often): finish the way to the next screen at once.
      if (lastInput !== 'touch') {
        fly(stopToward(direction))
        return
      }

      // A swipe: let it end, then fly to whichever screen is nearer.
      settle = setTimeout(() => {
        if (frame !== null || !insideStage()) return
        const toFirst = Math.abs(window.scrollY - first())
        const toLast = Math.abs(window.scrollY - last())
        fly(toFirst <= toLast ? 0 : stops.length - 1)
      }, SETTLE_MS)
    }

    const onTouch = () => {
      lastInput = 'touch'
    }
    const onKey = () => {
      lastInput = 'key'
    }

    // Opened or reloaded halfway through: land on a screen straight away.
    if (insideStage()) {
      const toFirst = Math.abs(window.scrollY - first())
      fly(toFirst <= Math.abs(window.scrollY - last()) ? 0 : stops.length - 1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      clearTimeout(settle)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [stageRef, stops])
}
