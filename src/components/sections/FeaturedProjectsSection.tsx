'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn, categoryLabels, categoryImages, type CategoryKey } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/client'

interface Project {
  _id: string
  title: string
  titleAm?: string
  slug: { current: string }
  category: string
  description?: string
  descriptionAm?: string
  coverImage?: any
}

interface Props {
  projects: Project[]
}

const DEMO_PROJECTS: Project[] = [
  { _id: '1', title: 'Modern Living Room Set', titleAm: 'ዘመናዊ የሳሎን ዕቃ', slug: { current: 'demo-1' }, category: 'living_room', description: 'Elegant living room furniture collection' },
  { _id: '2', title: 'Executive Office Suite', titleAm: 'ዋና የቢሮ ዕቃ', slug: { current: 'demo-2' }, category: 'office', description: 'Professional office furniture setup' },
  { _id: '3', title: 'Master Bedroom Collection', titleAm: 'ዋና የመኝታ ዕቃ', slug: { current: 'demo-3' }, category: 'bedroom', description: 'Luxury bedroom furniture set' },
  { _id: '4', title: 'Gallery Wall Art', titleAm: 'የግድግዳ ጥበብ', slug: { current: 'demo-4' }, category: 'wall_art', description: 'Decorative wall art with a refined handcrafted finish' },
  { _id: '5', title: 'Custom Main Gate', titleAm: 'ብጁ ዋና ደጃፍ', slug: { current: 'demo-5' }, category: 'doors', description: 'Handcrafted solid wood main gate' },
  { _id: '6', title: 'Dining Room Set', titleAm: 'የምግብ ቤት ዕቃ', slug: { current: 'demo-6' }, category: 'dining_kitchen', description: 'Complete dining room furniture collection' },
]

export function FeaturedProjectsSection({ projects }: Props) {
  const t = useTranslations('projects')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const worksTitle = isAmharic ? 'ስራዎቻችን' : 'Our Works'
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const displayProjects = projects.length > 0 ? projects : DEMO_PROJECTS

  const getProjectImage = (project: Project) => {
    if (project.coverImage) return urlFor(project.coverImage).width(800).url()
    const cat = project.category as CategoryKey
    return categoryImages[cat]?.[0] || categoryImages.living_room[0]
  }

  return (
    <section className="py-24 bg-[var(--bg-secondary)]" ref={ref}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p className={cn('text-xs tracking-[0.4em] uppercase text-gold-500 mb-3', isAmharic && 'font-amharic tracking-widest text-sm')}>
              {isAmharic ? 'ስራዎቻችን' : 'Our Portfolio'}
            </p>
            <h2 className={cn('section-title text-4xl sm:text-5xl text-[var(--text-primary)]', isAmharic && 'font-amharic')}>
              {worksTitle}
            </h2>
            <hr className="gold-divider w-16 mt-4" />
          </div>
          <Link href={`/${locale}/projects`} className={cn('btn-outline group shrink-0', isAmharic && 'font-amharic')}>
            {t('view_all')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.slice(0, 6).map((project, i) => {
            const title = isAmharic ? (project.titleAm || project.title) : project.title
            const desc = isAmharic ? (project.descriptionAm || project.description) : project.description
            const cat = project.category as CategoryKey
            const catLabel = isAmharic ? categoryLabels[cat]?.am : categoryLabels[cat]?.en

            return (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn('group card-glass overflow-hidden', i === 0 && 'md:col-span-2 lg:col-span-1')}
              >
                <Link href={`/${locale}/projects/${project.slug.current}`}>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={getProjectImage(project)}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={cn('text-xs px-3 py-1 bg-gold-500 text-forest-900 font-semibold tracking-wider', isAmharic && 'font-amharic text-[11px]')}>
                        {catLabel}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className={cn('font-display text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-gold-500 transition-colors line-clamp-1', isAmharic && 'font-amharic text-lg')}>
                      {title}
                    </h3>
                    {desc && (
                      <p className={cn('text-sm text-[var(--text-secondary)] line-clamp-2', isAmharic && 'font-amharic text-base')}>
                        {desc}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2 text-gold-500 text-sm font-semibold">
                      <span className={isAmharic ? 'font-amharic' : ''}>{t('view_project')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
