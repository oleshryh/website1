import { useRef } from 'react'
import useFrameSequence from './useFrameSequence'
import useScrollFade from './useScrollFade'
import { FRAME_COUNT } from './stage'

// The soldier isn't the same height in every pose — arms out he measures 435px
// of the 494px frame, mid-clip 475 — so at a constant frame height he would
// visibly grow as the page scrolls. Sampled every ten frames from the alpha
// bounds of each set; re-measure if the frames are regenerated.
const HEIGHT_STEP = 10
const CLIPS = {
  main: {
    dir: '/frames',
    heights: [435, 436, 435, 444, 454, 466, 473, 473, 471, 468, 464, 461, 460],
  },
  turn: {
    dir: '/frames-turn',
    heights: [460, 458, 460, 462, 464, 465, 466, 466, 464, 466, 466, 467, 467],
  },
}
// Everything is measured against the opening pose, so his apparent height is
// the same on every screen and across the handover between the two clips.
const BASE_HEIGHT = CLIPS.main.heights[0]

// Where he stands on each screen, in vw from centre. He drifts right as the
// copy needs the room: clear of the second screen's headline, then off to the
// side for the product list, and stays there for the contact form.
const LANE_2 = 12
const LANE_3 = 28

// Softens both ends of a move so it doesn't start or stop on a corner.
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

function heightScale(heights, frame) {
  const i = Math.min(heights.length - 2, Math.floor(frame / HEIGHT_STEP))
  const t = Math.min(1, (frame - i * HEIGHT_STEP) / HEIGHT_STEP)
  return BASE_HEIGHT / (heights[i] + (heights[i + 1] - heights[i]) * t)
}

export default function SoldierScrollFigure({ mainPhase, turnPhase, phaseA, phaseB }) {
  const blendRef = useRef(null)

  // Clip 2 is another 4MB, so it only starts loading once the first screen is
  // behind us rather than competing with the initial paint.
  const turnReady = useScrollFade(phaseA, [0.5, 0.55], [0, 1]) > 0
  const onTurn = useScrollFade(turnPhase, [0, 0.001], [0, 1]) > 0

  const main = useFrameSequence(mainPhase, {
    dir: CLIPS.main.dir,
    count: FRAME_COUNT,
    blendRef: onTurn ? null : blendRef,
  })
  const turn = useFrameSequence(turnPhase, {
    dir: CLIPS.turn.dir,
    count: FRAME_COUNT,
    blendRef: onTurn ? blendRef : null,
    preload: turnReady,
  })

  const clip = onTurn ? turn : main
  const scale = heightScale(onTurn ? CLIPS.turn.heights : CLIPS.main.heights, clip.frame)

  // He finishes each move and only then walks further out of centre, so the
  // two overlap into one drift instead of sliding a still figure sideways.
  const lane =
    easeInOut(useScrollFade(phaseA, [0.55, 1], [0, 1])) * LANE_2 +
    easeInOut(useScrollFade(phaseB, [0.25, 0.9], [0, 1])) * (LANE_3 - LANE_2)

  return (
    // Its own layer above the white panel: the panel slides up behind him on
    // the last screen, so he crosses its rounded edge and ends up standing on
    // the black — one figure, not a handover between two.
    <div className="pointer-events-none fixed inset-0 z-20">
      <div
        style={{ '--lane': `${lane}vw` }}
        className="absolute inset-x-0 bottom-0 flex h-[min(38%,55vw)] justify-center sm:h-[min(54%,37vw)] sm:justify-end lg:h-[min(66.67%,45vw)] lg:justify-center lg:[transform:translateX(var(--lane))]"
      >
        <div style={{ transform: `scale(${scale})` }} className="relative h-full origin-bottom">
          <img
            src={clip.baseSrc}
            alt="ATMARAKSI VR training soldier"
            decoding="sync"
            className="h-full w-auto max-w-none select-none object-contain"
            draggable={false}
          />
          <img
            ref={blendRef}
            src={clip.nextSrc}
            alt=""
            aria-hidden="true"
            decoding="sync"
            style={{ opacity: 0 }}
            className="absolute inset-y-0 left-0 h-full w-auto max-w-none select-none object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
