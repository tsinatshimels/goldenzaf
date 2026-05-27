'use client'
import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Grid, List } from 'lucide-react'
import {
  cn,
  CATEGORY_KEYS,
  categoryLabels,
  getProjectHref,
  subcategoriesByCategory,
  subcategoryLabels,
  getImageFor,
  type CategoryKey,
} from '@/lib/utils'
import { urlFor } from '@/sanity/lib/client'

const DEMO_PROJECTS = [
  { _id: '1', title: 'Modern Sofa Set', titleAm: 'ዘመናዊ ሶፋ', slug: { current: 'demo-1' }, category: 'living_room', subcategory: 'center_table' },
  { _id: '2', title: 'Executive Office Desk', titleAm: 'ዋና የቢሮ ጠረጴዛ', slug: { current: 'demo-2' }, category: 'office', subcategory: 'executive_desk' },
  { _id: '3', title: 'King Bedroom Set', titleAm: 'ዋና የመኝታ ዕቃ', slug: { current: 'demo-3' }, category: 'bedroom', subcategory: 'big_size_bed' },
  { _id: '4', title: 'Kitchen Cabinet Set', titleAm: 'የኩሽና ካቢኔ', slug: { current: 'demo-4' }, category: 'dining_kitchen', subcategory: 'kitchen_cabinets' },
  { _id: '5', title: 'CNC Carved Door', titleAm: 'CNC ተቀረጸ በር', slug: { current: 'demo-5' }, category: 'doors', subcategory: 'main_gate' },
  { _id: '6', title: 'Wall Art Frame', titleAm: 'የግድግዳ ጥበብ ፍሬም', slug: { current: 'demo-6' }, category: 'wall_art', subcategory: 'wall_art' },
  { _id: '7', title: 'Kitchen Cabinet Set', titleAm: 'የኩሽና ካቢኔ', slug: { current: 'demo-7' }, category: 'dining_kitchen', subcategory: 'kitchen_cabinets' },
  { _id: '8', title: 'Office Interior Concept', titleAm: 'የቢሮ ውስጥ ዲዛይን', slug: { current: 'demo-8' }, category: 'interior', subcategory: 'office_interior' },
  { _id: '9', title: 'Shoe Rack', titleAm: 'የጫማ ማቆያ', slug: { current: 'demo-9' }, category: 'other', subcategory: 'shoe_rack' },
]

export function ProjectsClient({ serverProjects }: { serverProjects: any[] }) {
  const t = useTranslations('projects')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const search = useSearchParams()
  const worksTitle = isAmharic ? 'ስራዎቻችን' : 'Our Works'

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeSub, setActiveSub] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const c = search?.get('category')
    if (c && (CATEGORY_KEYS as string[]).includes(c)) {
      setActiveCategory(c)
      setActiveSub('all')
    }
  }, [search])

  const projects = serverProjects.length > 0 ? serverProjects : DEMO_PROJECTS

  const subOptions =
    activeCategory !== 'all'
      ? subcategoriesByCategory[activeCategory as CategoryKey] || []
      : []

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false
      if (activeSub !== 'all' && p.subcategory !== activeSub) return false
      return true
    })
  }, [projects, activeCategory, activeSub])

  const getImage = (p: any) => {
    if (p.coverImage) {
      try {
        return urlFor(p.coverImage).width(800).url()
      } catch {
        // ignore invalid Sanity image data and fall back
      }
    }
    return getImageFor(p.category, p.subcategory)
  }

  return (
    <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <div className="container-site">
        <div className="text-center mb-12">
          <p
            className={cn(
              'text-xs tracking-[0.4em] uppercase text-gold-500 mb-3',
              isAmharic && 'font-amharic tracking-widest text-sm',
            )}
          >
            {isAmharic ? 'ስራዎቻችን' : 'Portfolio'}
          </p>
          <h1
            className={cn(
              'section-title text-5xl sm:text-6xl text-[var(--text-primary)] mb-4',
              isAmharic && 'font-amharic',
            )}
          >
            {worksTitle}
          </h1>
          <hr className="gold-divider w-24 mx-auto mb-4" />
          <p
            className={cn(
              'text-[var(--text-secondary)]',
              isAmharic && 'font-amharic text-lg',
            )}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveCategory('all')
                setActiveSub('all')
              }}
              className={cn(
                'px-4 py-2 text-xs font-body tracking-wide border transition-all duration-200',
                isAmharic && 'font-amharic text-sm',
                activeCategory === 'all'
                  ? 'bg-gold-500 text-forest-900 border-gold-500 font-semibold'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-gold-500 hover:text-gold-500',
              )}
            >
              {t('filter_all')}
            </button>
            {CATEGORY_KEYS.map((cat) => {
              const label = isAmharic ? categoryLabels[cat].am : categoryLabels[cat].en
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setActiveSub('all')
                  }}
                  className={cn(
                    'px-4 py-2 text-xs font-body tracking-wide border transition-all duration-200',
                    isAmharic && 'font-amharic text-sm',
                    activeCategory === cat
                      ? 'bg-gold-500 text-forest-900 border-gold-500 font-semibold'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-gold-500 hover:text-gold-500',
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1 border border-[var(--border)] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 transition-colors',
                viewMode === 'grid'
                  ? 'bg-gold-500 text-forest-900'
                  : 'text-[var(--text-muted)]',
              )}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 transition-colors',
                viewMode === 'list'
                  ? 'bg-gold-500 text-forest-900'
                  : 'text-[var(--text-muted)]',
              )}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {subOptions.length > 0 && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-6"
            >
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setActiveSub('all')}
                  className={cn(
                    'px-3 py-1.5 text-[11px] font-body tracking-wide border rounded-full transition-all',
                    isAmharic && 'font-amharic text-xs',
                    activeSub === 'all'
                      ? 'border-gold-500 text-gold-500 bg-gold-500/10 font-semibold'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:border-gold-500/60 hover:text-gold-500',
                  )}
                >
                  {isAmharic ? 'ሁሉም ንዑስ ምድቦች' : 'All subcategories'}
                </button>
                {subOptions.map((sub) => {
                  const subLabel = isAmharic ? sub.am : sub.en
                  return (
                    <button
                      key={sub.key}
                      onClick={() => setActiveSub(sub.key)}
                      className={cn(
                        'px-3 py-1.5 text-[11px] font-body tracking-wide border rounded-full transition-all',
                        isAmharic && 'font-amharic text-xs',
                        activeSub === sub.key
                          ? 'border-gold-500 text-gold-500 bg-gold-500/10 font-semibold'
                          : 'border-[var(--border)] text-[var(--text-muted)] hover:border-gold-500/60 hover:text-gold-500',
                      )}
                    >
                      {subLabel}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className={cn('text-sm text-[var(--text-muted)] mb-6', isAmharic && 'font-amharic')}>
          {filtered.length} {isAmharic ? 'ፕሮጀክቶች' : 'projects'}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeSub + viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4',
            )}
          >
            {filtered.length === 0 ? (
              <div
                className={cn(
                  'col-span-3 text-center py-20 text-[var(--text-muted)]',
                  isAmharic && 'font-amharic',
                )}
              >
                {t('no_projects')}
              </div>
            ) : (
              filtered.map((project, i) => {
                const title = isAmharic
                  ? project.titleAm || project.title
                  : project.title
                const href = getProjectHref(locale, project)
                const catLabel = isAmharic
                  ? categoryLabels[project.category as CategoryKey]?.am
                  : categoryLabels[project.category as CategoryKey]?.en
                const subLabel = project.subcategory
                  ? isAmharic
                    ? subcategoryLabels[project.subcategory]?.am
                    : subcategoryLabels[project.subcategory]?.en
                  : undefined

                if (viewMode === 'list') {
                  const content = (
                    <div className="group card-glass flex items-center gap-4 p-4 overflow-hidden">
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden">
                        <Image
                          src={getImage(project)}
                          alt={title}
                          fill
                          sizes="80px"
                          className={cn(
                            'object-cover transition-transform duration-500',
                            href && 'group-hover:scale-110',
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-gold-500 uppercase tracking-wider font-semibold">
                          {catLabel}
                          {subLabel && (
                            <span className="opacity-70">
                              {' '}
                              · {subLabel}
                            </span>
                          )}
                        </span>
                        <h3
                          className={cn(
                            'font-display text-lg font-semibold text-[var(--text-primary)] truncate',
                            href && 'group-hover:text-gold-500 transition-colors',
                            isAmharic && 'font-amharic',
                          )}
                        >
                          {title}
                        </h3>
                      </div>
                      {href && (
                        <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-gold-500 transition-colors shrink-0" />
                      )}
                    </div>
                  )

                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {href ? <Link href={href}>{content}</Link> : content}
                    </motion.div>
                  )
                }

                const content = (
                  <div className="group card-glass overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={getImage(project)}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={cn(
                          'object-cover transition-transform duration-700',
                          href && 'group-hover:scale-105',
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span
                          className={cn(
                            'text-[10px] px-2.5 py-1 bg-gold-500 text-forest-900 font-bold tracking-wider uppercase w-max',
                            isAmharic && 'font-amharic text-[10px]',
                          )}
                        >
                          {catLabel}
                        </span>
                        {subLabel && (
                          <span
                            className={cn(
                              'text-[10px] px-2.5 py-1 bg-forest-900/85 text-gold-300 font-semibold tracking-wider uppercase w-max',
                              isAmharic && 'font-amharic text-[10px]',
                            )}
                          >
                            {subLabel}
                          </span>
                        )}
                      </div>
                      {href && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3
                        className={cn(
                          'font-display text-lg font-semibold text-[var(--text-primary)]',
                          href && 'group-hover:text-gold-500 transition-colors',
                          isAmharic && 'font-amharic',
                        )}
                      >
                        {title}
                      </h3>
                      {project.description && (
                        <p
                          className={cn(
                            'text-sm text-[var(--text-muted)] mt-1 line-clamp-1',
                            isAmharic && 'font-amharic',
                          )}
                        >
                          {isAmharic
                            ? project.descriptionAm
                            : project.description}
                        </p>
                      )}
                    </div>
                  </div>
                )

                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {href ? <Link href={href}>{content}</Link> : content}
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
