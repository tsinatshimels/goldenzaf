'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', alt: 'Living Room' },
  { src: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&q=80', alt: 'Bedroom' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80', alt: 'Office' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80', alt: 'Dining' },
  { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&q=80', alt: 'CNC' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80', alt: 'Interior' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', alt: 'Doors' },
  { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80', alt: 'Design' },
]

export function GalleryStripSection() {
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-16 bg-[var(--bg-primary)]">
      <div className="container-site mb-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className={cn(
              'text-xs tracking-[0.4em] uppercase text-gold-500 mb-1',
              isAmharic && 'font-amharic tracking-widest text-sm'
            )}>
              {isAmharic ? 'ፎቶ ማዕከል' : 'Gallery'}
            </p>
            <h2 className={cn(
              'section-title text-3xl text-[var(--text-primary)]',
              isAmharic && 'font-amharic'
            )}>
              {isAmharic ? 'ቅርብ ስራዎቻችን' : 'Recent Work'}
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-gold-500 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span className={isAmharic ? 'font-amharic' : ''}>
              {isAmharic ? 'ተከተሉን' : 'Follow Us'}
            </span>
          </motion.a>
        </div>
      </div>

      {/* Full-width grid strip */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 px-1">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative aspect-square overflow-hidden cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Instagram className="w-6 h-6 text-white drop-shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
