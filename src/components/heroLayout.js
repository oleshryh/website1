// One place decides where the figure stands and how big it is. The soldier
// layer, the leader lines and the copy column all read it, so they cannot drift
// apart at a window size nobody tested.

export const FIGURE_ASPECT = 800 / 494
// The frames carry transparent margins: the soldier himself only occupies the
// middle of each one. Positioning by the box would leave a hand-width of empty
// pixels wherever a gap was meant to be, so everything is measured off these.
export const BODY_LEFT = 0.12
export const BODY_RIGHT = 0.86

// The copy column: full width on a phone, a fixed measure once there is room
// for the figure beside it.
export const COPY_MAX = 442
const sidePad = (vw) => (vw < 768 ? 24 : 36)
export const copyRight = (vw) => sidePad(vw) + Math.min(COPY_MAX, vw * 0.38)

const GAP = 20
// Narrower than this the copy always stacks above the figure. So does any
// window taller than it is wide — a tablet held upright has no room for two
// columns either, however many pixels across it is.
const PHONE = 768
export const stacked = (vw, vh) => vw < PHONE || vh > vw

// Bottom-anchored, and on a phone centred with the copy above it. Everywhere
// else the soldier fills the corridor to the right of the copy — as tall as the
// window allows, never wider than the corridor.
export function figureBox(vw, vh) {
  if (stacked(vw, vh)) {
    const height = Math.min(vh * 0.4, vw * 0.78)
    const width = height * FIGURE_ASPECT
    return { width, height, left: (vw - width) / 2, top: vh - height }
  }

  const from = copyRight(vw) + GAP
  const room = vw - GAP - from
  let width = room / (BODY_RIGHT - BODY_LEFT)
  let height = width / FIGURE_ASPECT

  const cap = vh * 0.62
  if (height > cap) {
    height = cap
    width = height * FIGURE_ASPECT
  }

  const body = width * (BODY_RIGHT - BODY_LEFT)
  const left = from + (room - body) / 2 - width * BODY_LEFT
  return { width, height, left, top: vh - height }
}

// How far right he can still step on the third screen before his shoulder
// leaves the window.
export function laneLimit(box, vw) {
  return Math.max(0, vw - 12 - (box.left + box.width * BODY_RIGHT))
}

// The slot the first and second screens both write their copy into, so one
// replaces the other in place instead of landing somewhere else on the screen.
// Stacked, it sits just above the soldier's head; side by side, at the bottom
// left. Measured here rather than in Tailwind so it can never disagree with the
// figure about which of the two layouts is in play.
export function copySlot(vw, vh) {
  const pad = sidePad(vw)
  return { left: pad, right: pad, bottom: stacked(vw, vh) ? vh * 0.42 : 80 }
}

export function copyColumn(vw, vh) {
  return stacked(vw, vh) ? {} : { maxWidth: Math.min(COPY_MAX, vw * 0.38) }
}
// Height of the button row, which only the first screen draws — the second
// screen holds the same space empty so its text sits on the same line.
export const CTA_SPACER = 'mt-7 h-[52px] sm:mt-8 sm:h-[56px] lg:mt-9'
