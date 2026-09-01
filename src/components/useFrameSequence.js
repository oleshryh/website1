import { useEffect, useState } from 'react'
import { useMotionValueEvent, useTransform } from 'framer-motion'

// Scrubs a folder of stabilized frames from a 0..1 progress value. Preloading
// is opt-in per sequence: the first one warms on mount so scrubbing never waits
// on the network, later ones hold off until the scroll is close enough to need
// them, which keeps the initial page load to a single sequence.
export default function useFrameSequence(progress, { dir, count, preload = true }) {
  const [frame, setFrame] = useState(0)
  const frameIndex = useTransform(progress, [0, 1], [0, count - 1])

  useEffect(() => {
    if (!preload) return
    for (let i = 0; i < count; i += 1) {
      const img = new Image()
      img.src = frameSrc(dir, i)
    }
  }, [dir, count, preload])

  useMotionValueEvent(frameIndex, 'change', (value) => {
    setFrame(Math.min(count - 1, Math.max(0, Math.round(value))))
  })

  return frameSrc(dir, frame)
}

function frameSrc(dir, i) {
  return `${dir}/frame-${String(i).padStart(3, '0')}.webp`
}
