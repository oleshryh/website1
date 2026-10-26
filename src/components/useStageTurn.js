import { useRef, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { TO_FIRST_AT, TO_SECOND_AT, TURN_SECONDS } from './stage'

// The same gentle curve the screens used to fly on: at its fastest about one
// and a half times the average speed, so every frame of the clip gets drawn.
const EASE_IN_OUT_SINE = [0.37, 0, 0.63, 1]

// Turns the stage's scroll progress into the soldier's own 0..1: 0 is the
// first screen, 1 the second. Once the scroll crosses a threshold he plays the
// rest of the turn in time, whatever the scroll does next — scrolled back
// mid-turn, he heads back from wherever he is rather than stopping.
export default function useStageTurn(scrollProgress) {
  const start = scrollProgress.get() > TO_SECOND_AT ? 1 : 0
  const turn = useMotionValue(start)
  // Which screen he is heading for. The scroll reports many times a second;
  // only a change of destination starts a new turn, so a running one is never
  // restarted from the top of its curve.
  const target = useRef(start)
  // Reduced motion: no turn to watch, just the screen that belongs there.
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const turnTo = (next) => {
    if (next === target.current) return
    target.current = next
    if (reduced) {
      turn.jump(next)
      return
    }
    const distance = Math.abs(next - turn.get())
    animate(turn, next, { duration: TURN_SECONDS * distance, ease: EASE_IN_OUT_SINE })
  }

  useMotionValueEvent(scrollProgress, 'change', (p) => {
    if (p > TO_SECOND_AT) turnTo(1)
    else if (p < TO_FIRST_AT) turnTo(0)
  })

  return turn
}
