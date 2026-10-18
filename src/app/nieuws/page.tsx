import Link from 'next/link';
import { client, postHref } from '@/lib/sanity';

async function getPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt
      }
    `);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Nieuws() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto w-5/6">
        <h1 className="mb-8 text-4xl font-bold text-[#1e293b]">Nieuws</h1>
        
        {posts.length === 0 ? (
          <div className="rounded-lg bg-white p-8 shadow-md">
            <p className="text-gray-600">
              Nog geen nieuwsberichten. Bezoek het Sanity Studio om berichten toe te voegen.
            </p>
            <Link 
              href="/studio" 
              className="mt-4 inline-block text-[#c4a77d] hover:underline"
            >
              Naar Studio →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link 
                key={post._id} 
                href={postHref(post.slug.current)}
                className="group block"
              >
                <div className="h-full rounded-lg bg-white p-6 shadow-md transition group-hover:shadow-xl">
                  <p className="mb-2 text-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('nl-BE')}
                  </p>
                  <h2 className="mb-3 text-xl font-bold text-[#1e293b] group-hover:text-[#c4a77d]">
                    {post.title}
                  </h2>
                  <p className="text-gray-600">
                    {post.excerpt || 'Klik om het volledige artikel te lezen...'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}