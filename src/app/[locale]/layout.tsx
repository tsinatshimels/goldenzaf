import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingButtons } from '@/components/ui/FloatingButtons'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { Toaster } from 'react-hot-toast'
import { locales, type Locale } from '@/i18n/routing'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isAmharic = locale === 'am'
  // Brand name "Golden Zaf Furniture and Interior" is intentionally NOT translated.
  return {
    title: {
      default: 'Golden Zaf Furniture and Interior',
      template: '%s | Golden Zaf Furniture and Interior',
    },
    description: isAmharic
      ? 'Golden Zaf Furniture and Interior — ምርጥ የቤት ዕቃ እና የውስጥ ዲዛይን'
      : 'Golden Zaf Furniture and Interior — premium furniture and interior design.',
    alternates: {
      canonical: `/${locale}`,
      languages: { am: '/am', en: '/en' },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <ScrollProgressBar />
        <CursorGlow />
        <div className="flex flex-col min-h-screen">
          <Navbar locale={locale as Locale} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingButtons />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-strong)',
              fontFamily: 'var(--font-jost)',
              fontSize: '14px',
              borderRadius: '0',
            },
            success: {
              iconTheme: { primary: '#C9A14A', secondary: '#0D2820' },
            },
          }}
        />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
