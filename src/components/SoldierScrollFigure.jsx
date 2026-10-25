import { figureBox } from './heroLayout'
import { useStackedCopyHeight } from './stackedCopy'
import useFrameSequence from './useFrameSequence'
import useFrameSet from './useFrameSet'
import useViewport from './useViewport'

// The soldier isn't the same height in every pose — arms out he measures 435px
// of the 494px frame, mid-clip 475 — so at a constant frame height he would
// visibly grow as the page scrolls. Sampled every ten frames from the alpha
// bounds of each set; re-measure if the frames are regenerated.
const HEIGHTS = [435, 436, 435, 444, 454, 466, 473, 473, 471, 468, 464, 461, 460]
// Everything is measured against the opening pose, so his apparent height is
// the same on both screens.
const BASE_HEIGHT = HEIGHTS[0]

// Takes how far along the clip we are rather than a frame number, so it reads
// the same curve whichever set is loaded — the light set has half the frames.
function heightScale(position) {
  const span = (HEIGHTS.length - 1) * Math.min(1, Math.max(0, position))
  const i = Math.min(HEIGHTS.length - 2, Math.floor(span))
  const t = span - i
  return BASE_HEIGHT / (HEIGHTS[i] + (HEIGHTS[i + 1] - HEIGHTS[i]) * t)
}

export default function SoldierScrollFigure({ progress }) {
  const frames = useFrameSet()
  const clip = useFrameSequence(progress, { dir: frames.main, count: frames.count })
  const scale = heightScale(clip.frame / (frames.count - 1))

  const { w: vw, h: vh } = useViewport()
  const box = figureBox(vw, vh, useStackedCopyHeight())

  return (
    // Lives on the pinned screen, so once the second screen is done he leaves
    // upwards with it.
    <div className="pointer-events-none absolute inset-0 z-20">
      <div
        className="absolute"
        style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
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
