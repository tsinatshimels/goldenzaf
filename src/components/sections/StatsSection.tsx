'use client'
import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Trophy, Users, Star, Clock } from 'lucide-react'

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (inView && !hasStarted.current) {
      hasStarted.current = true
      const startTime = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * end))
        if (progress >= 1) clearInterval(timer)
      }, 16)
      return () => clearInterval(timer)
    }
  }, [inView, end, duration])

  return <span ref={ref}>{count}</span>
}

const STATS = [
  { icon: Trophy, valueKey: 'stats_projects', value: 500, suffix: '+' },
  { icon: Users, valueKey: 'stats_clients', value: 350, suffix: '+' },
  { icon: Clock, valueKey: 'stats_years', value: 10, suffix: '+' },
  { icon: Star, valueKey: 'stats_team', value: 50, suffix: '+' },
]

export function StatsSection() {
  const t = useTranslations('about')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f1c17 0%, #1E3A2F 100%)' }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 50%)'
        }}
      />

      <div className="container-site relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, valueKey, value, suffix }, i) => (
            <motion.div
              key={valueKey}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 border border-gold-500/30 flex items-center justify-center group-hover:border-gold-500 transition-colors duration-300">
                <Icon className="w-6 h-6 text-gold-500" />
              </div>

              {/* Number */}
              <div className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient mb-2">
                <CountUp end={value} />
                <span>{suffix}</span>
              </div>

              {/* Label */}
              <p className={cn(
                'text-sm text-white/60 tracking-wide uppercase',
                isAmharic && 'font-amharic text-base normal-case tracking-normal'
              )}>
                {t(valueKey as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
