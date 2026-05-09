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
    'Golden Zaf Furniture and Interior',
    'furniture Addis Ababa',
    'furniture Ethiopia',
    'custom furniture Addis Ababa',
    'interior design Addis Ababa',
    'interior design Ethiopia',
    'living room furniture Addis Ababa',
    'bedroom furniture Addis Ababa',
    'office furniture Addis Ababa',
    'kitchen cabinets Addis Ababa',
    'dining room furniture Addis Ababa',
    'doors Addis Ababa',
    'wooden doors Ethiopia',
    'CNC furniture Ethiopia',
    'CNC design Addis Ababa',
    'bespoke furniture Ethiopia',
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
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32.png',
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
