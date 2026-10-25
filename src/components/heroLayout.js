// One place decides the first screen's geometry.
//
// The soldier stands in the middle of the window. Always, at every size — that
// is the composition, not a case to fall out of. What adapts is the copy, and
// it adapts in steps: each view gives it one fixed width, so a headline that
// fits on three lines keeps fitting on three lines however the window is
// dragged. Beside the narrow column he may stand a little shorter, so the
// design's button row still fits at his left.

export const FIGURE_ASPECT = 800 / 494
// The frames carry transparent margins: the soldier himself only occupies the
// middle of each one. Positioning by the box would leave a hand-width of empty
// pixels wherever a gap was meant to be, so everything is measured off these.
export const BODY_LEFT = 0.12
export const BODY_RIGHT = 0.86

// The design keeps one 24px margin at every width.
const sidePad = () => 24
const GAP = 20
// The two measures the copy is ever set to beside him. The narrow one is not a
// round number by accident: it is exactly what the button row needs to stay on
// one line (the design's 224px button, 15px gap and 137px link).
const COPY_WIDE = 442
const COPY_SIDE = 376

// The shortest he may get to make room for the narrow column, as a share of
// the window's height.
const MIN_SIDE_HEIGHT = 0.42

function box(vw, vh, height) {
  const width = height * FIGURE_ASPECT
  return { width, height, left: (vw - width) / 2, top: vh - height }
}

// Two thirds of the window tall, in the middle. The site's own rule.
function natural(vw, vh) {
  return Math.min((vh * 2) / 3, vw * 0.45)
}

// The tallest he can stand, centred, with a column this wide still clear of
// his shoulder.
function fitting(vw, column) {
  const width = (vw / 2 - sidePad(vw) - GAP - column) / (0.5 - BODY_LEFT)
  return width / FIGURE_ASPECT
}

// Upright or narrow, the copy goes above him — a phone or a tablet stood on end
// has no second column whatever its pixel count. Lying down, it goes beside him:
// the wide column if he leaves room for it, otherwise the narrow one, for
// which he may stand a little shorter.
export function view(vw, vh) {
  if (vw < 768 || vh > vw) return 'stacked'
  if (fitting(vw, COPY_WIDE) >= natural(vw, vh)) return 'wide'
  if (fitting(vw, COPY_SIDE) >= vh * MIN_SIDE_HEIGHT) return 'side'
  return 'stacked'
}

function standing(vw, vh) {
  const mode = view(vw, vh)
  if (mode === 'side') return box(vw, vh, Math.min(natural(vw, vh), fitting(vw, COPY_SIDE)))
  return box(vw, vh, natural(vw, vh))
}

// Stacked, the copy hangs just under the header and he stands on the bottom
// edge of the window, filling what is left between them.
const STACK_TOP = 140
// The empty band above his head inside each frame; it may slide under the copy.
const HEAD_TOP = 0.08

// copyHeight is the stacked copy's measured height (see stackedCopy.js). Only
// the stacked view uses it.
export function figureBox(vw, vh, copyHeight = 0) {
  if (view(vw, vh) !== 'stacked') return standing(vw, vh)

  // Nothing stands beside him here, so he is sized to the window's width — and
  // on a short phone shrinks until he clears the buttons. Never below a third
  // of the window, so a phone on its side still shows him.
  const room = (vh - STACK_TOP - copyHeight - GAP) / (1 - HEAD_TOP)
  return box(vw, vh, Math.max(vh / 3, Math.min(vw * 0.78, room)))
}

// Whether something of this width, tucked into the right margin, stays clear of
// him — what decides whether the pull quote and the service list are shown.
export function clearsFigure(box, vw, width) {
  return vw - sidePad(vw) - width >= box.left + box.width * BODY_RIGHT
}

// Stacked, the copy hangs under the header; otherwise at the bottom left.
export function copySlot(vw, vh) {
  const pad = sidePad(vw)
  const mode = view(vw, vh)
  if (mode === 'stacked') return { left: pad, right: pad, top: STACK_TOP }
  // The design keeps the button row 24px off the bottom edge.
  return { left: pad, right: pad, bottom: 24 }
}

export function copyColumn(vw, vh) {
  const mode = view(vw, vh)
  if (mode === 'stacked') return {}
  return { maxWidth: mode === 'wide' ? COPY_WIDE : COPY_SIDE }
}
