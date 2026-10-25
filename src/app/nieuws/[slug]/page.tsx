import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client, urlFor, slugifySlug } from '@/lib/sanity';
import PostBody from '@/components/PostBody';
import Footer from '@/components/Footer';

const SITE_URL = 'https://okelly-schaakclub.be';

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
      publishedAt,
      _updatedAt
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Nieuwsbericht niet gevonden',
      robots: { index: false },
    };
  }

  const description = post.excerpt || 'Nieuwsbericht van Schaakclub O\'Kelly';
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : undefined;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/nieuws/${slugifySlug(slug)}/`,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 600, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function NieuwsBericht({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const canonicalPath = `/nieuws/${slugifySlug(slug)}/`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : undefined;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || undefined,
        datePublished: post.publishedAt || undefined,
        dateModified: post._updatedAt || undefined,
        ...(imageUrl ? { image: [`${SITE_URL}${imageUrl}`] } : {}),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}${canonicalPath}`,
        },
        author: {
          '@type': 'Organization',
          name: "Schaakclub O'Kelly",
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: "Schaakclub O'Kelly",
          url: SITE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.title,
            item: `${SITE_URL}${canonicalPath}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <div className="bg-[#F8F4EB] pb-14 pt-20 md:pb-20 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto w-5/6 max-w-6xl">
        <Link
          href="/#nieuws"
          className="mb-8 inline-block rounded-full bg-[#A8312D] px-6 py-2 font-bold text-white transition hover:bg-[#8f2825]"
        >
          ← Terug naar Nieuws
        </Link>

        <article className="max-w-3xl mx-auto">
          {post.publishedAt && (
            <p className="text-[#5E0000]/60 mb-4">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('nl-BE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </p>
          )}

          <h1 className="font-serif text-3xl font-bold text-[#5E0000] mb-8 md:text-5xl">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="relative h-52 w-full mb-10 rounded-lg overflow-hidden md:h-96 md:mb-12">
              <img
                src={imageUrl}
                alt={post.title}
                width={1200}
                height={600}
                decoding="async"
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
              href="/#nieuws"
              className="inline-block rounded-full bg-[#A8312D] px-8 py-3 font-bold text-white transition hover:bg-[#8f2825]"
            >
              ← Terug naar Nieuws
            </Link>
          </div>
        </article>
      </div>
    </div>

    <Footer />
    </>
  );
}
