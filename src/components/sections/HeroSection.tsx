'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90',
  'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1920&q=90',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90',
]

// Rotating words: animated below the brand. Localized.
const ROTATING_WORDS_EN = ['Elegance', 'Craftsmanship', 'Quality', 'Luxury']
const ROTATING_WORDS_AM = ['ውበት', 'ጥበብ', 'ጥራት', 'ምርጥነት']

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const [currentImage, setCurrentImage] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const bgX = useTransform(smoothX, (v) => v * -10)
  const bgY = useTransform(smoothY, (v) => v * -10)

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t1 = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5500)
    return () => clearInterval(t1)
  }, [])

  useEffect(() => {
    const words = isAmharic ? ROTATING_WORDS_AM : ROTATING_WORDS_EN
    const t2 = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 2400)
    return () => clearInterval(t2)
  }, [isAmharic])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const rotatingWords = isAmharic ? ROTATING_WORDS_AM : ROTATING_WORDS_EN
  const slogan = 'የእርስዎ ምናብ፣ የእኛ ጥበብ'

  // Split "Golden Zaf" into characters for staggered reveal.
  const brandText = 'Golden Zaf'
  const brandChars = Array.from(brandText)

  // Trail words: "Furniture and Interior" reveals word-by-word.
  const trailText = isAmharic ? 'Furniture and Interior' : 'Furniture and Interior'
  const trailWords = trailText.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background slides */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-[-5%]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentImage]}
              alt="Golden Zaf interior"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Overlays — deep forest + black gradient to match the logo backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-forest-900/40" />

      {/* Gold corner accents */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-gold-500 opacity-60" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r-2 border-t-2 border-gold-500 opacity-60" />
      <div className="absolute bottom-16 left-6 w-16 h-16 border-l-2 border-b-2 border-gold-500 opacity-60" />
      <div className="absolute bottom-16 right-6 w-16 h-16 border-r-2 border-b-2 border-gold-500 opacity-60" />

      {/* Content */}
      <div className="relative z-10 container-site pb-24 pt-12 text-center text-white sm:pb-28 sm:pt-16">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12, letterSpacing: '0.15em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'text-xs uppercase text-gold-400 mb-6 font-body',
            isAmharic && 'font-amharic text-sm tracking-widest',
          )}
        >
          {t('tagline')}
        </motion.p>

        {/* Title — split character + word reveal */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-none mb-4">
          <span aria-label={brandText} className="block">
            <span className="sr-only">{brandText}</span>
            {brandChars.map((c, i) => (
              <motion.span
                key={`${c}-${i}`}
                aria-hidden
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.35 + i * 0.05,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block text-gold-gradient"
                style={{ transformOrigin: '50% 100%' }}
              >
                {c === ' ' ? ' ' : c}
              </motion.span>
            ))}
          </span>

          {/* Animated underline */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block mx-auto mt-3 mb-3 h-px w-40 sm:w-56 bg-gradient-to-r from-transparent via-gold-500 to-transparent origin-center"
          />

          {/* Trail */}
          <span className="block text-white/85 text-2xl sm:text-3xl md:text-4xl font-light tracking-wider">
            {trailWords.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: 1.05 + i * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn('inline-block mr-2 last:mr-0', isAmharic && 'font-amharic')}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Rotating word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="h-8 sm:h-10 mb-2 flex items-center justify-center"
        >
          <span
            className={cn(
              'text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-300/80',
              isAmharic && 'font-amharic tracking-widest',
            )}
          >
            {isAmharic ? 'ቅልጥፍና በ' : 'Designed for'}
            &nbsp;
          </span>
          <div className="relative inline-block min-w-[140px] sm:min-w-[180px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'inline-block text-sm sm:text-base font-semibold tracking-widest uppercase text-gold-gradient',
                  isAmharic && 'font-amharic tracking-wide',
                )}
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className={cn(
            'text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-body',
            isAmharic && 'font-amharic text-lg sm:text-xl',
          )}
        >
          {t('subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="mx-auto mb-8 w-fit border border-gold-500/30 bg-black/15 px-5 py-2 text-sm text-gold-200/90 backdrop-blur-sm"
        >
          {slogan}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.95, duration: 0.7 }}
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
            className={cn(
              'btn-outline text-white border-white/40 hover:border-gold-500 hover:text-gold-500',
              isAmharic && 'font-amharic',
            )}
          >
            {t('cta_secondary')}
          </Link>
        </motion.div>

      </div>

      {/* Image indicators */}
      <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-28">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Hero image ${i + 1}`}
            onClick={() => setCurrentImage(i)}
            className={cn(
              'h-0.5 rounded-full transition-all duration-500',
              i === currentImage ? 'w-8 bg-gold-500' : 'w-4 bg-white/30',
            )}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span
          className={cn(
            'text-xs tracking-widest uppercase',
            isAmharic && 'font-amharic',
          )}
        >
          {t('scroll')}
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-gold-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
