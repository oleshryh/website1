import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'

const FRAME_COUNT = 102
const frameSrc = (i) => `/frames/frame-${String(i).padStart(3, '0')}.webp`
const FRAME_SRCS = Array.from({ length: FRAME_COUNT }, (_, i) => frameSrc(i))

export default function SoldierScrollFigure({ progress }) {
  const [frame, setFrame] = useState(0)
  const frameIndex = useTransform(progress, [0, 1], [0, FRAME_COUNT - 1])
  // Dip slightly smaller through the middle of the scroll and settle back to
  // full size at the first and last frame, to smooth over the fact that not
  // every pose fills the stabilized canvas by quite the same amount.
  const scale = useTransform(progress, [0, 0.5, 1], [1, 0.93, 1])

  useEffect(() => {
    // Warm the browser cache so scrubbing never waits on a network request.
    FRAME_SRCS.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useMotionValueEvent(frameIndex, 'change', (value) => {
    setFrame(Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(value))))
  })

  return (
    <motion.img
      src={FRAME_SRCS[frame]}
      alt="ATMARAKSI VR training soldier"
      style={{ x: '-50%', scale }}
      className="pointer-events-none absolute bottom-0 left-1/2 h-2/3 w-auto origin-bottom select-none object-contain"
      draggable={false}
    />
  )
}
