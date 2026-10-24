import type { Metadata, Viewport } from 'next'
import './globals.css'
import AppShell from '@/components/AppShell'

const siteUrl = 'https://revoluttime.vercel.app'
const title = 'RevolutTIME - экосистема здоровья, путешествий и заработка'
const description = 'Экосистема здоровья, путешествий и заработка'
const ogImagePath = '/img/ogImg.jpg'
const ogImageUrl = `${siteUrl}${ogImagePath}`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d4af37',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'RevolutTIME',
  keywords: ['RevolutTIME', 'investments', 'health', 'travel', 'referral program'],
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    siteName: 'RevolutTIME',
    locale: 'ru_RU',
    localeAlternate: ['en_US'],
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'RevolutTIME - экосистема здоровья, путешествий и заработка',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: ogImagePath,
        alt: 'RevolutTIME - экосистема здоровья, путешествий и заработка',
      },
    ],
    site: '@RevolutTIME',
    creator: '@RevolutTIME',
  },
  category: 'business',
  other: {
    'og:image:secure_url': ogImageUrl,
    'og:image:type': 'image/jpeg',
    'og:image:alt': 'RevolutTIME - экосистема здоровья, путешествий и заработка',
    'twitter:image:alt': 'RevolutTIME - экосистема здоровья, путешествий и заработка',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
