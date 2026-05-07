'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Heart, Send, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_TEL_LINK,
  TELEGRAM_LINK,
  getWhatsAppLink,
} from '@/lib/contact'

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

  const categories = [
    { key: 'living_room', label: tCategories('living_room') },
    { key: 'bedroom', label: tCategories('bedroom') },
    { key: 'office', label: tCategories('office') },
    { key: 'dining_kitchen', label: tCategories('dining_kitchen') },
    { key: 'cnc', label: tCategories('cnc') },
    { key: 'doors', label: tCategories('doors') },
  ]

  return (
    <footer className="relative bg-[var(--forest)] text-[var(--cream)] overflow-hidden">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container-site relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="font-display text-2xl font-semibold text-gold-gradient">
                Golden Zaf
              </h3>
              <p className={cn(
                'text-xs tracking-widest uppercase text-gold-500/70 mt-1',
                isAmharic && 'font-amharic tracking-normal text-sm'
              )}>
                {isAmharic ? 'ወርቃማ ዛፍ' : 'Furniture & Interior'}
              </p>
            </div>
            <p className={cn(
              'text-sm text-[var(--cream)]/60 leading-relaxed mb-6',
              isAmharic && 'font-amharic text-base'
            )}>
              {t('tagline')}
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-gold-500/30 text-gold-500/60 hover:text-gold-500 hover:border-gold-500 transition-all duration-300 hover:shadow-gold rounded-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={cn(
              'font-display text-lg text-gold-500 mb-5 font-semibold',
              isAmharic && 'font-amharic'
            )}>
              {t('quick_links')}
            </h4>
            <ul className="space-y-3">
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
                      isAmharic && 'font-amharic text-base'
                    )}
                  >
                    <span className="w-4 h-px bg-gold-500/30 group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={cn(
              'font-display text-lg text-gold-500 mb-5 font-semibold',
              isAmharic && 'font-amharic'
            )}>
              {t('categories')}
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href={`/${locale}/projects?category=${cat.key}`}
                    className={cn(
                      'text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 group',
                      isAmharic && 'font-amharic text-base'
                    )}
                  >
                    <span className="w-4 h-px bg-gold-500/30 group-hover:w-6 transition-all duration-300" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={cn(
              'font-display text-lg text-gold-500 mb-5 font-semibold',
              isAmharic && 'font-amharic'
            )}>
              {tContact('title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[var(--cream)]/60">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span className={isAmharic ? 'font-amharic' : ''}>
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li>
                <a href={TELEGRAM_LINK} className="flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group">
                  <Send className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group">
                  <MessageCircle className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT_TEL_LINK} className="flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group">
                  <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@goldenzaf.com" className="flex items-center gap-3 text-sm text-[var(--cream)]/60 hover:text-gold-500 transition-colors group">
                  <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>info@goldenzaf.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={cn(
            'text-xs text-[var(--cream)]/40',
            isAmharic && 'font-amharic text-sm'
          )}>
            © {new Date().getFullYear()} Golden Zaf Furniture. {t('rights')}.
          </p>
          <p className="text-xs text-[var(--cream)]/40 flex items-center gap-1">
            {t('made_with')} <Heart className="w-3 h-3 text-gold-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  )
}
