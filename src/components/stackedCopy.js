import { useEffect, useSyncExternalStore } from 'react'

// On a phone the copy hangs from the header and the soldier fills whatever is
// left below it, so he has to know where the copy ends. The first and second
// screens write into the same slot; he is sized to the taller of the two so
// neither runs into him.
const heights = new Map()
const listeners = new Set()
let tallest = 0

function report(key, height) {
  heights.set(key, height)
  const next = Math.max(0, ...heights.values())
  if (next === tallest) return
  tallest = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useStackedCopyHeight() {
  return useSyncExternalStore(subscribe, () => tallest)
}

// Reports the element's height for as long as it is mounted. `mounted` lets a
// screen that only renders the element in some layouts re-attach when it does.
export function useReportCopyHeight(key, ref, mounted = true) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new ResizeObserver(() => report(key, el.offsetHeight))
    observer.observe(el)
    return () => {
      observer.disconnect()
      report(key, 0)
    }
  }, [key, ref, mounted])
}
