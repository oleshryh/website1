// The soldier's clip runs across the whole stage. Screen 2 lands on the pose
// where he holds the weapon out; screen 3 on the pose where he stands square,
// the clip's last frame. Splitting the stage in the same proportion as the
// frames means he advances at one rate the whole way down, and the page just
// stops twice on the way.
export const FRAME_COUNT = 122
export const SPLIT_FRAME = 48
const LAST_FRAME = FRAME_COUNT - 1

export const STAGE_VH = 380
// Fraction of the stage's scrollable length that belongs to screens 1-2.
export const SCENE_SPLIT = SPLIT_FRAME / LAST_FRAME
// Module-level so the auto-advance effect isn't re-created every render.
export const STAGE_STOPS = [0, SCENE_SPLIT, 1]
