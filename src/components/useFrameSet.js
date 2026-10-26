import { useState } from 'react'
import { url } from '../routes'

// Phones get half the frames at half the width — roughly a quarter of the bytes
// for an animation nobody inspects frame by frame on a 390px screen.
const FULL = { main: url('frames'), count: 122 }
const SMALL = { main: url('frames-sm'), count: 61 }
const QUERY = '(max-width: 767px)'

export default function useFrameSet() {
  // Decided once at mount: swapping sets mid-scroll would show as a jump in
  // sharpness, and crossing the breakpoint mid-visit is rare enough to live
  // with until the next load.
  const [set] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(QUERY).matches ? SMALL : FULL,
  )

  return set
}
