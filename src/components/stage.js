// The soldier's clip drives the first two screens. Screen 1 is its first frame,
// screen 2 its last, where he stands square as in the design. After screen 2
// the page scrolls on normally into the product cards.
export const FRAME_COUNT = 122
const LAST_FRAME = FRAME_COUNT - 1

// Scroll spent per frame of the clip.
const FRAME_VH = 1.5
const TO_SCREEN_2 = LAST_FRAME * FRAME_VH

// One viewport pinned, plus the transition between the two screens.
export const STAGE_VH = 100 + TO_SCREEN_2

// Module-level so the auto-advance effect isn't re-created every render.
export const STAGE_STOPS = [0, 1]
