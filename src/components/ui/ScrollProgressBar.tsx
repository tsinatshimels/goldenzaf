'use client'
import { useScrollProgress } from '@/hooks'
import { motion, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const progress = useScrollProgress()
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #C9A84C, #F5D483, #C9A84C)',
      }}
    />
  )
}
