'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Grid, List } from 'lucide-react'
import { cn, categoryLabels, categoryImages } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/client'

const DEMO_PROJECTS = [
  { _id: '1', title: 'Modern Sofa Set', titleAm: 'ዘመናዊ ሶፋ', slug: { current: 'demo-1' }, category: 'living_room' },
  { _id: '2', title: 'Executive Office Desk', titleAm: 'ዋና የቢሮ ጠረጴዛ', slug: { current: 'demo-2' }, category: 'office' },
  { _id: '3', title: 'King Bedroom Set', titleAm: 'ዋና የመኝታ ዕቃ', slug: { current: 'demo-3' }, category: 'bedroom' },
  { _id: '4', title: 'Dining Table & Chairs', titleAm: 'የምግብ ጠረጴዛ', slug: { current: 'demo-4' }, category: 'dining_kitchen' },
  { _id: '5', title: 'CNC Carved Door', titleAm: 'CNC ተቀረጸ በር', slug: { current: 'demo-5' }, category: 'doors' },
  { _id: '6', title: 'Arabian Majlis', titleAm: 'አረቢያ ምቀኛ', slug: { current: 'demo-6' }, category: 'cnc' },
  { _id: '7', title: 'Kitchen Cabinet Set', titleAm: 'የኩሽና ካቢኔ', slug: { current: 'demo-7' }, category: 'dining_kitchen' },
  { _id: '8', title: 'Interior Wall Finishing', titleAm: 'የውስጥ ግድግዳ ማቁያ', slug: { current: 'demo-8' }, category: 'interior' },
  { _id: '9', title: 'Shoe Rack', titleAm: 'የጫማ ማቆያ', slug: { current: 'demo-9' }, category: 'other' },
]

const ALL_CATEGORIES = ['all', 'living_room', 'bedroom', 'office', 'dining_kitchen', 'cnc', 'doors', 'interior', 'other']

export function ProjectsClient({ serverProjects }: { serverProjects: any[] }) {
  const t = useTranslations('projects')
  const tCat = useTranslations('categories')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const projects = serverProjects.length > 0 ? serverProjects : DEMO_PROJECTS

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  )

  const getImage = (p: any) => {
    if (p.coverImage) return urlFor(p.coverImage).width(800).url()
    return categoryImages[p.category]?.[0] || categoryImages.living_room[0]
  }

  return (
    <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <div className="container-site">
        {/* Page header */}
        <div className="text-center mb-12">
          <p className={cn('text-xs tracking-[0.4em] uppercase text-gold-500 mb-3', isAmharic && 'font-amharic tracking-widest text-sm')}>
            {isAmharic ? 'ስራዎቻችን' : 'Portfolio'}
          </p>
          <h1 className={cn('section-title text-5xl sm:text-6xl text-[var(--text-primary)] mb-4', isAmharic && 'font-amharic')}>
            {t('title')}
          </h1>
          <hr className="gold-divider w-24 mx-auto mb-4" />
          <p className={cn('text-[var(--text-secondary)]', isAmharic && 'font-amharic text-lg')}>
            {t('subtitle')}
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => {
              const label = cat === 'all'
                ? t('filter_all')
                : (isAmharic ? categoryLabels[cat]?.am : categoryLabels[cat]?.en)
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-4 py-2 text-xs font-body tracking-wide border transition-all duration-200',
                    isAmharic && 'font-amharic text-sm',
                    activeCategory === cat
                      ? 'bg-gold-500 text-forest-900 border-gold-500 font-semibold'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-gold-500 hover:text-gold-500'
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 border border-[var(--border)] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn('p-1.5 transition-colors', viewMode === 'grid' ? 'bg-gold-500 text-forest-900' : 'text-[var(--text-muted)]')}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn('p-1.5 transition-colors', viewMode === 'list' ? 'bg-gold-500 text-forest-900' : 'text-[var(--text-muted)]')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project count */}
        <p className={cn('text-sm text-[var(--text-muted)] mb-6', isAmharic && 'font-amharic')}>
          {filtered.length} {isAmharic ? 'ፕሮጀክቶች' : 'projects'}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            )}
          >
            {filtered.length === 0 ? (
              <div className={cn('col-span-3 text-center py-20 text-[var(--text-muted)]', isAmharic && 'font-amharic')}>
                {t('no_projects')}
              </div>
            ) : filtered.map((project, i) => {
              const title = isAmharic ? (project.titleAm || project.title) : project.title
              const catLabel = isAmharic ? categoryLabels[project.category]?.am : categoryLabels[project.category]?.en

              if (viewMode === 'list') {
                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/${locale}/projects/${project.slug.current}`}>
                      <div className="group card-glass flex items-center gap-4 p-4 overflow-hidden">
                        <div className="relative w-20 h-20 shrink-0 overflow-hidden">
                          <Image src={getImage(project)} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-gold-500 uppercase tracking-wider font-semibold">{catLabel}</span>
                          <h3 className={cn('font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-gold-500 transition-colors truncate', isAmharic && 'font-amharic')}>{title}</h3>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-gold-500 transition-colors shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link href={`/${locale}/projects/${project.slug.current}`}>
                    <div className="group card-glass overflow-hidden">
                      <div className="relative h-56 overflow-hidden">
                        <Image src={getImage(project)} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={cn('text-[10px] px-2.5 py-1 bg-gold-500 text-forest-900 font-bold tracking-wider uppercase', isAmharic && 'font-amharic text-[9px]')}>
                            {catLabel}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className={cn('font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-gold-500 transition-colors', isAmharic && 'font-amharic')}>{title}</h3>
                        {project.description && (
                          <p className={cn('text-sm text-[var(--text-muted)] mt-1 line-clamp-1', isAmharic && 'font-amharic')}>{isAmharic ? project.descriptionAm : project.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
