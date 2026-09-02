import { figureBox, laneLimit } from './heroLayout'
import useFrameSequence from './useFrameSequence'
import useFrameSet from './useFrameSet'
import useScrollFade from './useScrollFade'
import useViewport from './useViewport'

// The soldier isn't the same height in every pose — arms out he measures 435px
// of the 494px frame, mid-clip 475 — so at a constant frame height he would
// visibly grow as the page scrolls. Sampled every ten frames from the alpha
// bounds of each set; re-measure if the frames are regenerated.
const HEIGHTS = {
  main: [435, 436, 435, 444, 454, 466, 473, 473, 471, 468, 464, 461, 460],
  turn: [460, 458, 460, 462, 464, 465, 466, 466, 464, 466, 466, 467, 467],
}
// Everything is measured against the opening pose, so his apparent height is
// the same on every screen and across the handover between the two clips.
const BASE_HEIGHT = HEIGHTS.main[0]

// The step he takes on the third screen, in vw, so the product list gets the
// room. Clamped to whatever is actually left between him and the window edge.
const LANE_3 = 10

// Softens both ends of the move so it doesn't start or stop on a corner.
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

// Takes how far along the clip we are rather than a frame number, so it reads
// the same curve whichever set is loaded — the light set has half the frames.
function heightScale(heights, position) {
  const span = (heights.length - 1) * Math.min(1, Math.max(0, position))
  const i = Math.min(heights.length - 2, Math.floor(span))
  const t = span - i
  return BASE_HEIGHT / (heights[i] + (heights[i + 1] - heights[i]) * t)
}

export default function SoldierScrollFigure({ mainPhase, turnPhase, phaseA, phaseB }) {
  const frames = useFrameSet()

  // Clip 2 is another 4MB, so it only starts loading once the first screen is
  // behind us rather than competing with the initial paint.
  const turnReady = useScrollFade(phaseA, [0.5, 0.55], [0, 1]) > 0
  const onTurn = useScrollFade(turnPhase, [0, 0.001], [0, 1]) > 0

  const main = useFrameSequence(mainPhase, { dir: frames.main, count: frames.count })
  const turn = useFrameSequence(turnPhase, {
    dir: frames.turn,
    count: frames.count,
    preload: turnReady,
  })

  const clip = onTurn ? turn : main
  const scale = heightScale(onTurn ? HEIGHTS.turn : HEIGHTS.main, clip.frame / (frames.count - 1))

  const { w: vw, h: vh } = useViewport()
  const box = figureBox(vw, vh)

  // He finishes the second screen's move and only then walks out of centre, so
  // the step reads as part of the animation rather than a slide.
  const lane = easeInOut(useScrollFade(phaseB, [0.25, 0.9], [0, 1])) * LANE_3
  const shift = Math.min((lane / 100) * vw, laneLimit(box, vw))

  return (
    // Its own layer above the panel: the panel slides up behind him on the last
    // screen, so he crosses its rounded edge without ever being cut off — one
    // figure, not a handover between two.
    <div className="pointer-events-none fixed inset-0 z-20">
      <div
        className="absolute"
        style={{ left: box.left + shift, top: box.top, width: box.width, height: box.height }}
      >
        <div style={{ transform: `scale(${scale})` }} className="h-full w-full origin-bottom">
          <img
            src={clip.src}
            alt="ATMARAKSI VR training soldier"
            decoding="sync"
            className="h-full w-full select-none object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
