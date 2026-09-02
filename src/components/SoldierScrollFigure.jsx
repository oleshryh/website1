import { useRef } from 'react'
import useFrameSequence from './useFrameSequence'
import useScrollFade from './useScrollFade'
import { FRAME_COUNT } from './stage'

const FRAMES_DIR = '/frames'
// /frames-turn holds the profile turn, kept for the fourth screen.

// The soldier isn't the same height in every pose — arms out he measures 435px
// of the 494px frame, mid-clip 475 — so at a constant frame height he would
// visibly grow as the page scrolls. Sampled every ten frames from the alpha
// bounds of the set in /frames; re-measure if those frames are regenerated.
const FIGURE_HEIGHTS = [435, 436, 435, 444, 454, 466, 473, 473, 471, 468, 464, 461, 460]
const HEIGHT_STEP = 10
const BASE_HEIGHT = FIGURE_HEIGHTS[0]

// Where he parks on the third screen: to the right, leaving the stage to the
// product list. Measured against the visible body, not the frame — standing
// square he covers 25%-75% of the canvas width, the rest is transparent.
const PARKED_X = 28

// Softens both ends of the slide so it doesn't start or stop on a corner.
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

// Keeps the soldier the same height throughout by cancelling the pose's own
// height, interpolating between the sampled frames.
function heightScale(frame) {
  const i = Math.min(FIGURE_HEIGHTS.length - 2, Math.floor(frame / HEIGHT_STEP))
  const t = Math.min(1, (frame - i * HEIGHT_STEP) / HEIGHT_STEP)
  const height = FIGURE_HEIGHTS[i] + (FIGURE_HEIGHTS[i + 1] - FIGURE_HEIGHTS[i]) * t
  return BASE_HEIGHT / height
}

export default function SoldierScrollFigure({ progress, phaseB }) {
  const blendRef = useRef(null)

  // One clip across the whole stage rather than one per screen: the split is
  // placed so the frames advance at the same rate either side of it, which
  // makes the scroll position and the pose the same thing all the way down.
  const { frame, baseSrc, nextSrc } = useFrameSequence(progress, {
    dir: FRAMES_DIR,
    count: FRAME_COUNT,
    blendRef,
  })

  // He finishes the move and only then walks out of centre, so the two overlap
  // into one gesture instead of sliding a still figure sideways.
  const x = easeInOut(useScrollFade(phaseB, [0.25, 0.9], [0, 1])) * PARKED_X
  const scale = heightScale(frame)

  return (
    // The wrapper owns the placement so it can stay centred on wide screens but
    // tuck against the right edge once the copy needs the room.
    <div
      style={{ '--turn-x': `${x}vw` }}
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[min(38%,55vw)] justify-center sm:h-[min(54%,37vw)] sm:justify-end lg:h-[min(66.67%,45vw)] lg:justify-center lg:[transform:translateX(var(--turn-x))]"
    >
      <div style={{ transform: `scale(${scale})` }} className="relative h-full origin-bottom">
        <img
          src={baseSrc}
          alt="ATMARAKSI VR training soldier"
          decoding="sync"
          className="h-full w-auto max-w-none select-none object-contain"
          draggable={false}
        />
        <img
          ref={blendRef}
          src={nextSrc}
          alt=""
          aria-hidden="true"
          decoding="sync"
          style={{ opacity: 0 }}
          className="absolute inset-y-0 left-0 h-full w-auto max-w-none select-none object-contain"
          draggable={false}
        />
      </div>
    </div>
  )
}
