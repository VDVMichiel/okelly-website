'use client';

import { useState } from 'react';
import Link from 'next/link';
import { urlFor, postHref } from '@/lib/sanity';

export type NewsPost = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  excerpt?: string;
  publishedAt: string;
};

const PAGE_SIZE = 6;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsGrid({ posts }: { posts: NewsPost[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const pagePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (n: number) => {
    setPage(n);
    const section = document.getElementById('nieuws');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (posts.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
        <p className="text-[#5E0000]">Nog geen nieuwsberichten. Binnenkort meer!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <Link
            key={post._id}
            href={postHref(post.slug.current)}
            className="group block w-full text-left cursor-pointer"
          >
            <div className="h-full rounded-lg bg-white shadow-md overflow-hidden transition group-hover:shadow-xl">
              {post.mainImage && (
                <div className="relative h-44 w-full bg-gray-100 md:h-48">
                  <img
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.title}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-5 md:p-6">
                <p className="text-sm text-[#5E0000]/60 mb-2">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </p>
                <h3 className="text-lg font-bold text-[#5E0000] group-hover:text-[#A8312D] mb-2 md:text-xl">
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

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2 md:mt-12" aria-label="Paginering">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => changePage(n)}
              aria-current={n === page ? 'page' : undefined}
              className={
                n === page
                  ? 'flex h-10 w-10 items-center justify-center rounded-full bg-[#A8312D] text-white font-bold transition'
                  : 'flex h-10 w-10 items-center justify-center rounded-full bg-[#A8312D]/10 text-[#A8312D] font-bold transition hover:bg-[#A8312D]/20'
              }
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
