import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

type PostBodyProps = {
  body: any[];
};

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText
        value={body}
        components={{
          block: {
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-[#5E0000] mt-8 mb-4">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-[#5E0000] mt-6 mb-3">{children}</h3>
            ),
            normal: ({ children }) => (
              <p className="mb-4 text-[#5E0000] leading-relaxed">{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#A8312D] pl-4 italic my-6 text-[#5E0000]/80">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc pl-6 mb-4 text-[#5E0000] leading-relaxed">{children}</ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal pl-6 mb-4 text-[#5E0000] leading-relaxed">{children}</ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => <li className="mb-1">{children}</li>,
            number: ({ children }) => <li className="mb-1">{children}</li>,
          },
          marks: {
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            underline: ({ children }) => <u>{children}</u>,
            'strike-through': ({ children }) => <s>{children}</s>,
            code: ({ children }) => (
              <code className="bg-[#5E0000]/10 px-1 rounded text-sm">{children}</code>
            ),
            link: ({ value, children }) => {
              const href = value?.href;
              if (!href) return <>{children}</>;
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A8312D] underline decoration-1 underline-offset-2 hover:opacity-80"
                >
                  {children}
                </a>
              );
            },
          },
          types: {
            image: ({ value }) => {
              if (!value) return null;
              return (
                <div className="my-8">
                  <img
                    src={urlFor(value).width(800).url()}
                    alt={value.alt || ''}
                    className="w-full rounded-lg"
                  />
                </div>
              );
            },
          },
        }}
      />
    </div>
  );
}
