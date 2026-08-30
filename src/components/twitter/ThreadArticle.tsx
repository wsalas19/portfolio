import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { UnrolledThread } from '@/lib/twitter/types';
import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import type { Components } from 'react-markdown';

// Helper functions for adaptive image grid layout
function getGridClasses(imageCount: number): string {
  if (imageCount === 1) return 'grid grid-cols-1 max-w-2xl mx-auto gap-3';
  if (imageCount === 2) return 'grid grid-cols-2 gap-3';
  if (imageCount === 3) return 'grid grid-cols-2 gap-3';
  return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3';
}

function getAspectClass(imageCount: number, index: number): string {
  if (imageCount === 1) return 'aspect-video';
  if (imageCount === 2) return 'aspect-video';
  if (imageCount === 3 && index === 0) return 'aspect-video';
  return 'aspect-square';
}

function getMaxImages(imageCount: number): number {
  return imageCount > 3 ? 3 : imageCount;
}

function getImageSizes(imageCount: number): string {
  if (imageCount === 1) return '(max-width: 768px) 100vw, 75vw';
  if (imageCount === 2) return '(max-width: 768px) 100vw, 50vw';
  return '(max-width: 768px) 100vw, 33vw';
}

// Custom markdown components for proper text hierarchy and spacing
const components: Partial<Components> = {
  // Headings with clear hierarchy
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-white mt-12 mb-8 pb-4 border-b border-gray-700 tracking-tight">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-3xl font-bold text-lime-400 mt-12 mb-6 tracking-tight">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-pink-400 mt-8 mb-4 tracking-tight">
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4 className="font-display text-xl font-semibold text-gray-200 mt-6 mb-3 tracking-tight">
      {children}
    </h4>
  ),

  // Paragraphs with clear separation
  p: ({ children }) => (
    <p className="text-gray-300 leading-loose mb-6 text-base">{children}</p>
  ),

  // Links with clear clickability
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-lime-400 font-medium border border-lime-500/30 bg-lime-950/20 px-2.5 py-1.5 rounded-md text-sm hover:bg-lime-950/40 hover:border-lime-500/60 transition-all duration-200 no-underline"
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        className="text-lime-400 font-medium underline underline-offset-4 decoration-lime-400/50 decoration-2 hover:text-lime-300 hover:decoration-lime-300 transition-all duration-200"
      >
        {children}
      </a>
    );
  },

  // Strong/bold text
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),

  // Inline code vs code blocks
  code: ({ className, children, ...props }) => {
    // If className contains language- prefix, it's a code block (handled by rehype-highlight)
    // Otherwise it's inline code
    const isCodeBlock = className?.includes("language-");
    if (!isCodeBlock) {
      return (
        <code
          className="text-lime-300 bg-lime-950/40 px-2 py-1 rounded font-mono text-sm border border-lime-500/20"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },

  // Code blocks
  pre: ({ children }) => (
    <pre className="bg-[#0d1117] border border-gray-700 rounded-lg shadow-xl mt-6 mb-6 overflow-x-auto">
      {children}
    </pre>
  ),

  // Blockquotes with visual distinction
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-lime-500 bg-lime-950/10 pl-6 py-4 my-6 rounded-r-lg text-gray-300">
      {children}
    </blockquote>
  ),

  // Lists with proper spacing
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-6 space-y-2 text-gray-300">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-6 space-y-2 text-gray-300">
      {children}
    </ol>
  ),

  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  // Horizontal rules for section dividers
  hr: () => <hr className="border-gray-700 my-12 border-t-2" />,

  // Tables (if used)
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-700">{children}</table>
    </div>
  ),

  thead: ({ children }) => <thead className="bg-gray-800/50">{children}</thead>,

  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-800">{children}</tbody>
  ),

  tr: ({ children }) => <tr>{children}</tr>,

  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-white font-semibold text-sm uppercase tracking-wider">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-300 text-sm">{children}</td>
  ),
};

export function ThreadArticle({ thread }: { thread: UnrolledThread }) {
  console.log('🎨 ThreadArticle rendering:', {
    title: thread.title,
    markdownLength: thread.markdownContent.length,
    markdownPreview: thread.markdownContent.substring(0, 100),
    author: thread.author.name,
    hasImages: !!thread.images && thread.images.length > 0
  });

  return (
    <main className="min-h-screen bg-[#121212] py-12 px-4">
      <article className="max-w-4xl mx-auto">

        {/* Content */}
        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
          {/* Header */}
          <header className="p-8 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-3">
              <span>X Thread Unrolled</span>
              <span>•</span>
              <span>{thread.estimatedReadTime} min read</span>
            </div>

            <div className="flex items-center gap-4">
              {thread.author.avatar_url ? (
                <Image
                  src={thread.author.avatar_url}
                  alt={thread.author.name}
                  width={48}
                  height={48}
                  className="rounded-full border border-white/10"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                  {thread.author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-bold text-white">
                  {thread.author.name}
                  <span className="text-xs font-normal text-gray-400 ml-2">@{thread.author.screen_name}</span>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(thread.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </header>
        {/* Images Section */}
        {thread.images && thread.images.length > 0 && (() => {
          const images = thread.images;
          return (
            <div className="mb-6 mx-6 max-w-4xl">
              <div className={getGridClasses(images.length)}>
                {images.filter(img => img.url).slice(0, getMaxImages(images.length)).map((image, index) => (
                  <div key={index} className={`relative ${getAspectClass(images.length, index)} bg-gray-800 rounded-xl overflow-hidden glass-strong`}>
                    <Image
                      src={image.url}
                      alt={image.alt || 'Tweet image'}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes={getImageSizes(images.length)}
                    />
                  </div>
                ))}
              </div>
              {images.length > 3 && (
                <div className="text-center text-sm text-gray-400 mt-2">
                  +{images.length - 3} more images
                </div>
              )}
            </div>
          );
        })()}

          {/* Markdown Content */}
          <section className="p-8 prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-lime-400 prose-strong:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
              {thread.markdownContent}
            </ReactMarkdown>
          </section>
        </div>
      </article>
    </main>
  );
}
