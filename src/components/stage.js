// Screens 1-2 keep the 140vh of scroll they were tuned against; screen 3 gets
// the same again, which keeps the auto-advance hops equal in length.
export const STAGE_VH = 380
// Fraction of the stage's *scrollable* length that belongs to screens 1-2:
// (240 - 100) / (380 - 100).
export const SCENE_SPLIT = 0.5
// Module-level so the auto-advance effect isn't re-created every render.
export const STAGE_STOPS = [0, SCENE_SPLIT, 1]
