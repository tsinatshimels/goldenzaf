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
  return {
    title: {
      default: isAmharic
        ? 'ወርቃማ ዛፍ — የቤት ዕቃ እና የውስጥ ዲዛይን'
        : 'Golden Zaf Furniture & Interior',
      template: isAmharic ? '%s | ወርቃማ ዛፍ' : '%s | Golden Zaf Furniture',
    },
    description: isAmharic
      ? 'ምርጥ የቤት ዕቃ እና የውስጥ ዲዛይን — Golden Zaf Furniture'
      : 'Premium furniture and interior design solutions — Golden Zaf Furniture',
    alternates: { languages: { am: '/am', en: '/en' } },
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
              iconTheme: { primary: '#C9A84C', secondary: '#0f1c17' },
            },
          }}
        />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
