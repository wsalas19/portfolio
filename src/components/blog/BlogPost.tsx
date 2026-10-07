"use client";

import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";
import { ExternalLink } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { ZoomImage } from "@/components/ZoomImage";

interface BlogPostProps {
	content: string;
	className?: string;
}

// Text, figures, tables and code all start at the article's left edge; only the
// text is capped, at 68ch, so the prose runs ~68 characters a line instead of the
// ~100 it ran at max-w-4xl (where leading-loose was papering over the measure).
// A data article wants the full 896px canvas for its maps, so the wider elements
// keep it and only the sentences stop short.
const MEASURE = "max-w-[68ch]";

// One accent per job: lime is structure and interaction, pink is the method
// apparatus. Nothing encodes heading level by hue any more.
const FOCUS =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c1c]";

// Custom renderers with proper TypeScript types
const components: Partial<Components> = {
	// Headings with clear hierarchy
	h1: ({ children }) => (
		<h1
			className={cn(
				"text-4xl font-bold text-white mt-12 mb-8 pb-4 border-b border-gray-600 tracking-tight text-balance",
				MEASURE,
			)}
		>
			{children}
		</h1>
	),

	// El rule de lima sobre el h2 marca el inicio de sección sin desplazar el
	// texto: un border-left habría indentado el título respecto del párrafo.
	h2: ({ children }) => (
		<h2
			className={cn(
				"text-3xl font-bold text-white mt-14 mb-6 tracking-tight text-balance",
				"before:block before:h-1 before:w-12 before:rounded-full before:bg-lime-500 before:mb-4",
				MEASURE,
			)}
		>
			{children}
		</h2>
	),

	h3: ({ children }) => (
		<h3
			className={cn(
				"text-2xl font-semibold text-gray-100 mt-8 mb-4 tracking-tight text-balance",
				MEASURE,
			)}
		>
			{children}
		</h3>
	),

	h4: ({ children }) => (
		<h4
			className={cn(
				"font-display text-xl font-semibold text-gray-200 mt-6 mb-3 tracking-tight",
				MEASURE,
			)}
		>
			{children}
		</h4>
	),

	// Paragraphs with clear separation
	p: ({ children }) => (
		<p className={cn("text-gray-300 mb-6 text-base leading-[1.75]", MEASURE)}>
			{children}
		</p>
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
					// inline + box-decoration-clone: sin esto el `inline-flex` que
					// había antes impedía partir el enlace entre líneas y el texto
					// largo se salía del párrafo en móvil.
					className={cn(
						"inline box-decoration-clone text-lime-400 font-medium border border-lime-500/30 bg-lime-950/20 px-1.5 py-0.5 rounded-md no-underline transition-colors duration-200 hover:bg-lime-950/40 hover:border-lime-500/60",
						FOCUS,
					)}
				>
					{children}
					<ExternalLink className="ml-1 inline h-3.5 w-3.5 align-baseline" aria-hidden />
				</a>
			);
		}
		return (
			<a
				href={href}
				className={cn(
					"text-lime-400 font-medium underline underline-offset-4 decoration-lime-400/50 decoration-2 transition-colors duration-200 hover:text-lime-300 hover:decoration-lime-300",
					FOCUS,
				)}
			>
				{children}
			</a>
		);
	},

	// Strong/bold text
	strong: ({ children }) => (
		<strong className="text-white font-semibold">{children}</strong>
	),

	// Sin esto la cursiva del markdown cae al italic del navegador. Se usa 27
	// veces en el artículo, casi siempre para títulos de publicaciones.
	em: ({ children }) => (
		<em className="italic text-gray-100">{children}</em>
	),

	// Figures: without this the markdown emitted a bare <img>, so the charts came
	// out unsized and full source weight (some are 3.5 MB PNGs). No sm:max-w cap
	// here — a chart is the article's content, not an aside.
	img: ({ src, alt }) =>
		typeof src === "string" ? (
			<ZoomImage
				src={src}
				alt={alt || ""}
				sizes="(max-width: 896px) 100vw, 896px"
				wrapperClassName="mx-auto my-8 block w-full cursor-zoom-in"
			/>
		) : null,

	// Inline code vs code blocks
	code: ({ className, children, ...props }) => {
		// If className contains language- prefix, it's a code block (handled by rehype-highlight)
		// Otherwise it's inline code
		const isCodeBlock = className?.includes("language-");
		if (!isCodeBlock) {
			// Neutral a propósito: en lima competía con los enlaces y el código
			// dejaba de leerse como código.
			return (
				<code
					className="text-gray-100 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/10 font-mono text-[0.9em]"
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
		<pre className="bg-[#0d1117] border border-gray-600 rounded-lg shadow-xl mt-6 mb-6 overflow-x-auto">
			{children}
		</pre>
	),

	// Las «Fuente y método» no son citas de nadie: son notas del autor, así que
	// el elemento es <aside>. El acento rosa distingue ese aparato del texto.
	blockquote: ({ children }) => (
		<aside
			className={cn(
				"my-8 rounded-r-lg border-l-4 border-pink-400 bg-pink-400/[0.06] py-4 pl-6 text-gray-300",
				// El orden importa: twMerge resuelve el conflicto tamaño/interlínea
				// quedándose con el último, y `text-[0.95rem]` borraría el leading si
				// fuera después. Va último.
				"[&>p]:mb-0 [&>p]:text-[0.95rem] [&>p]:leading-relaxed",
				MEASURE,
			)}
		>
			{children}
		</aside>
	),

	// Lists with proper spacing
	ul: ({ children }) => (
		<ul className={cn("list-disc pl-6 my-6 space-y-2 text-gray-300", MEASURE)}>
			{children}
		</ul>
	),

	ol: ({ children }) => (
		<ol className={cn("list-decimal pl-6 my-6 space-y-2 text-gray-300", MEASURE)}>
			{children}
		</ol>
	),

	// [&>ul]: las listas anidadas heredaban el my-6 de arriba y se despegaban
	// de su elemento padre. El selector hijo las aprieta sin tocar la de fuera.
	li: ({ children }) => (
		<li className="leading-relaxed [&>ul]:my-2 [&>ol]:my-2">{children}</li>
	),

	// Horizontal rules for section dividers
	hr: () => <hr className="border-gray-600 my-14 border-t-2" />,

	// Tables (if used)
	// Sin w-full: una tabla de dos columnas se estiraba a los 896px y dejaba un
	// hueco muerto en el medio. La tabla toma el ancho de su contenido; si el
	// contenido no cabe, el overflow-x-auto de arriba ya la deja desplazarse.
	// Los enlaces dentro de una celda pierden el pill: en una columna estrecha el
	// borde y el padding desbordaban la celda y el icono saltaba de línea. Queda
	// el enlace subrayado, que es lo que se lee en una tabla densa.
	table: ({ children }) => (
		<div className="overflow-x-auto my-8 [&_a]:rounded-none [&_a]:border-0 [&_a]:bg-transparent [&_a]:px-0 [&_a]:py-0 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:bg-transparent">
			<table className="text-sm max-w-full">{children}</table>
		</div>
	),

	thead: ({ children }) => <thead className="bg-white/[0.06]">{children}</thead>,

	// border-gray-800 sobre #1c1c1c daba 1.16:1: las filas no tenían separación
	// visible y la tabla se leía solo por alineación de columnas. gray-500 es el
	// primer gris que pasa 3:1 (3.53); a las rayas cebra les pasa lo mismo que al
	// original, que a 2% de blanco son 1.05:1 y no se ven.
	tbody: ({ children }) => (
		<tbody className="[&>tr:last-child]:border-b-0">{children}</tbody>
	),

	tr: ({ children }) => (
		<tr className="border-b border-gray-500">{children}</tr>
	),

	th: ({ children }) => (
		<th
			scope="col"
			className="px-4 py-3 text-left text-white font-semibold text-xs uppercase tracking-wider"
		>
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
