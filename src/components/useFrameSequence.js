import { useEffect, useState } from 'react'
import { useMotionValueEvent } from 'framer-motion'

// Scrubs a folder of stabilized frames from a 0..1 progress value.
//
// The index is derived in the 'change' handler rather than through
// useTransform, for the same reason useScrollFade exists: a value framer
// computes inside its own frame loop can arrive stale, while the event path
// fires with the scroll.
//
// Exactly one frame is on screen at a time. An earlier version crossfaded the
// next frame over the current one to smooth the flipbook, but the two images
// were updated through different paths — one through React, one straight to
// the DOM — so a fast scroll could leave two different poses visible at once.
export default function useFrameSequence(progress, { dir, count, preload = true }) {
  const toIndex = (p) => Math.min(count - 1, Math.max(0, Math.round(p * (count - 1))))
  const [frame, setFrame] = useState(() => toIndex(progress.get()))

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
    setFrame((current) => (current === index ? current : index))
  })

  return { frame, src: frameSrc(dir, frame) }
}

function frameSrc(dir, i) {
  return `${dir}/frame-${String(i).padStart(3, '0')}.webp`
}
