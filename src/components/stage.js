// The first two screens share one pinned viewport. The soldier's turn between
// them is not scrubbed by the scroll: the scroll only decides which screen he
// should be on, and he then plays the whole turn on his own — so he never
// freezes halfway, while the page never holds the visitor back.
export const FRAME_COUNT = 122

// How long the screen stays pinned after the first, in viewports. Enough to
// take in the second screen when scrolling slowly; whoever keeps scrolling
// simply carries on into the products while he finishes turning.
const PINNED_VH = 100
export const STAGE_VH = 100 + PINNED_VH

// The turn's length, first screen to second, and where along the pinned stretch
// the scroll flips the target. The two thresholds differ so a scroll hovering
// at the edge doesn't make him swing back and forth.
export const TURN_SECONDS = 3
export const TO_SECOND_AT = 0.04
export const TO_FIRST_AT = 0.015
