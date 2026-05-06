'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQ_KEYS = ['1', '2', '3', '4', '5'] as const

export function FAQSection() {
  const t = useTranslations('faq')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="py-24 bg-[var(--bg-primary)]" ref={ref}>
      <div className="container-site max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className={cn(
            'text-xs tracking-[0.4em] uppercase text-gold-500 mb-3',
            isAmharic && 'font-amharic tracking-widest text-sm'
          )}>
            {isAmharic ? 'ጥያቄዎችና መልሶች' : 'FAQ'}
          </p>
          <h2 className={cn(
            'section-title text-4xl sm:text-5xl text-[var(--text-primary)] mb-4',
            isAmharic && 'font-amharic'
          )}>
            {t('title')}
          </h2>
          <hr className="gold-divider w-24 mx-auto mb-4" />
          <p className={cn(
            'text-[var(--text-secondary)]',
            isAmharic && 'font-amharic text-lg'
          )}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_KEYS.map((key, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  'border transition-all duration-300',
                  isOpen
                    ? 'border-gold-500/50 bg-gold-500/5'
                    : 'border-[var(--border)] bg-[var(--bg-card)]'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className={cn(
                    'font-semibold text-[var(--text-primary)] flex-1',
                    isAmharic ? 'font-amharic text-base' : 'font-body text-sm'
                  )}>
                    <span className="text-gold-500 mr-3 font-display text-lg">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {t(`q${key}` as any)}
                  </span>
                  <div className={cn(
                    'shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300',
                    isOpen
                      ? 'border-gold-500 bg-gold-500 text-forest-900'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  )}>
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className={cn(
                        'px-5 pb-5 text-[var(--text-secondary)] leading-relaxed',
                        isAmharic ? 'font-amharic text-base' : 'text-sm font-body'
                      )}>
                        {t(`a${key}` as any)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
