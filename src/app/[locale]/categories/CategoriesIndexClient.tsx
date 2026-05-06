'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight } from 'lucide-react'
import {
  CATEGORY_KEYS,
  categoryLabels,
  categoryImages,
  subcategoriesByCategory,
  cn,
} from '@/lib/utils'

export function CategoriesIndexClient({ serverProjects }: { serverProjects: any[] }) {
  const locale = useLocale()
  const t = useTranslations('categories')
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const projectCounts = serverProjects.reduce<Record<string, number>>((acc, p) => {
    if (p.category) acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  return (
    <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen" ref={ref}>
      <div className="container-site">
        <div className="text-center mb-14">
          <p
            className={cn(
              'text-xs tracking-[0.4em] uppercase text-gold-500 mb-3',
              isAmharic && 'font-amharic tracking-widest text-sm',
            )}
          >
            {t('eyebrow')}
          </p>
          <h1
            className={cn(
              'section-title text-5xl sm:text-6xl text-[var(--text-primary)] mb-4',
              isAmharic && 'font-amharic',
            )}
          >
            {t('title')}
          </h1>
          <hr className="gold-divider w-24 mx-auto mb-4" />
          <p
            className={cn(
              'text-[var(--text-secondary)] max-w-2xl mx-auto',
              isAmharic && 'font-amharic text-lg',
            )}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_KEYS.map((key, i) => {
            const label = isAmharic ? categoryLabels[key].am : categoryLabels[key].en
            const subs = subcategoriesByCategory[key] || []
            const count = projectCounts[key] || 0
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <Link href={`/${locale}/categories/${key}`}>
                  <div className="group card-glass overflow-hidden h-full">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={categoryImages[key][0]}
                        alt={label}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] px-2.5 py-1 bg-gold-500 text-forest-900 font-bold tracking-wider uppercase">
                          {subs.length}
                          {' '}
                          {isAmharic ? 'ንዑስ ምድብ' : 'subs'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h3
                          className={cn(
                            'font-display text-xl font-semibold text-[var(--text-primary)] group-hover:text-gold-500 transition-colors',
                            isAmharic && 'font-amharic',
                          )}
                        >
                          {label}
                        </h3>
                        <span
                          className={cn(
                            'text-xs text-[var(--text-muted)] shrink-0',
                            isAmharic && 'font-amharic',
                          )}
                        >
                          {count > 0
                            ? `${count} ${isAmharic ? 'ምርቶች' : 'pieces'}`
                            : ''}
                        </span>
                      </div>
                      <p
                        className={cn(
                          'text-xs text-[var(--text-muted)] line-clamp-2',
                          isAmharic && 'font-amharic text-sm',
                        )}
                      >
                        {subs
                          .slice(0, 4)
                          .map((s) => (isAmharic ? s.am : s.en))
                          .join(' · ')}
                        {subs.length > 4 && '…'}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
