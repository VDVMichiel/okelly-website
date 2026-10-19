import { NextStudio } from 'next-sanity/studio'
import { config } from '@/sanity/lib/config'

export const metadata = {
  title: "Schaakclub O'Kelly - Admin",
  description: 'Beheer je content',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioPage() {
  return <NextStudio config={config} />
}