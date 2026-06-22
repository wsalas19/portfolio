"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";

interface BlogPostProps {
  content: string;
  className?: string;
}

export function BlogPost({ content, className }: BlogPostProps) {
  return (
    <article
      className={cn(
        "prose prose-invert prose-lg max-w-none",
        "prose-headings:text-gradient-primary",
        "prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4",
        "prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3",
        "prose-h3:text-xl prose-h3:font-medium prose-h3:mt-4 prose-h3:mb-2",
        "prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-a:text-lime-400 prose-a:no-underline hover:prose-a:text-lime-300 prose-a:transition-colors",
        "prose-strong:text-white prose-strong:font-semibold",
        "prose-code:text-lime-300 prose-code:bg-lime-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono",
        "prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-700",
        "prose-blockquote:border-l-4 prose-blockquote:border-lime-500 prose-blockquote:bg-lime-950/10 prose-blockquote:pl-4 prose-blockquote:italic",
        "prose-ul:list-disc prose-ul:pl-6",
        "prose-ol:list-decimal prose-ol:pl-6",
        "prose-li:text-gray-300",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
