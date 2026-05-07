'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'your_formspree_id'

/**
 * Two showroom / workshop locations.
 * Replace name + address + mapsQuery with the real ones the client provides.
 * - mapsQuery is what gets URL-encoded and dropped into a Google Maps `?q=` search.
 *   You can paste either an address ("Bole, Addis Ababa") or coordinates ("9.0211,38.7575").
 */
const LOCATIONS = [
  {
    label: 'Showroom',
    labelAm: 'ሾውሩም',
    name: 'Golden Zaf Showroom',
    nameAm: 'Golden Zaf ሾውሩም',
    address: 'Addis Ababa, Ethiopia',
    addressAm: 'አዲስ አበባ, ኢትዮጵያ',
    mapsQuery: 'Bole, Addis Ababa, Ethiopia',
  },
  {
    label: 'Workshop',
    labelAm: 'ወርክሾፕ',
    name: 'Golden Zaf Workshop',
    nameAm: 'Golden Zaf ወርክሾፕ',
    address: 'Addis Ababa, Ethiopia',
    addressAm: 'አዲስ አበባ, ኢትዮጵያ',
    mapsQuery: 'CMC, Addis Ababa, Ethiopia',
  },
] as const

/** Combined map URL — searches for both locations so Google Maps drops two pins. */
const COMBINED_MAP_QUERY = LOCATIONS.map((l) => l.mapsQuery).join(' / ')
const COMBINED_MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  COMBINED_MAP_QUERY,
)}&output=embed`
const COMBINED_MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMBINED_MAP_QUERY,
)}`

export default function ContactClient() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
        toast.success(t('success'))
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        toast.error(t('error'))
      }
    } catch {
      toast.error(t('error'))
    } finally {
      setLoading(false)
    }
  }

  const inputClass = cn(
    'w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-gold-500 transition-colors duration-200 text-sm font-body',
    isAmharic && 'font-amharic text-base',
  )

  const labelClass = cn(
    'block text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)] mb-2',
    isAmharic && 'font-amharic text-sm tracking-normal',
  )

  return (
    <div className="pt-24 pb-20 bg-[var(--bg-primary)] min-h-screen">
      {/* Page header */}
      <div className="container-site mb-14">
        <div className="text-center">
          <p
            className={cn(
              'text-xs tracking-[0.4em] uppercase text-gold-500 mb-3',
              isAmharic && 'font-amharic tracking-widest text-sm',
            )}
          >
            {isAmharic ? 'አድራሻ' : 'Reach Us'}
          </p>
          <h1
            className={cn(
              'section-title text-5xl sm:text-6xl text-[var(--text-primary)] mb-4',
              isAmharic && 'font-amharic',
            )}
          >
            {t('title')}
          </h1>
          <hr className="gold-divider w-24 mx-auto mb-4" />
          <p
            className={cn(
              'text-[var(--text-secondary)]',
              isAmharic && 'font-amharic text-lg',
            )}
          >
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="container-site" ref={ref}>
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {/* Quick info cards (excluding location — that goes in the wide map below) */}
            {[
              {
                icon: Phone,
                title: t('phone_label'),
                content: '+251 XXX XXX XXX',
                link: 'tel:+251',
              },
              {
                icon: Mail,
                title: t('email_label'),
                content: 'info@goldenzaf.com',
                link: 'mailto:info@goldenzaf.com',
              },
              {
                icon: Clock,
                title: t('hours_title'),
                content: t('hours'),
                link: null,
              },
            ].map(({ icon: Icon, title, content, link }) => (
              <div key={title} className="card-glass p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 border border-gold-500/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <p
                    className={cn(
                      'text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)] mb-1',
                      isAmharic && 'font-amharic tracking-normal',
                    )}
                  >
                    {title}
                  </p>
                  {link ? (
                    <a
                      href={link}
                      target={link.startsWith('http') ? '_blank' : undefined}
                      className={cn(
                        'text-[var(--text-primary)] hover:text-gold-500 transition-colors text-sm',
                        isAmharic && 'font-amharic text-base',
                      )}
                    >
                      {content}
                    </a>
                  ) : (
                    <p
                      className={cn(
                        'text-[var(--text-primary)] text-sm',
                        isAmharic && 'font-amharic text-base',
                      )}
                    >
                      {content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/251"
              target="_blank"
              className="flex items-center gap-3 w-full btn-gold justify-center mt-4"
            >
              <MessageSquare className="w-4 h-4" />
              <span className={isAmharic ? 'font-amharic' : ''}>
                {isAmharic ? 'በWhatsApp ያግኙን' : 'WhatsApp Us'}
              </span>
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card-glass p-8">
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gold-500 mx-auto mb-4" />
                  <h3
                    className={cn(
                      'section-title text-2xl text-[var(--text-primary)] mb-2',
                      isAmharic && 'font-amharic',
                    )}
                  >
                    {isAmharic ? 'ተልኳል!' : 'Message Sent!'}
                  </h3>
                  <p
                    className={cn(
                      'text-[var(--text-secondary)]',
                      isAmharic && 'font-amharic text-lg',
                    )}
                  >
                    {t('success')}
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 btn-outline"
                  >
                    {isAmharic ? 'ሌላ ይላኩ' : 'Send Another'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{t('name')} *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={isAmharic ? 'ሙሉ ስምዎ' : 'Your full name'}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t('email')} *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{t('phone')}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+251 XXX XXX XXX"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t('subject')}</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder={isAmharic ? 'የጥያቄ ርዕስ' : 'Subject of inquiry'}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{t('message')} *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={
                        isAmharic ? 'መልዕክትዎን እዚህ ይፃፉ...' : 'Write your message here...'
                      }
                      className={cn(inputClass, 'resize-none')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      'btn-gold w-full justify-center gap-3',
                      isAmharic && 'font-amharic',
                    )}
                  >
                    <Send className="w-4 h-4" />
                    {loading ? t('sending') : t('send')}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Wide map with two pins ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14"
        >
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <p
                className={cn(
                  'text-xs tracking-[0.4em] uppercase text-gold-500 mb-2',
                  isAmharic && 'font-amharic tracking-widest text-sm',
                )}
              >
                {isAmharic ? 'አድራሻ' : 'Find Us'}
              </p>
              <h2
                className={cn(
                  'section-title text-3xl sm:text-4xl text-[var(--text-primary)]',
                  isAmharic && 'font-amharic',
                )}
              >
                {isAmharic ? 'ሁለት ቦታዎቻችን' : 'Our Two Locations'}
              </h2>
            </div>
            <a
              href={COMBINED_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 text-sm text-gold-500 hover:underline',
                isAmharic && 'font-amharic',
              )}
            >
              {isAmharic ? 'በGoogle ካርታ ይክፈቱ' : 'Open in Google Maps'}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Two location cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {LOCATIONS.map((loc, idx) => {
              const name = isAmharic ? loc.nameAm : loc.name
              const addr = isAmharic ? loc.addressAm : loc.address
              const tag = isAmharic ? loc.labelAm : loc.label
              const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapsQuery)}`
              return (
                <a
                  key={loc.name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass p-5 flex gap-4 hover:border-gold-500 transition-colors group"
                >
                  <div className="relative w-11 h-11 shrink-0 rounded-full border border-gold-500/40 flex items-center justify-center bg-gold-500/10">
                    <MapPin className="w-5 h-5 text-gold-500" />
                    <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-gold-500 text-forest-900 rounded-full w-5 h-5 flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        'text-[10px] font-semibold tracking-widest uppercase text-gold-500 mb-1',
                        isAmharic && 'font-amharic tracking-normal',
                      )}
                    >
                      {tag}
                    </p>
                    <p
                      className={cn(
                        'font-display font-semibold text-lg text-[var(--text-primary)] group-hover:text-gold-500 transition-colors leading-tight',
                        isAmharic && 'font-amharic',
                      )}
                    >
                      {name}
                    </p>
                    <p
                      className={cn(
                        'text-sm text-[var(--text-muted)] mt-0.5',
                        isAmharic && 'font-amharic',
                      )}
                    >
                      {addr}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Wide map embed — searches both locations so Google drops two pins */}
          <div className="relative w-full h-[440px] sm:h-[520px] bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
            <iframe
              title="Golden Zaf locations"
              src={COMBINED_MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Subtle gold corner accents */}
            <div className="pointer-events-none absolute top-3 left-3 w-10 h-10 border-l-2 border-t-2 border-gold-500/70" />
            <div className="pointer-events-none absolute top-3 right-3 w-10 h-10 border-r-2 border-t-2 border-gold-500/70" />
            <div className="pointer-events-none absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2 border-gold-500/70" />
            <div className="pointer-events-none absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2 border-gold-500/70" />
          </div>
          <p
            className={cn(
              'mt-3 text-xs text-[var(--text-muted)]',
              isAmharic && 'font-amharic',
            )}
          >
            {isAmharic
              ? 'ሁለቱም ቦታዎች በካርታ ላይ ይታያሉ። የተለየ አድራሻ ካለዎት እባክዎ ያጋሩን።'
              : 'Both locations are pinned on the map. Tap a card above to open it in Google Maps.'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
