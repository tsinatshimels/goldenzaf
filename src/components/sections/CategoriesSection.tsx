'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categoryImages, categoryLabels } from '@/lib/utils'

const CATEGORIES = [
  { key: 'living_room', items: ['TV Stands', 'Coffee Tables', 'Console Tables', 'Dining Tables'] },
  { key: 'bedroom', items: ['Beds', 'Closets', 'Dressing Tables', 'Nightstands'] },
  { key: 'office', items: ['Executive Desks', 'Reception Desks', 'Office Chairs', 'Bookshelves'] },
  { key: 'dining_kitchen', items: ['Dining Sets', 'Kitchen Cabinets', 'Sideboards'] },
  { key: 'cnc', items: ['Arabian Majlis', 'Partitions', 'Patterns & Logos', 'Door Designs'] },
  { key: 'doors', items: ['Internal Doors', 'Main Gate'] },
  { key: 'interior', items: ['Wall Finishing'] },
  { key: 'other', items: ['Shoe Racks'] },
]

export function CategoriesSection() {
  const t = useTranslations('categories')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="py-24 bg-[var(--bg-primary)]" ref={ref}>
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className={cn(
            'text-xs tracking-[0.4em] uppercase text-gold-500 mb-3 font-body',
            isAmharic && 'font-amharic tracking-widest text-sm'
          )}>
            {isAmharic ? 'ምርቶቻችን' : 'What We Offer'}
          </p>
          <h2 className={cn(
            'section-title text-4xl sm:text-5xl text-[var(--text-primary)] mb-4',
            isAmharic && 'font-amharic'
          )}>
            {t('title')}
          </h2>
          <hr className="gold-divider w-24 mx-auto mb-4" />
          <p className={cn(
            'text-[var(--text-secondary)] max-w-2xl mx-auto',
            isAmharic && 'font-amharic text-lg'
          )}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => {
            const images = categoryImages[cat.key]
            const label = isAmharic ? categoryLabels[cat.key].am : categoryLabels[cat.key].en

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link href={`/${locale}/projects?category=${cat.key}`}>
                  <div className="group card-glass relative overflow-hidden h-72 cursor-pointer">
                    {/* Image */}
                    <Image
                      src={images[0]}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Gold corner on hover */}
                    <div className="absolute top-3 right-3 w-0 h-0 border-t-2 border-r-2 border-gold-500 opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-500" />

                    {/* Arrow icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-gold-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4 h-4 text-forest-900" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className={cn(
                        'font-display text-lg font-semibold text-white mb-2',
                        isAmharic && 'font-amharic text-base'
                      )}>
                        {label}
                      </h3>

                      {/* Sub-items */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
                        <ul className="space-y-0.5 mb-2">
                          {cat.items.slice(0, 3).map((item) => (
                            <li key={item} className="text-xs text-gold-400/80 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                          {cat.items.length > 3 && (
                            <li className="text-xs text-white/40">+{cat.items.length - 3} more</li>
                          )}
                        </ul>
                      </div>

                      {/* Gold bar */}
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
