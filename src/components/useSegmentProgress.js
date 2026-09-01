import { useMotionValue, useMotionValueEvent } from 'framer-motion'

// Re-bases a slice of the stage's scroll progress onto its own 0..1, so each
// screen keeps the thresholds it would have had if it owned the whole stage —
// adding a screen doesn't force every existing number to be remapped.
// Written as a plain MotionValue driven by the 'change' event rather than
// useTransform, so it rides the same path useScrollFade already depends on.
export default function useSegmentProgress(progress, [start, end]) {
  const map = (p) => Math.min(1, Math.max(0, (p - start) / (end - start)))
  const segment = useMotionValue(map(progress.get()))

  useMotionValueEvent(progress, 'change', (p) => segment.set(map(p)))

  return segment
}
