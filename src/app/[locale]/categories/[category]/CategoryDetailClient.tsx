'use client'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import {
  cn,
  categoryLabels,
  subcategoriesByCategory,
  subcategoryLabels,
  getImageFor,
  getProjectHref,
  type CategoryKey,
} from '@/lib/utils'
import { urlFor } from '@/sanity/lib/client'

interface Props {
  category: CategoryKey
  projects: any[]
}

export function CategoryDetailClient({ category, projects }: Props) {
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const [activeSub, setActiveSub] = useState<string>('all')

  const label = isAmharic ? categoryLabels[category].am : categoryLabels[category].en
  const subs = subcategoriesByCategory[category] || []

  const filtered = useMemo(() => {
    if (activeSub === 'all') return projects
    return projects.filter((p) => p.subcategory === activeSub)
  }, [projects, activeSub])

  const counts: Record<string, number> = useMemo(() => {
    const c: Record<string, number> = { all: projects.length }
    for (const s of subs) c[s.key] = 0
    for (const p of projects) {
      if (p.subcategory && c[p.subcategory] !== undefined) c[p.subcategory]++
    }
    return c
  }, [projects, subs])

  const getImage = (p: any) => {
    if (p.coverImage) {
      try {
        return urlFor(p.coverImage).width(800).url()
      } catch {
        // ignore invalid Sanity image data and fall back
      }
    }
    return getImageFor(category, p.subcategory)
  }

  return (
    <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <div className="container-site">
        <div className="mb-6">
          <Link
            href={`/${locale}/categories`}
            className={cn(
              'inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-gold-500 transition-colors',
              isAmharic && 'font-amharic',
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            {isAmharic ? 'ሁሉም ምድቦች' : 'All Categories'}
          </Link>
        </div>

        <div className="mb-10">
          <p
            className={cn(
              'text-xs tracking-[0.4em] uppercase text-gold-500 mb-2',
              isAmharic && 'font-amharic tracking-widest text-sm',
            )}
          >
            {isAmharic ? 'ምድብ' : 'Category'}
          </p>
          <h1
            className={cn(
              'section-title text-4xl sm:text-5xl text-[var(--text-primary)] mb-3',
              isAmharic && 'font-amharic',
            )}
          >
            {label}
          </h1>
          <hr className="gold-divider w-16 mb-3" />
          <p
            className={cn(
              'text-sm text-[var(--text-muted)]',
              isAmharic && 'font-amharic',
            )}
          >
            {projects.length} {isAmharic ? 'ምርቶች' : 'pieces'} ·{' '}
            {subs.length} {isAmharic ? 'ንዑስ ምድቦች' : 'subcategories'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveSub('all')}
            className={cn(
              'px-4 py-2 text-xs font-body tracking-wide border transition-all duration-200',
              isAmharic && 'font-amharic text-sm',
              activeSub === 'all'
                ? 'bg-gold-500 text-forest-900 border-gold-500 font-semibold'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-gold-500 hover:text-gold-500',
            )}
          >
            {isAmharic ? 'ሁሉም' : 'All'} ({counts.all})
          </button>
          {subs.map((sub) => {
            const subLabel = isAmharic ? sub.am : sub.en
            const c = counts[sub.key] || 0
            return (
              <button
                key={sub.key}
                onClick={() => setActiveSub(sub.key)}
                className={cn(
                  'px-4 py-2 text-xs font-body tracking-wide border transition-all duration-200',
                  isAmharic && 'font-amharic text-sm',
                  activeSub === sub.key
                    ? 'bg-gold-500 text-forest-900 border-gold-500 font-semibold'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-gold-500 hover:text-gold-500',
                  c === 0 && 'opacity-60',
                )}
              >
                {subLabel} {c > 0 && <span className="opacity-70">({c})</span>}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSub}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length === 0 ? (
              <div
                className={cn(
                  'col-span-3 text-center py-20 text-[var(--text-muted)]',
                  isAmharic && 'font-amharic',
                )}
              >
                {isAmharic
                  ? 'በዚህ ንዑስ ምድብ ውስጥ ምርቶች ገና አልተጨመሩም።'
                  : 'No pieces uploaded in this subcategory yet.'}
              </div>
            ) : (
              filtered.map((project, i) => {
                const title = isAmharic
                  ? project.titleAm || project.title
                  : project.title
                const href = getProjectHref(locale, project)
                const subKey: string | undefined = project.subcategory
                const subLabel = subKey
                  ? isAmharic
                    ? subcategoryLabels[subKey]?.am
                    : subcategoryLabels[subKey]?.en
                  : undefined

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

                      {subLabel && (
                        <div className="absolute top-3 left-3">
                          <span
                            className={cn(
                              'text-[10px] px-2.5 py-1 bg-gold-500 text-forest-900 font-bold tracking-wider uppercase',
                              isAmharic && 'font-amharic text-[10px]',
                            )}
                          >
                            {subLabel}
                          </span>
                        </div>
                      )}
                      {href && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <ArrowUpRight className="w-4 h-4 text-white" />
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
                    </div>
                  </div>
                )

                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
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
