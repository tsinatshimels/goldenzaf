import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Noto_Serif_Ethiopic } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
})

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-serif-ethiopic',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenzaf.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Golden Zaf Furniture and Interior',
    template: '%s | Golden Zaf Furniture and Interior',
  },
  description:
    'Golden Zaf Furniture and Interior — premium furniture and interior design solutions for living rooms, bedrooms, offices, dining rooms, doors, and CNC craftwork.',
  keywords: [
    'Golden Zaf Furniture',
    'Golden Zaf Interior',
    'furniture',
    'interior design',
    'CNC',
    'doors',
    'office furniture',
    'living room furniture',
    'Ethiopia',
    'Addis Ababa',
  ],
  openGraph: {
    title: 'Golden Zaf Furniture and Interior',
    description: 'Premium furniture and interior design solutions',
    url: SITE_URL,
    siteName: 'Golden Zaf Furniture and Interior',
    type: 'website',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${cormorant.variable} ${jost.variable} ${notoSerifEthiopic.variable}`}>
        {children}
      </body>
    </html>
  )
}
