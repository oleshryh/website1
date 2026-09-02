// The soldier's two clips drive the whole page. Clip 1 runs across screens
// 1-2-3, clip 2 across the reveal of the contact screen. Screen 2 lands on the
// pose where the weapon is held out; screen 3 on the pose where he stands
// square, the clip's last frame.
export const SPLIT_FRAME = 48
export const CLIP_FRAMES = 122
const LAST_FRAME = CLIP_FRAMES - 1

// Scroll spent per frame of clip 1. One number for both of its transitions, so
// he advances at exactly one rate from the top of the page to screen 3.
const FRAME_VH = 2.3
const TO_SCREEN_2 = SPLIT_FRAME * FRAME_VH
const TO_SCREEN_3 = (LAST_FRAME - SPLIT_FRAME) * FRAME_VH
// The white panel has to travel its own height past the top of the viewport to
// uncover the black behind it, which is exactly one viewport of scroll.
const REVEAL_VH = 100

// The white panel holds screens 1-3: one viewport pinned, plus both transitions.
export const PANEL_VH = 100 + TO_SCREEN_2 + TO_SCREEN_3
export const STAGE_VH = PANEL_VH + REVEAL_VH

const SCROLLABLE = STAGE_VH - 100
export const SCREEN_2 = TO_SCREEN_2 / SCROLLABLE
export const SCREEN_3 = (TO_SCREEN_2 + TO_SCREEN_3) / SCROLLABLE
// Clip 1 finishes exactly as screen 3 settles; clip 2 owns the reveal.
export const CLIP_HANDOVER = SCREEN_3

// Module-level so the auto-advance effect isn't re-created every render.
export const STAGE_STOPS = [0, SCREEN_2, SCREEN_3, 1]
