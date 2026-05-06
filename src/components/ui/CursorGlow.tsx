'use client'
import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks'

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(pointer: fine)')

  useEffect(() => {
    if (!isDesktop) return

    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      {/* Glow blob */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] rounded-full z-0 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          transition: 'none',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full z-[999] will-change-transform"
        style={{ background: 'rgba(201,168,76,0.7)' }}
      />
    </>
  )
}
