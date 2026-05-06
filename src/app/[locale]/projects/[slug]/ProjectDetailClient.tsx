'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowLeft, Images, Play, Box, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, categoryLabels, categoryImages } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/client'

type Tab = 'gallery' | 'video' | '3d'

export function ProjectDetailClient({ project }: { project: any }) {
  const t = useTranslations('projects')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const [activeTab, setActiveTab] = useState<Tab>('gallery')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const title = isAmharic ? (project.titleAm || project.title) : project.title
  const description = isAmharic ? (project.descriptionAm || project.description) : project.description
  const catLabel = isAmharic ? categoryLabels[project.category]?.am : categoryLabels[project.category]?.en

  const galleryImages = project.images?.length > 0
    ? project.images.map((img: any) => urlFor(img).width(1200).url())
    : categoryImages[project.category] || categoryImages.living_room

  const coverImageUrl = project.coverImage
    ? urlFor(project.coverImage).width(1200).url()
    : galleryImages[0]

  const allImages = [coverImageUrl, ...galleryImages.filter((g: string) => g !== coverImageUrl)]

  const tabs: { id: Tab; label: string; icon: any; show: boolean }[] = [
    { id: 'gallery', label: t('gallery'), icon: Images, show: true },
    { id: 'video', label: t('video'), icon: Play, show: !!project.videoUrl },
    { id: '3d', label: t('model_3d'), icon: Box, show: !!project.model3dUrl },
  ]

  return (
    <div className="pt-24 pb-20 bg-[var(--bg-primary)] min-h-screen">
      <div className="container-site">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={`/${locale}/projects`}
            className={cn(
              'inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-gold-500 transition-colors',
              isAmharic && 'font-amharic'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back')}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-[var(--border)]">
              {tabs.filter((tab) => tab.show).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-3 text-sm font-body transition-all border-b-2 -mb-px',
                    isAmharic && 'font-amharic',
                    activeTab === tab.id
                      ? 'border-gold-500 text-gold-500'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Gallery tab */}
            {activeTab === 'gallery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Main image */}
                <div
                  className="relative h-80 sm:h-96 lg:h-[500px] mb-3 overflow-hidden cursor-zoom-in"
                  onClick={() => setLightboxIndex(0)}
                >
                  <Image src={allImages[0]} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
                </div>

                {/* Thumbnail strip */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {allImages.map((img: string, i: number) => (
                      <div
                        key={i}
                        className="relative h-16 sm:h-20 overflow-hidden cursor-pointer border-2 border-transparent hover:border-gold-500 transition-colors"
                        onClick={() => setLightboxIndex(i)}
                      >
                        <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Video tab */}
            {activeTab === 'video' && project.videoUrl && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="aspect-video w-full">
                  <iframe
                    src={project.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </motion.div>
            )}

            {/* 3D Model tab */}
            {activeTab === '3d' && project.model3dUrl && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="aspect-video w-full">
                  <iframe
                    src={project.model3dUrl}
                    className="w-full h-full border border-[var(--border)]"
                    allowFullScreen
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                  />
                </div>
                <p className={cn('text-xs text-[var(--text-muted)] mt-2 text-center', isAmharic && 'font-amharic')}>
                  {isAmharic ? 'ሞዴሉን ለማዞር ጠቅ ያድርጉ' : 'Click and drag to rotate the 3D model'}
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Category */}
              <span className={cn(
                'inline-block text-[10px] px-3 py-1 bg-gold-500 text-forest-900 font-bold tracking-widest uppercase mb-4',
                isAmharic && 'font-amharic text-xs tracking-normal'
              )}>
                {catLabel}
              </span>

              {/* Title */}
              <h1 className={cn(
                'section-title text-3xl sm:text-4xl text-[var(--text-primary)] mb-4',
                isAmharic && 'font-amharic'
              )}>
                {title}
              </h1>

              <hr className="gold-divider w-16 mb-6" />

              {/* Description */}
              {description && (
                <p className={cn(
                  'text-[var(--text-secondary)] leading-relaxed mb-8',
                  isAmharic && 'font-amharic text-lg'
                )}>
                  {description}
                </p>
              )}

              {/* Details */}
              <div className="space-y-3 mb-8">
                {project.createdAt && (
                  <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                    <span className={cn('text-sm text-[var(--text-muted)]', isAmharic && 'font-amharic')}>
                      {isAmharic ? 'ቀን' : 'Date'}
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {project.tags?.length > 0 && (
                  <div className="py-3">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="text-xs px-2.5 py-1 border border-[var(--border)] text-[var(--text-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/contact`}
                className={cn('btn-gold w-full justify-center', isAmharic && 'font-amharic')}
              >
                {isAmharic ? 'ተመሳሳይ ትዕዛዝ ያቅርቡ' : 'Order Similar Piece'}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2">
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length) }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl max-h-[80vh] mx-8" onClick={(e) => e.stopPropagation()}>
            <Image src={allImages[lightboxIndex]} alt={title} width={1200} height={800} className="object-contain w-full h-full max-h-[80vh]" />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % allImages.length) }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
