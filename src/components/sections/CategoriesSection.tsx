'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CATEGORY_KEYS,
  categoryLabels,
  categoryImages,
  subcategoriesByCategory,
} from '@/lib/utils'

export function CategoriesSection() {
  const t = useTranslations('categories')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="py-24 bg-[var(--bg-primary)]" ref={ref}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className={cn(
              'text-xs tracking-[0.4em] uppercase text-gold-500 mb-3 font-body',
              isAmharic && 'font-amharic tracking-widest text-sm',
            )}
          >
            {t('eyebrow')}
          </p>
          <h2
            className={cn(
              'section-title text-4xl sm:text-5xl text-[var(--text-primary)] mb-4',
              isAmharic && 'font-amharic',
            )}
          >
            {t('title')}
          </h2>
          <hr className="gold-divider w-24 mx-auto mb-4" />
          <p
            className={cn(
              'text-[var(--text-secondary)] max-w-2xl mx-auto',
              isAmharic && 'font-amharic text-lg',
            )}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORY_KEYS.map((key, i) => {
            const label = isAmharic ? categoryLabels[key].am : categoryLabels[key].en
            const subs = subcategoriesByCategory[key] || []
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <Link href={`/${locale}/projects?category=${key}`}>
                  <div className="group card-glass relative overflow-hidden h-72 cursor-pointer">
                    <Image
                      src={categoryImages[key][0]}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                    <div className="absolute top-3 right-3 w-8 h-8 bg-gold-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4 h-4 text-forest-900" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3
                        className={cn(
                          'font-display text-lg font-semibold text-white mb-2',
                          isAmharic && 'font-amharic text-base',
                        )}
                      >
                        {label}
                      </h3>

                      <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500">
                        <ul className="space-y-0.5 mb-2">
                          {subs.slice(0, 4).map((s) => (
                            <li
                              key={s.key}
                              className={cn(
                                'text-xs text-gold-400/80 flex items-center gap-1.5',
                                isAmharic && 'font-amharic text-[13px]',
                              )}
                            >
                              <span className="w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                              {isAmharic ? s.am : s.en}
                            </li>
                          ))}
                          {subs.length > 4 && (
                            <li className="text-xs text-white/40">
                              +{subs.length - 4} {isAmharic ? 'ተጨማሪ' : 'more'}
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="h-0.5 bg-gradient-to-r from-gold-500 to-transparent w-0 group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
