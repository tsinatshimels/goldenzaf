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

export const metadata: Metadata = {
  title: {
    default: 'Golden Zaf Furniture & Interior',
    template: '%s | Golden Zaf Furniture',
  },
  description: 'Premium furniture and interior design solutions — ምርጥ የቤት ዕቃ እና የውስጥ ዲዛይን',
  keywords: ['furniture', 'interior design', 'Ethiopia', 'Addis Ababa', 'Golden Zaf'],
  openGraph: {
    title: 'Golden Zaf Furniture & Interior',
    description: 'Premium furniture and interior design solutions',
    url: 'https://goldenzaf.com',
    siteName: 'Golden Zaf Furniture',
    type: 'website',
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
