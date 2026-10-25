import { client } from '@/lib/sanity';
import NewsGrid, { type NewsPost } from './NewsGrid';

// Server-side fetch so the news links and content are in the HTML Google
// crawls, instead of being added by JavaScript after page load. Cached for
// an hour so Studio edits show up without a redeploy.
async function getPosts(): Promise<NewsPost[]> {
  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt
      }`,
      {},
      { next: { revalidate: 3600 } }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function NieuwsSection() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="mb-2 font-serif text-3xl font-bold text-[#A8312D] md:text-4xl">
        Nieuws
      </h2>
      <p className="mb-4 text-base text-[#5E0000] md:text-lg">
        Blijf op de hoogte van het laatste nieuws van Schaakclub O&apos;Kelly.
      </p>

      <NewsGrid posts={posts} />
    </div>
  );
}
