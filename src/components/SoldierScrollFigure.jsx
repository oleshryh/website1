import useFrameSequence from './useFrameSequence'
import useFrameSet from './useFrameSet'
import useScrollFade from './useScrollFade'

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

// Takes how far along the clip we are rather than a frame number, so it reads
// the same curve whichever set is loaded — the light set has half the frames.
function heightScale(heights, position) {
  const span = (heights.length - 1) * Math.min(1, Math.max(0, position))
  const i = Math.min(heights.length - 2, Math.floor(span))
  const t = span - i
  return BASE_HEIGHT / (heights[i] + (heights[i + 1] - heights[i]) * t)
}

export default function SoldierScrollFigure({ mainPhase, turnPhase, phaseA }) {
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

  return (
    // Its own layer above the white panel: the panel slides up behind him on
    // the last screen, so he crosses its rounded edge and ends up standing on
    // the black — one figure, not a handover between two.
    <div className="pointer-events-none fixed inset-0 z-20">
      {/* He holds the same spot from the first screen to the last; only the
          clip itself moves. */}
      <div className="absolute inset-x-0 bottom-0 flex h-[min(38%,55vw)] justify-center sm:h-[min(54%,37vw)] sm:justify-end lg:h-[min(66.67%,45vw)] lg:justify-center">
        <div style={{ transform: `scale(${scale})` }} className="relative h-full origin-bottom">
          <img
            src={clip.src}
            alt="ATMARAKSI VR training soldier"
            decoding="sync"
            className="h-full w-auto max-w-none select-none object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
