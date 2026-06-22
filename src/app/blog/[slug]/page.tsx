import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog/posts";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPost as BlogPostContent } from "@/components/blog/BlogPost";

export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found | William Salas",
		};
	}

	return {
		title: `${post.title} | William Salas Blog`,
		description: post.excerpt,
		keywords: [...post.tags, "William Salas", "blog", "web development"],
		authors: [{ name: post.author }],
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
			url: `https://wsalasdev.site/blog/${post.slug}`,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			creator: "@wsalas19",
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		author: {
			"@type": "Person",
			name: post.author,
			url: "https://wsalasdev.site",
		},
		datePublished: post.date,
		description: post.excerpt,
		keywords: post.tags.join(", "),
		url: `https://wsalasdev.site/blog/${post.slug}`,
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>
			<div className="min-h-screen py-12 px-4 md:px-8 lg:px-16 mb-14">
				<div className="max-w-4xl mx-auto">
					<BlogHeader post={post} />
					<BlogPostContent content={post.content} />
				</div>
			</div>
		</>
	);
}
