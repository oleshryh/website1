import { useEffect, useState } from 'react'
import { useMotionValueEvent } from 'framer-motion'

// Scrubs a folder of stabilized frames from a 0..1 progress value.
//
// The index is derived in the 'change' handler rather than through
// useTransform, for the same reason useScrollFade exists: a value framer
// computes inside its own frame loop can arrive stale, while the event path
// fires with the scroll.
//
// The integer frame goes through React state, but the fraction between two
// frames is written straight to a ref'd element's opacity. Crossfading the next
// frame over the current one turns a flipbook into continuous motion, and doing
// it outside React keeps that from costing a render on every hundredth of a
// frame.
export default function useFrameSequence(progress, { dir, count, blendRef, preload = true }) {
  const toIndex = (p) => Math.min(count - 1, Math.max(0, p * (count - 1)))
  const [frame, setFrame] = useState(() => Math.floor(toIndex(progress.get())))

  useEffect(() => {
    if (!preload) return
    // Warm the browser cache so scrubbing never waits on a network request.
    for (let i = 0; i < count; i += 1) {
      const img = new Image()
      img.src = frameSrc(dir, i)
    }
  }, [dir, count, preload])

  useMotionValueEvent(progress, 'change', (p) => {
    const index = toIndex(p)
    const base = Math.floor(index)

    if (blendRef?.current) blendRef.current.style.opacity = String(index - base)
    setFrame((current) => (current === base ? current : base))
  })

  return {
    frame,
    baseSrc: frameSrc(dir, frame),
    nextSrc: frameSrc(dir, Math.min(count - 1, frame + 1)),
  }
}

function frameSrc(dir, i) {
  return `${dir}/frame-${String(i).padStart(3, '0')}.webp`
}
