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
  body?: any[];
  publishedAt: string;
};

export default function NieuwsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);

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

  const fetchAndShowPost = async (slug: string) => {
    setLoadingPost(true);
    try {
      const post = await client.fetch(`
        *[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          mainImage,
          body,
          excerpt,
          publishedAt
        }
      `, { slug });
      
      if (post) {
        setSelectedPost(post);
        window.history.pushState({}, '', `/nieuws/${slug}`);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleBack = () => {
    setSelectedPost(null);
    window.history.pushState({}, '', '/#nieuws');
    setTimeout(() => {
      const nieuwsSection = document.getElementById('nieuws');
      if (nieuwsSection) {
        nieuwsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === '#nieuws') {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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

  if (selectedPost) {
    return (
      <div className="mx-auto w-5/6">
        <button 
          onClick={handleBack}
          className="text-[#A8312D] font-bold underline mb-8 inline-block hover:font-bold"
        >
          ← Terug naar Nieuws
        </button>

        {loadingPost ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#5E0000]">Laden...</p>
          </div>
        ) : (
          <article className="max-w-3xl mx-auto">
            <p className="text-[#5E0000]/60 mb-4">
              {new Date(selectedPost.publishedAt).toLocaleDateString('nl-BE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#5E0000] mb-8">
              {selectedPost.title}
            </h1>

            {selectedPost.mainImage && (
              <div className="relative h-64 md:h-96 w-full mb-12 rounded-lg overflow-hidden">
                <img
                  src={urlFor(selectedPost.mainImage).width(1200).height(600).url()}
                  alt={selectedPost.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {selectedPost.body ? (
              <div className="prose prose-lg max-w-none">
                {selectedPost.body.map((block: any, i: number) => {
                  if (block._type === 'block') {
                    const style = block.style || 'normal';
                    const children = block.children?.map((child: any) => {
                      let text = child.text;
                      if (child.marks?.includes('strong')) {
                        text = <strong key={child._key}>{text}</strong>;
                      }
                      if (child.marks?.includes('em')) {
                        text = <em key={child._key}>{text}</em>;
                      }
                      if (child.marks?.includes('underline')) {
                        text = <u key={child._key}>{text}</u>;
                      }
                      return text;
                    });
                    
                    if (style === 'h2') return <h2 key={i} className="text-2xl font-bold text-[#5E0000] mt-8 mb-4">{children}</h2>;
                    if (style === 'h3') return <h3 key={i} className="text-xl font-bold text-[#5E0000] mt-6 mb-3">{children}</h3>;
                    return <p key={i} className="mb-4 text-[#5E0000] leading-relaxed">{children}</p>;
                  }
                  if (block._type === 'image' && block.asset) {
                    return (
                      <div key={i} className="my-8">
                        <img
                          src={urlFor(block).width(800).url()}
                          alt={block.alt || ''}
                          className="w-full rounded-lg"
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : selectedPost.excerpt ? (
              <p className="text-lg text-[#5E0000] leading-relaxed">{selectedPost.excerpt}</p>
            ) : null}

            <div className="mt-12 text-center">
              <button 
                onClick={handleBack}
                className="bg-[#A8312D] text-white px-8 py-3 rounded-full font-bold hover:opacity-90"
              >
                ← Terug naar Nieuws
              </button>
            </div>
          </article>
        )}
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
            <button
              key={post._id}
              onClick={() => fetchAndShowPost(post.slug.current)}
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
