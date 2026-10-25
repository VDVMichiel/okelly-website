import './globals.css'
import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import Navbar from '@/components/Navbar'

const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' })

export const SITE_URL = 'https://okelly-schaakclub.be'
const SITE_NAME = "Schaakclub O'Kelly"
const DEFAULT_TITLE = "Schaakclub O'Kelly | Schaken in Hasselt & Kermt sinds 1947"
const DEFAULT_DESCRIPTION =
  "Koninklijke Hasseltse Schaakclub O'Kelly: elke vrijdag clubavond in Kermt (Hasselt). " +
  'Schaken leren en spelen in Limburg voor beginners en gevorderden. Jeugd, interclub en ' +
  'toernooien met meer dan 70 leden. Iedereen welkom!'

// Lets Google match the site to its entity (local club), shown in the
// knowledge panel and local results.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: SITE_NAME,
  alternateName: "Koninklijke Hasseltse Schaakclub O'Kelly",
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  email: 'schaakclubokelly@gmail.com',
  foundingDate: '1947-02-15',
  sport: 'Chess',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Diestersteenweg 204',
    addressLocality: 'Kermt (Hasselt)',
    postalCode: '3510',
    addressCountry: 'BE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.9473393,
    longitude: 5.2551022,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Friday',
    opens: '19:00',
    closes: '24:00',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Schaakclub O'Kelly",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'schaakclub hasselt',
    'schaken limburg',
    'schaken kermt',
    'schaken leren',
    'schaakclub o\'kelly',
    'jeugdschaak limburg',
    'interclub schaken',
    'schaken voor beginners',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={lora.variable}>
      <body className="min-h-screen bg-[#F8F4EB]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
