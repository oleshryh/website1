import { useState } from 'react'
import { useMotionValueEvent } from 'framer-motion'

// Framer applies MotionValue-driven styles inside its requestAnimationFrame
// loop, which left these fades stuck at their page-load values. Driving them
// through React state uses the same path as the scroll-driven frame counter,
// so they stay in sync with the scroll.
export default function useScrollFade(progress, [start, end], [from, to]) {
  const compute = (p) => {
    const t = Math.min(1, Math.max(0, (p - start) / (end - start)))
    return Math.round((from + (to - from) * t) * 100) / 100
  }

  const [opacity, setOpacity] = useState(() => compute(progress.get()))

  useMotionValueEvent(progress, 'change', (p) => {
    const next = compute(p)
    setOpacity((current) => (current === next ? current : next))
  })

  return opacity
}
