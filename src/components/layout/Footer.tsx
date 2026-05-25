'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Heart,
  Send,
  MessageCircle,
  Globe,
} from 'lucide-react'
import { CATEGORY_KEYS, cn } from '@/lib/utils'
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_TEL_LINK,
  CONTACT_PHONE_2_DISPLAY,
  CONTACT_TEL_2_LINK,
  CONTACT_EMAIL,
  CONTACT_WEBSITE_DISPLAY,
  TELEGRAM_LINK,
  SOCIAL_LINKS,
  getWhatsAppLink,
} from '@/lib/contact'

// Inline SVG icons for brands lucide-react doesn't ship.
function TikTokIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      fill='currentColor'
      aria-hidden
    >
      <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.79z' />
    </svg>
  )
}

function ThreadsIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      fill='currentColor'
      aria-hidden
    >
      <path d='M17.16 11.25c-.08-.04-.17-.08-.25-.11-.15-2.7-1.62-4.25-4.07-4.27h-.04c-1.46 0-2.68.62-3.43 1.76l1.34.92c.56-.85 1.44-1.04 2.09-1.04h.03c.81.01 1.42.24 1.81.7.29.32.48.77.57 1.34-.71-.12-1.48-.16-2.3-.11-2.31.13-3.79 1.49-3.69 3.37.05.96.53 1.79 1.34 2.32.69.45 1.57.66 2.49.61 1.21-.07 2.16-.53 2.83-1.37.5-.63.83-1.45.97-2.46.59.36 1.03.83 1.27 1.4.41.96.43 2.55-.85 3.85-1.13 1.13-2.49 1.62-4.53 1.64-2.27-.02-3.99-.74-5.11-2.16-1.05-1.32-1.59-3.23-1.61-5.69.02-2.46.56-4.37 1.61-5.69 1.12-1.41 2.84-2.14 5.11-2.16 2.29.02 4.04.75 5.21 2.18.57.71 1.01 1.6 1.29 2.64l1.66-.45c-.34-1.27-.88-2.36-1.61-3.27C18.97 1.32 16.78.41 14 .39h-.01c-2.78.02-4.95.94-6.45 2.71-1.34 1.6-2.03 3.83-2.05 6.61v.02c.02 2.78.71 5.01 2.05 6.61 1.5 1.78 3.67 2.69 6.45 2.71h.01c2.47-.02 4.21-.66 5.65-2.1 1.88-1.88 1.83-4.24 1.21-5.7-.45-1.04-1.31-1.89-2.49-2.43zm-4.21 3.65c-1.02.06-2.08-.4-2.13-1.39-.04-.74.52-1.56 2.19-1.66.19-.01.38-.02.57-.02.6 0 1.16.06 1.67.17-.19 2.37-1.31 2.85-2.3 2.9z' />
    </svg>
  )
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      fill='currentColor'
      aria-hidden
    >
      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z' />
    </svg>
  )
}

function TelegramIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      fill='currentColor'
      aria-hidden
    >
      <path d='M9.04 15.46l-.39 3.7c.56 0 .8-.24 1.1-.53l2.64-2.49 5.47 4c1 .56 1.72.27 1.97-.93l3.57-16.74c.33-1.5-.55-2.1-1.5-1.74L1.45 9.2C-.01 9.78 0 10.6 1.18 10.97l5.07 1.58 11.78-7.42c.55-.36 1.06-.16.65.2L9.04 15.46z' />
    </svg>
  )
}

const SOCIALS = [
  { name: 'WhatsApp', href: SOCIAL_LINKS.whatsapp, Icon: WhatsAppIcon },
  { name: 'Telegram', href: SOCIAL_LINKS.telegram, Icon: TelegramIcon },
  { name: 'Threads', href: SOCIAL_LINKS.threads, Icon: ThreadsIcon },
  { name: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: Instagram },
  { name: 'TikTok', href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
  { name: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: Facebook },
] as const

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tCategories = useTranslations('categories')
  const tContact = useTranslations('contact')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const worksLabel = isAmharic ? 'ስራዎቻችን' : 'Our Works'
  const whatsappLink = getWhatsAppLink(
    isAmharic
      ? 'ሰላም! ስለ Golden Zaf ስራዎች ጥያቄ አለኝ።'
      : 'Hello! I have an inquiry about Golden Zaf and your work.',
  )

  const categories = CATEGORY_KEYS
    .filter((key) => key !== 'other')
    .map((key) => ({ key, label: tCategories(key) }))

  return (
    <footer className='relative bg-[var(--forest)] text-[var(--cream)] overflow-hidden'>
      <div className='h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent' />

      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A14A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className='container-site relative py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* Brand */}
          <div className='lg:col-span-1'>
            <div className='mb-4'>
              <h3 className='font-display text-2xl font-semibold text-gold-gradient'>
                Golden Zaf
              </h3>
              <p className='text-xs tracking-widest uppercase text-gold-500/70 mt-1'>
                Furniture and Interior
              </p>
            </div>
            <p
              className={cn(
                'text-sm text-[var(--cream)]/60 leading-relaxed mb-6',
                isAmharic && 'font-amharic text-base',
              )}
            >
              {t('tagline')}
            </p>

            <div className='flex flex-wrap gap-3'>
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={name}
                  title={name}
                  className='w-9 h-9 flex items-center justify-center border border-gold-500/30 text-gold-500/70 hover:text-gold-500 hover:border-gold-500 transition-all duration-300 hover:shadow-gold rounded-sm'
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={cn(
                'font-display text-lg text-gold-500 mb-5 font-semibold',
                isAmharic && 'font-amharic',
              )}
            >
              {t('quick_links')}
            </h4>
            <ul className='space-y-3'>
              {[
                { href: `/${locale}`, label: tNav('home') },
                { href: `/${locale}/projects`, label: worksLabel },
                { href: `/${locale}/about`, label: tNav('about') },
                { href: `/${locale}/contact`, label: tNav('contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 group',
                      isAmharic && 'font-amharic text-base',
                    )}
                  >
                    <span className='w-4 h-px bg-gold-500/30 group-hover:w-6 transition-all duration-300' />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              className={cn(
                'font-display text-lg text-gold-500 mb-5 font-semibold',
                isAmharic && 'font-amharic',
              )}
            >
              {t('categories')}
            </h4>
            <ul className='space-y-3'>
              {categories.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href={`/${locale}/projects?category=${cat.key}`}
                    className={cn(
                      'text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 group',
                      isAmharic && 'font-amharic text-base',
                    )}
                  >
                    <span className='w-4 h-px bg-gold-500/30 group-hover:w-6 transition-all duration-300' />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={cn(
                'font-display text-lg text-gold-500 mb-5 font-semibold',
                isAmharic && 'font-amharic',
              )}
            >
              {tContact('title')}
            </h4>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3 text-sm text-[var(--cream)]/60'>
                <MapPin className='w-4 h-4 text-gold-500 mt-0.5 shrink-0' />
                <span className={isAmharic ? 'font-amharic' : ''}>
                  {isAmharic
                    ? 'ቤቴል አፕል ፕላዛ + መሳለሚያ — አዲስ አበባ'
                    : 'Betel Apple Plaza + Mesalemiya — Addis Ababa'}
                </span>
              </li>
              <li>
                <a
                  href={CONTACT_TEL_LINK}
                  className='flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group'
                >
                  <Phone className='w-4 h-4 text-gold-500 shrink-0' />
                  <span>{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_TEL_2_LINK}
                  className='flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group'
                >
                  <Phone className='w-4 h-4 text-gold-500 shrink-0' />
                  <span>{CONTACT_PHONE_2_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group'
                >
                  <MessageCircle className='w-4 h-4 text-gold-500 shrink-0' />
                  <span>
                    {isAmharic ? 'በ WhatsApp ይፃፉልን' : 'Chat on WhatsApp'}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_LINK}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group'
                >
                  <Send className='w-4 h-4 text-gold-500 shrink-0' />
                  <span>{isAmharic ? 'በ Telegram ያግኙን' : 'Telegram'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group'
                >
                  <Mail className='w-4 h-4 text-gold-500 shrink-0' />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href='https://www.goldenzaf.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group'
                >
                  <Globe className='w-4 h-4 text-gold-500 shrink-0' />
                  <span>{CONTACT_WEBSITE_DISPLAY}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-[var(--cream)]/40 flex items-center gap-1'>
            <span className={isAmharic ? 'font-amharic' : ''}>
              {isAmharic ? 'የተሰራው በ' : 'Designed & Developed by'}{' '}
              <a
                href='tel:+251919313711'
                className='text-gold-500/90 hover:text-gold-500 underline-offset-4 hover:underline transition-colors font-semibold'
              >
                Tsinat (+251919313711)
              </a>
            </span>
            <span className='mx-2 text-[var(--cream)]/25'>·</span>
            {t('made_with')}{' '}
            <Heart className='w-3 h-3 text-gold-500 fill-current' />
          </p>
          <p
            className={cn(
              'text-xs text-[var(--cream)]/40',
              isAmharic && 'font-amharic text-sm',
            )}
          >
            © {new Date().getFullYear()} Golden Zaf Furniture and Interior.{' '}
            {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
