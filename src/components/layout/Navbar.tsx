'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react'
import type { Locale } from '@/i18n/request'
import { locales } from '@/i18n/request'
import { cn } from '@/lib/utils'

interface NavbarProps {
  locale: Locale
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setLangOpen(false)
  }

  const isAmharic = locale === 'am'

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-[var(--shadow)]'
          : 'bg-transparent'
      )}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--gold)] shadow-gold transition-all duration-300 group-hover:shadow-gold-lg">
              <Image
                src="/images/logo.png"
                alt="Golden Zaf Logo"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to text logo if image not found
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-gold-500 font-display font-bold text-lg">
                GZ
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-semibold text-lg leading-none text-gold-gradient">
                Golden Zaf
              </p>
              <p className={cn(
                'text-xs tracking-widest uppercase text-[var(--text-muted)]',
                isAmharic && 'font-amharic text-[10px] tracking-normal'
              )}>
                {isAmharic ? 'ወርቃማ ዛፍ' : 'Furniture & Interior'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative font-body text-sm tracking-wide transition-colors duration-200',
                    isAmharic && 'font-amharic text-base',
                    isActive
                      ? 'text-gold-500'
                      : 'text-[var(--text-secondary)] hover:text-gold-500',
                    'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold-500',
                    'after:transition-all after:duration-300',
                    isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-sm border border-[var(--border)] text-[var(--text-secondary)] hover:text-gold-500 hover:border-gold-500 transition-all duration-200 text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="font-semibold uppercase">{locale}</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform', langOpen && 'rotate-180')} />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-[var(--bg-card)] border border-[var(--border)] shadow-lg rounded-sm overflow-hidden min-w-[100px]">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className={cn(
                        'w-full flex items-center gap-2 px-4 py-2.5 text-sm font-body hover:bg-gold-500/10 transition-colors',
                        l === locale ? 'text-gold-500 font-semibold' : 'text-[var(--text-secondary)]'
                      )}
                    >
                      <span className="text-lg">{l === 'am' ? '🇪🇹' : '🇬🇧'}</span>
                      <span>{l === 'am' ? 'አማርኛ' : 'English'}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-sm border border-[var(--border)] text-[var(--text-secondary)] hover:text-gold-500 hover:border-gold-500 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-sm border border-[var(--border)] text-[var(--text-secondary)] hover:text-gold-500 transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 bg-[var(--bg-primary)]/98 backdrop-blur-md border-t border-[var(--border)]',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-site py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'font-body text-base py-2 border-b border-[var(--border)] transition-colors',
                isAmharic && 'font-amharic',
                pathname === link.href
                  ? 'text-gold-500'
                  : 'text-[var(--text-secondary)] hover:text-gold-500'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
