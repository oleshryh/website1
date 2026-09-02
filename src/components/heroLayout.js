// One place decides where the figure stands and how big it is. The soldier
// layer, the leader lines and the copy column all read it, so they cannot drift
// apart at a window size nobody tested.

export const FIGURE_ASPECT = 800 / 494
// The frames carry transparent margins: the soldier himself only occupies the
// middle of each one. Positioning by the box would leave a hand-width of empty
// pixels wherever a gap was meant to be, so everything is measured off these.
export const BODY_LEFT = 0.12
export const BODY_RIGHT = 0.86

export const COPY_MAX = 442
const sidePad = (vw) => (vw < 768 ? 24 : 36)
const GAP = 20
// Narrower than this the copy always stacks above the figure. So does any
// window taller than it is wide — a tablet held upright has no room for two
// columns either, however many pixels across it is.
const PHONE = 768
// And so does a window where standing him in the middle would squeeze the copy
// past reading width.
const MIN_COPY = 250

// He stands in the middle, two thirds of the window tall. That is the layout
// the site is drawn for, and it does not change with the window — what gives
// way is the copy beside him.
function centred(vw, vh) {
  const height = Math.min((vh * 2) / 3, vw * 0.45)
  const width = height * FIGURE_ASPECT
  return { width, height, left: (vw - width) / 2, top: vh - height }
}

// Room left of his shoulder for the copy column.
export function copyRoom(vw, vh) {
  const box = centred(vw, vh)
  return box.left + box.width * BODY_LEFT - GAP - sidePad(vw)
}

export const stacked = (vw, vh) => vw < PHONE || vh > vw || copyRoom(vw, vh) < MIN_COPY

export function figureBox(vw, vh) {
  if (!stacked(vw, vh)) return centred(vw, vh)

  // Stacked: the copy is above him, so nothing is beside him to clear and he
  // only has to fit the window's width.
  const height = Math.min(vh * 0.46, vw * 0.78)
  const width = height * FIGURE_ASPECT
  return { width, height, left: (vw - width) / 2, top: vh - height }
}

// Whether something of this width, tucked into the right margin, stays clear of
// him — what decides where the pull quote and the service list can sit.
export function clearsFigure(box, vw, width) {
  return vw - sidePad(vw) - width >= box.left + box.width * BODY_RIGHT
}

// How far right he can still step on the third screen before his shoulder
// leaves the window.
export function laneLimit(box, vw) {
  return Math.max(0, vw - 12 - (box.left + box.width * BODY_RIGHT))
}

// Stacked, the copy sits just above his head; side by side, at the bottom left.
// Measured here rather than in Tailwind so it can never disagree with the
// figure about which of the two layouts is in play.
export function copySlot(vw, vh) {
  const pad = sidePad(vw)
  const bottom = stacked(vw, vh) ? figureBox(vw, vh).height + 16 : 80
  return { left: pad, right: pad, bottom }
}

export function copyColumn(vw, vh) {
  if (stacked(vw, vh)) return {}
  return { maxWidth: Math.min(COPY_MAX, copyRoom(vw, vh)) }
}

// Height of the button row, which only the first screen draws — the second
// screen holds the same space empty so its text sits on the same line.
export const CTA_SPACER = 'mt-7 h-[52px] sm:mt-8 sm:h-[56px] lg:mt-9'
