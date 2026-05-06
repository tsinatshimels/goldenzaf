'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NotFound() {
  const t = useTranslations()
  const locale = useLocale()
  const isAmharic = locale === 'am'

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
        <span className="font-display text-[30vw] font-bold text-gold-500 leading-none">404</span>
      </div>

      {/* Gold corner accents */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-gold-500/40" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-gold-500/40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-6"
      >
        {/* Gold divider top */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-8" />

        <p className={cn(
          'text-xs tracking-[0.4em] uppercase text-gold-500 mb-4',
          isAmharic && 'font-amharic tracking-widest text-sm'
        )}>
          {isAmharic ? 'ገጽ አልተገኘም' : 'Page Not Found'}
        </p>

        <h1 className="font-display text-8xl sm:text-9xl font-bold text-gold-gradient leading-none mb-4">
          404
        </h1>

        <h2 className={cn(
          'section-title text-2xl sm:text-3xl text-[var(--text-primary)] mb-4',
          isAmharic && 'font-amharic'
        )}>
          {t('error_404')}
        </h2>

        <p className={cn(
          'text-[var(--text-secondary)] mb-10 max-w-md mx-auto',
          isAmharic && 'font-amharic text-lg'
        )}>
          {isAmharic
            ? 'እርስዎ የሚፈልጉት ገጽ አልተገኘም። ወደ መነሻ ተመለስ።'
            : "The page you're looking for doesn't exist or has been moved."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}`} className={cn('btn-gold group', isAmharic && 'font-amharic')}>
            <Home className="w-4 h-4" />
            {t('back_home')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className={cn('btn-outline group', isAmharic && 'font-amharic')}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {isAmharic ? 'ወደ ኋላ' : 'Go Back'}
          </button>
        </div>

        {/* Gold divider bottom */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-12" />
      </motion.div>
    </div>
  )
}
