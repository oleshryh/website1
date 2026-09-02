import { useEffect, useState } from 'react'

// Phones get half the frames at half the width — a quarter of the bytes for an
// animation nobody is inspecting frame by frame on a 390px screen.
const FULL = { main: '/frames', turn: '/frames-turn', count: 122 }
const SMALL = { main: '/frames-sm', turn: '/frames-turn-sm', count: 61 }
const QUERY = '(max-width: 767px)'

export default function useFrameSet() {
  const [set, setSet] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(QUERY).matches ? SMALL : FULL,
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const sync = () => setSet(mq.matches ? SMALL : FULL)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return set
}
