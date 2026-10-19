import type { MetadataRoute } from 'next'
import { client, slugifySlug } from '@/lib/sanity'

const SITE_URL = 'https://okelly-schaakclub.be'

// Revalidate so new posts show up in the sitemap without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: { slug: { current: string }; publishedAt: string; updatedAt?: string }[] =
    await client
      .fetch(
        `*[_type == "post" && slug.current != null]{
          slug,
          publishedAt,
          "updatedAt": _updatedAt
        }`
      )
      .catch(() => [])

  const newsPages = posts.map((post) => ({
    url: `${SITE_URL}/nieuws/${slugifySlug(post.slug.current)}/`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...newsPages,
  ]
}
