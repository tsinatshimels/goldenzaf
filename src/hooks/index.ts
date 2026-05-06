'use client'
import { useState, useEffect, useCallback } from 'react'

/** Returns true if page has been scrolled past threshold */
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

/** Returns scroll progress 0–1 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return progress
}

/** Persisted state via localStorage */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  const set = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof newValue === 'function' ? (newValue as (p: T) => T)(prev) : newValue
        try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
        return next
      })
    },
    [key]
  )

  return [value, set] as const
}

/** Detect if component has mounted (avoids SSR hydration issues) */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

/** Media query hook */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}
