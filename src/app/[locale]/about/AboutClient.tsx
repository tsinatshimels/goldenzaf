'use client'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Hammer, Lightbulb, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/client'

const VALUES = [
  { icon: Shield, key: 'quality', color: '#C9A84C' },
  { icon: Hammer, key: 'craftsmanship', color: '#C9A84C' },
  { icon: Lightbulb, key: 'innovation', color: '#C9A84C' },
  { icon: Heart, key: 'service', color: '#C9A84C' },
]

export function AboutClient({ team }: { team: any[] }) {
  const t = useTranslations('about')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="pt-24 bg-[var(--bg-primary)]">
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <Image
          src="/images/Interior.png"
          alt="About Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative container-site pb-12 z-10">
          <p className={cn('text-xs tracking-[0.4em] uppercase text-gold-400 mb-2', isAmharic && 'font-amharic tracking-widest text-sm')}>
            {isAmharic ? 'ስለ እኛ' : 'About Golden Zaf'}
          </p>
          <h1 className={cn('font-display text-4xl sm:text-5xl text-white font-semibold', isAmharic && 'font-amharic')}>
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20" ref={ref}>
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className={cn('text-xs tracking-[0.4em] uppercase text-gold-500 mb-3', isAmharic && 'font-amharic tracking-widest text-sm')}>
                {isAmharic ? 'ታሪካችን' : 'Our Story'}
              </p>
              <h2 className={cn('section-title text-4xl sm:text-5xl text-[var(--text-primary)] mb-6', isAmharic && 'font-amharic')}>
                {t('story_title')}
              </h2>
              <hr className="gold-divider w-16 mb-6" />
              <p className={cn('text-[var(--text-secondary)] leading-relaxed text-lg mb-6', isAmharic && 'font-amharic text-xl')}>
                {t('story')}
              </p>

              <h3 className={cn('section-title text-2xl text-[var(--text-primary)] mb-3', isAmharic && 'font-amharic')}>
                {t('mission_title')}
              </h3>
              <p className={cn('text-[var(--text-secondary)] leading-relaxed', isAmharic && 'font-amharic text-lg')}>
                {t('mission')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 overflow-hidden">
                <Image
                  src="/images/Living.png"
                  alt="Our Work"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gold frame accent */}
              <div className="absolute -bottom-4 -right-4 w-48 h-48 border-b-2 border-r-2 border-gold-500 -z-10" />
              <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-gold-500/50 -z-10" />

              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 bg-[var(--bg-card)] border border-[var(--border)] p-4 shadow-gold">
                <p className="font-display text-3xl font-bold text-gold-gradient">500+</p>
                <p className={cn('text-xs text-[var(--text-muted)]', isAmharic && 'font-amharic')}>
                  {t('stats_projects')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-site">
          <div className="text-center mb-14">
            <p className={cn('text-xs tracking-[0.4em] uppercase text-gold-500 mb-3', isAmharic && 'font-amharic tracking-widest text-sm')}>
              {isAmharic ? 'እምነቶቻችን' : 'What We Stand For'}
            </p>
            <h2 className={cn('section-title text-4xl sm:text-5xl text-[var(--text-primary)]', isAmharic && 'font-amharic')}>
              {t('values_title')}
            </h2>
            <hr className="gold-divider w-24 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass p-8 text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-5 border border-gold-500/30 flex items-center justify-center group-hover:border-gold-500 group-hover:bg-gold-500/10 transition-all duration-300">
                  <Icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className={cn('font-display text-xl font-semibold text-[var(--text-primary)] mb-3', isAmharic && 'font-amharic')}>
                  {t(key as any)}
                </h3>
                <p className={cn('text-sm text-[var(--text-secondary)] leading-relaxed', isAmharic && 'font-amharic')}>
                  {t(`${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20">
          <div className="container-site">
            <div className="text-center mb-14">
              <h2 className={cn('section-title text-4xl sm:text-5xl text-[var(--text-primary)]', isAmharic && 'font-amharic')}>
                {t('team_title')}
              </h2>
              <hr className="gold-divider w-24 mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-glass p-4 text-center group"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[var(--border)] group-hover:border-gold-500 transition-colors">
                    {member.photo
                      ? <Image src={urlFor(member.photo).width(200).url()} alt={member.name} fill className="object-cover" />
                      : <div className="w-full h-full bg-gold-500/20 flex items-center justify-center font-display text-2xl text-gold-500">{member.name[0]}</div>
                    }
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{member.name}</h3>
                  <p className={cn('text-sm text-gold-500', isAmharic && member.roleAm && 'font-amharic')}>
                    {isAmharic ? member.roleAm || member.role : member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
