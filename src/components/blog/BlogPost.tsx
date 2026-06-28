"use client";

import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";
import { ExternalLink } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface BlogPostProps {
	content: string;
	className?: string;
}

// Custom renderers with proper TypeScript types
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
		<h4 className="text-xl font-semibold text-gray-200 mt-6 mb-3 tracking-tight">
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
					<ExternalLink className="w-3.5 h-3.5" />
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

export function BlogPost({ content, className }: BlogPostProps) {
	return (
		<article className={cn("max-w-4xl mx-auto", className)}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</article>
	);
}
