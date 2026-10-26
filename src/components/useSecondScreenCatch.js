import { useEffect } from 'react'

// The scroll is free on the stage, but one hard flick of the wheel or trackpad
// could carry the page from the first screen past the whole second one in a
// fraction of a second. So a single gesture that would sweep past the end of the
// stage is stopped exactly there, with the second screen on show; what is left
// of that same gesture is swallowed for a moment. The next turn of the wheel
// carries on into the products, whether or not the soldier has finished.

// Wheel events closer together than this belong to one gesture (a flick and its
// inertia, or a run of notches).
const GESTURE_GAP_MS = 200
// The rest of the gesture is held back for at most this long, so someone who
// simply keeps scrolling is only paused, never stuck.
const HOLD_MS = 1000
// A wheel "line" (Firefox reports some wheels in lines) is about this many px.
const LINE_PX = 16

export default function useSecondScreenCatch(stageRef) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    // Where the page stands with the second screen still pinned in full.
    const stageEnd = () => stage.offsetTop + stage.offsetHeight - window.innerHeight

    let lastWheelAt = 0
    let holdingSince = null
    // Whether the gesture under way began above the end of the stage — only
    // such a gesture is the one that could skip the second screen.
    let startedAbove = false

    const catchAtEnd = (now) => {
      window.scrollTo(0, stageEnd())
      holdingSince = now
    }

    const onWheel = (event) => {
      if (document.body.style.overflow === 'hidden') return
      const now = performance.now()
      const sameGesture = now - lastWheelAt < GESTURE_GAP_MS
      lastWheelAt = now
      if (!sameGesture) startedAbove = window.scrollY < stageEnd() - 1

      const delta = event.deltaMode === 1 ? event.deltaY * LINE_PX : event.deltaY
      if (delta <= 0) {
        holdingSince = null
        return
      }

      // Already caught: keep the page on the second screen while the same
      // gesture is still coming in, but not for good.
      if (holdingSince !== null) {
        if (sameGesture && now - holdingSince < HOLD_MS) {
          if (event.cancelable) event.preventDefault()
          return
        }
        holdingSince = null
      }

      const end = stageEnd()
      const y = window.scrollY
      if (y < end - 1 && y + delta > end) {
        if (event.cancelable) event.preventDefault()
        catchAtEnd(now)
      }
    }

    // Smooth wheel scrolling runs behind the events, so a flick can still carry
    // the page over the edge after the last check. Caught here as well.
    const onScroll = () => {
      if (!startedAbove) return
      const now = performance.now()
      const end = stageEnd()
      // Caught: the browser's own smooth scroll may still be gliding on, so
      // hold the line for the moment the catch lasts.
      if (holdingSince !== null) {
        if (now - holdingSince < HOLD_MS && window.scrollY > end + 1) window.scrollTo(0, end)
        return
      }
      if (now - lastWheelAt > GESTURE_GAP_MS) return
      if (window.scrollY > end + 1) catchAtEnd(now)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
    }
  }, [stageRef])
}
