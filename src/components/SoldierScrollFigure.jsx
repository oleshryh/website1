import { useEffect } from 'react'
import { motion, useTransform } from 'framer-motion'
import useFrameSequence from './useFrameSequence'
import useScrollFade from './useScrollFade'

const FRAME_COUNT = 102
// Both sequences are keyed onto the same canvas, and the turn's first frame is
// the pose the first sequence ends on, so the handover is invisible.
const MAIN_DIR = '/frames'
const TURN_DIR = '/frames-turn'

// Where the figure parks on the third screen. He keeps his full size — the
// list fits beside him without it. The travel is measured against the visible
// body, not the frame: in the closing profile the silhouette only covers
// 28%-72% of the canvas width, the rest is transparent padding.
const PARKED_X = 26

export default function SoldierScrollFigure({ phaseA, phaseB }) {
  // Dip slightly smaller through the middle of the scroll and settle back to
  // full size at the first and last frame, to smooth over the fact that not
  // every pose fills the stabilized canvas by quite the same amount.
  const scale = useTransform(phaseA, [0, 0.5, 1], [1, 0.93, 1])

  // The turn's frames are another 3.8MB, so they only start loading once the
  // first screen is behind us rather than competing with the initial paint.
  const turnReady = useScrollFade(phaseA, [0.5, 0.55], [0, 1]) > 0
  const started = useScrollFade(phaseB, [0, 0.001], [0, 1]) > 0

  // The seam frame is the one that must never be missing: it goes up the
  // instant the third screen starts, which can be before the deferred preload
  // of the rest of the turn has finished.
  useEffect(() => {
    const seam = new Image()
    seam.src = `${TURN_DIR}/frame-000.webp`
  }, [])

  const mainSrc = useFrameSequence(phaseA, { dir: MAIN_DIR, count: FRAME_COUNT })
  const turnSrc = useFrameSequence(phaseB, { dir: TURN_DIR, count: FRAME_COUNT, preload: turnReady })

  // He turns first and only then walks out of centre, so the two moves overlap
  // into one gesture instead of sliding a still figure sideways.
  const x = useScrollFade(phaseB, [0.25, 0.9], [0, PARKED_X])

  return (
    // The wrapper owns the placement so it can stay centred on wide screens but
    // tuck against the right edge once the copy needs the room. Its own
    // transform carries the third screen's move; the img keeps the per-pose
    // scale dip, so the two never fight over one property.
    <div
      style={{ '--turn-x': `${x}vw` }}
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[min(38%,55vw)] justify-center sm:h-[min(54%,37vw)] sm:justify-end lg:h-[min(66.67%,45vw)] lg:justify-center lg:[transform:translateX(var(--turn-x))]"
    >
      <motion.img
        src={started ? turnSrc : mainSrc}
        alt="ATMARAKSI VR training soldier"
        style={{ scale }}
        className="h-full w-auto max-w-none origin-bottom select-none object-contain"
        draggable={false}
      />
    </div>
  )
}
