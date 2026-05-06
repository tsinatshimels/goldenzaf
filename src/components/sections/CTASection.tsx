'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CTASection() {
  const tHero = useTranslations('hero')
  const tContact = useTranslations('contact')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-forest-900/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Decorative lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
      </div>

      <div className="container-site relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className={cn(
            'text-xs tracking-[0.5em] uppercase text-gold-400 mb-4',
            isAmharic && 'font-amharic tracking-widest text-sm'
          )}>
            {isAmharic ? 'ዛሬ ይጀምሩ' : 'Start Today'}
          </p>
          <h2 className={cn(
            'font-display text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-6 leading-tight',
            isAmharic && 'font-amharic'
          )}>
            {isAmharic
              ? 'ቤትዎን ህልም ቦታ\nያደርጉ'
              : 'Transform Your Space\nInto a Dream'}
          </h2>

          <hr className="gold-divider w-24 mx-auto mb-8" />

          <p className={cn(
            'text-white/60 max-w-xl mx-auto mb-10 text-lg',
            isAmharic && 'font-amharic'
          )}>
            {isAmharic
              ? 'ለምርጥ የቤት ዕቃ እና የውስጥ ዲዛይን አሁኑኑ ያግኙን'
              : 'Contact us today for premium furniture and interior design solutions'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/projects`}
              className={cn('btn-gold group', isAmharic && 'font-amharic')}
            >
              {tHero('cta_primary')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={cn('btn-outline text-white border-white/30 hover:border-gold-500 hover:text-gold-500 group', isAmharic && 'font-amharic')}
            >
              <Phone className="w-4 h-4" />
              {tContact('title')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
