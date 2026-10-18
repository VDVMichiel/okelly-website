import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, urlFor, slugifySlug } from '@/lib/sanity';
import PostBody from '@/components/PostBody';

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    // Fast path: exact match on the stored slug.
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      body,
      excerpt,
      publishedAt
    }`;
    const post = await client.fetch(query, { slug });
    if (post) return post;

    // Slugs typed manually in the Studio may contain spaces/capitals
    // ("Clubkampioenschap ronde 1"), which break URLs. The site links to a
    // slugified version, so match on the slugified form as a fallback.
    const candidates: { _id: string; slug: string }[] = await client.fetch(
      `*[_type == "post" && slug.current != null]{ _id, "slug": slug.current }`
    );
    const match = candidates.find((c) => slugifySlug(c.slug) === slug.toLowerCase());
    if (!match) return null;
    return await client.fetch(query, { slug: match.slug });
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Re-render published posts periodically so edits in the Studio show up
// without requiring a new deployment.
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts: { slug: string }[] = await client.fetch(
      `*[_type == "post" && slug.current != null]{ "slug": slug.current }`
    );
    return posts.map((post) => ({ slug: slugifySlug(post.slug) }));
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Nieuwsbericht niet gevonden — Schaakclub O\'Kelly' };
  }

  return {
    title: `${post.title} — Schaakclub O'Kelly`,
    description: post.excerpt || 'Nieuwsbericht van Schaakclub O\'Kelly',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Nieuwsbericht van Schaakclub O\'Kelly',
      type: 'article',
      ...(post.mainImage
        ? { images: [{ url: urlFor(post.mainImage).width(1200).height(600).url() }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      ...(post.mainImage
        ? { images: [urlFor(post.mainImage).width(1200).height(600).url()] }
        : {}),
    },
  };
}

export default async function NieuwsBericht({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8F4EB] py-20">
      <div className="mx-auto w-5/6">
        <Link
          href="/nieuws/"
          className="text-[#A8312D] font-bold underline mb-8 inline-block"
        >
          ← Terug naar Nieuws
        </Link>

        <article className="max-w-3xl mx-auto">
          <p className="text-[#5E0000]/60 mb-4">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('nl-BE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : ''}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-[#5E0000] mb-8">{post.title}</h1>

          {post.mainImage && (
            <div className="relative h-64 md:h-96 w-full mb-12 rounded-lg overflow-hidden">
              <img
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {post.body ? (
            <PostBody body={post.body} />
          ) : post.excerpt ? (
            <p className="text-lg text-[#5E0000] leading-relaxed">{post.excerpt}</p>
          ) : null}

          <div className="mt-12 text-center">
            <Link
              href="/nieuws/"
              className="inline-block bg-[#A8312D] text-white px-8 py-3 rounded-full font-bold hover:opacity-90"
            >
              ← Terug naar Nieuws
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
