'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  excerpt?: string;
  publishedAt: string;
};

export default function NieuwsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            mainImage,
            excerpt,
            publishedAt
          }
        `);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto w-5/6">
        <div className="flex items-center justify-center py-20">
          <p className="text-[#5E0000]">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-5/6">
      <h2 className="mb-8 text-4xl font-bold text-[#A8312D]">Nieuws</h2>
      <p className="mb-8 text-lg text-[#5E0000]">
        Blijf op de hoogte van het laatste nieuws van Schaakclub O&apos;Kelly.
      </p>

      {posts.length === 0 ? (
        <div className="rounded-lg bg-white p-8 shadow-md">
          <p className="text-[#5E0000]">
            Nog geen nieuwsberichten. Bezoek het Sanity Studio om berichten toe te voegen.
          </p>
          <Link 
            href="/studio" 
            className="mt-4 inline-block text-[#A8312D] font-bold underline"
          >
            Naar Studio →
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/nieuws/${post.slug.current}/`}
              className="group block w-full text-left cursor-pointer"
            >
              <div className="h-full rounded-lg bg-white shadow-md overflow-hidden transition group-hover:shadow-xl">
                {post.mainImage && (
                  <div className="relative h-48 w-full bg-gray-100">
                    <img
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-[#5E0000]/60 mb-2">
                    {new Date(post.publishedAt).toLocaleDateString('nl-BE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <h3 className="text-xl font-bold text-[#5E0000] group-hover:text-[#A8312D] mb-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[#5E0000]/80 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
