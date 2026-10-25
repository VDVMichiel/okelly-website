'use client';

import { useEffect, useState } from 'react';
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

// Desktop shows a 3x2 grid, phones a 1x3 list; both fill the section so the
// news section stays exactly one screen tall.
const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 3;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsGrid({ posts }: { posts: NewsPost[] }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const updatePageSize = () => {
      setPageSize(query.matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE);
      setPage(1);
    };

    updatePageSize();
    query.addEventListener('change', updatePageSize);
    return () => query.removeEventListener('change', updatePageSize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const pagePosts = posts.slice((page - 1) * pageSize, page * pageSize);

  const changePage = (n: number) => {
    setPage(n);
    const section = document.getElementById('nieuws');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full rounded-lg bg-white p-6 shadow-md md:p-8">
          <p className="text-[#5E0000]">Nog geen nieuwsberichten. Binnenkort meer!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 grid-rows-3 gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4 lg:gap-6">
        {pagePosts.map((post) => (
          <Link
            key={post._id}
            href={postHref(post.slug.current)}
            className="group block h-full min-h-0 w-full text-left cursor-pointer"
          >
            <article className="flex h-full min-h-0 overflow-hidden rounded-lg bg-white shadow-md transition group-hover:shadow-lg md:flex-col">
              {post.mainImage && (
                <div className="relative h-full w-24 shrink-0 bg-gray-100 sm:w-28 md:h-auto md:w-full md:flex-1 md:min-h-0">
                  <img
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.title}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden p-3 md:flex-none md:justify-start md:p-4">
                <p className="mb-1 text-xs text-[#5E0000]/60">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </p>
                <h3 className="mb-1 line-clamp-2 text-base font-bold text-[#5E0000] group-hover:text-[#A8312D] lg:text-lg">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="line-clamp-2 text-sm text-[#5E0000]/80 md:hidden lg:line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-4 flex shrink-0 flex-wrap items-center justify-center gap-2 md:mt-5"
          aria-label="Paginering"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => changePage(n)}
              aria-current={n === page ? 'page' : undefined}
              className={
                n === page
                  ? 'flex h-9 w-9 items-center justify-center rounded-full bg-[#A8312D] text-sm font-bold text-white transition'
                  : 'flex h-9 w-9 items-center justify-center rounded-full bg-[#A8312D]/10 text-sm font-bold text-[#A8312D] transition hover:bg-[#A8312D]/20'
              }
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
