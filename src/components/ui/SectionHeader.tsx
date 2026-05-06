'use client'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { AnimatedSection } from './AnimatedSection'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  divider?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  divider = true,
}: SectionHeaderProps) {
  const locale = useLocale()
  const isAmharic = locale === 'am'

  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align]

  return (
    <AnimatedSection className={cn('flex flex-col', alignClass, className)}>
      {eyebrow && (
        <p className={cn(
          'text-xs tracking-[0.4em] uppercase text-gold-500 mb-3 font-body',
          isAmharic && 'font-amharic tracking-widest text-sm'
        )}>
          {eyebrow}
        </p>
      )}

      <h2 className={cn(
        'section-title text-4xl sm:text-5xl text-[var(--text-primary)]',
        isAmharic && 'font-amharic'
      )}>
        {title}
      </h2>

      {divider && (
        <hr className={cn(
          'gold-divider w-16 mt-4',
          align === 'center' && 'mx-auto'
        )} />
      )}

      {subtitle && (
        <p className={cn(
          'mt-4 text-[var(--text-secondary)] max-w-2xl',
          align === 'center' && 'mx-auto',
          isAmharic && 'font-amharic text-lg'
        )}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}
