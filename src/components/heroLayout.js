// One place decides the first screen's geometry.
//
// The soldier stands in the middle of the window. Always, at every size — that
// is the composition, not a case to fall out of. What adapts is the copy, and
// it adapts in steps: each view gives it one fixed width, so a headline that
// fits on three lines keeps fitting on three lines however the window is
// dragged. Nothing is measured continuously against anything else.

export const FIGURE_ASPECT = 800 / 494
// The frames carry transparent margins: the soldier himself only occupies the
// middle of each one. Positioning by the box would leave a hand-width of empty
// pixels wherever a gap was meant to be, so everything is measured off these.
export const BODY_LEFT = 0.12
export const BODY_RIGHT = 0.86

const sidePad = (vw) => (vw < 768 ? 24 : 36)
const GAP = 20
// The two measures the copy is ever set to beside him. The narrow one is not a
// round number by accident: it is exactly what the button row needs to stay on
// one line.
const COPY_WIDE = 442
const COPY_SIDE = 292

// Two thirds of the window tall, in the middle. The site's own rule, untouched.
function standing(vw, vh) {
  const height = Math.min((vh * 2) / 3, vw * 0.45)
  const width = height * FIGURE_ASPECT
  return { width, height, left: (vw - width) / 2, top: vh - height }
}

// Room between the left margin and his shoulder.
function room(vw, vh) {
  const box = standing(vw, vh)
  return box.left + box.width * BODY_LEFT - GAP - sidePad(vw)
}

// Upright or narrow, the copy goes above him — a phone or a tablet stood on end
// has no second column whatever its pixel count. Lying down, it goes beside him
// at whichever of the two measures still fits.
export function view(vw, vh) {
  if (vw < 768 || vh > vw) return 'stacked'
  if (room(vw, vh) >= COPY_WIDE) return 'wide'
  if (room(vw, vh) >= COPY_SIDE) return 'side'
  return 'stacked'
}

export function figureBox(vw, vh) {
  if (view(vw, vh) !== 'stacked') return standing(vw, vh)

  // Nothing stands beside him here, so he is sized to the window's width rather
  // than to a column that isn't there.
  const height = Math.min(vh * 0.46, vw * 0.78)
  const width = height * FIGURE_ASPECT
  return { width, height, left: (vw - width) / 2, top: vh - height }
}

// Whether something of this width, tucked into the right margin, stays clear of
// him — what decides whether the pull quote and the service list are shown.
export function clearsFigure(box, vw, width) {
  return vw - sidePad(vw) - width >= box.left + box.width * BODY_RIGHT
}

// How far right he can still step on the third screen before his shoulder
// leaves the window.
export function laneLimit(box, vw) {
  return Math.max(0, vw - 12 - (box.left + box.width * BODY_RIGHT))
}

// Stacked, the copy sits just above his head; otherwise at the bottom left.
export function copySlot(vw, vh) {
  const pad = sidePad(vw)
  const mode = view(vw, vh)
  if (mode === 'stacked') return { left: pad, right: pad, bottom: figureBox(vw, vh).height + 16 }
  return { left: pad, right: pad, bottom: mode === 'wide' ? 96 : 80 }
}

export function copyColumn(vw, vh) {
  const mode = view(vw, vh)
  if (mode === 'stacked') return {}
  return { maxWidth: mode === 'wide' ? COPY_WIDE : COPY_SIDE }
}

// Height of the button row, which only the first screen draws — the second
// screen holds the same space empty so its text sits on the same line.
export const CTA_SPACER = 'mt-7 h-[52px] sm:mt-8 sm:h-[56px] lg:mt-9'
