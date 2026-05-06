'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90',
  'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1920&q=90',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90',
]

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentImage]}
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-forest-900/30" />

      {/* Gold corner accents */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-gold-500 opacity-60" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r-2 border-t-2 border-gold-500 opacity-60" />
      <div className="absolute bottom-16 left-6 w-16 h-16 border-l-2 border-b-2 border-gold-500 opacity-60" />
      <div className="absolute bottom-16 right-6 w-16 h-16 border-r-2 border-b-2 border-gold-500 opacity-60" />

      {/* Content */}
      <div className="relative z-10 container-site text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'text-xs tracking-[0.4em] uppercase text-gold-400 mb-6 font-body',
            isAmharic && 'font-amharic text-sm tracking-widest'
          )}
        >
          {t('tagline')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-none mb-4"
        >
          <span className="text-gold-gradient block">Golden Zaf</span>
          <span className={cn(
            'text-white/90 text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mt-2 block',
            isAmharic && 'font-amharic text-2xl sm:text-3xl'
          )}>
            {isAmharic ? 'ወርቃማ ዛፍ — የቤት ዕቃ' : 'Furniture & Interior'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={cn(
            'text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-body',
            isAmharic && 'font-amharic text-lg sm:text-xl'
          )}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={`/${locale}/projects`}
            className={cn('btn-gold group', isAmharic && 'font-amharic')}
          >
            {t('cta_primary')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className={cn('btn-outline text-white border-white/40 hover:border-gold-500 hover:text-gold-500', isAmharic && 'font-amharic')}
          >
            {t('cta_secondary')}
          </Link>
        </motion.div>

        {/* Image indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={cn(
                'h-0.5 rounded-full transition-all duration-500',
                i === currentImage ? 'w-8 bg-gold-500' : 'w-4 bg-white/30'
              )}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className={cn('text-xs tracking-widest uppercase', isAmharic && 'font-amharic')}>
          {t('scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-gold-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
