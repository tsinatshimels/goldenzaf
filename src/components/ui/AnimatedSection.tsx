'use client'
import { useInView } from 'react-intersection-observer'
import { motion, type Variant } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn'

const variants: Record<AnimationType, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
}

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  as?: keyof JSX.IntrinsicElements
}

export function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className,
  threshold = 0.15,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true })
  const variant = variants[animation]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variant}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Staggered children animation */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
