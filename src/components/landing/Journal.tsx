import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog/posts";

/**
 * Los dos últimos posts. Si no hay ninguno, la sección no existe: una sección
 * vacía con un "coming soon" es peor que su ausencia.
 */
function Journal() {
	const posts = getAllPosts().slice(0, 2);
	if (posts.length === 0) return null;

	return (
		<section className="py-20 md:py-32">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionHeading
					eyebrow="Journal"
					title="Writing, when something is worth explaining"
					description="Longer pieces about the parts of the work that do not fit in a caption."
				/>

				<div className="grid gap-6 md:grid-cols-2">
					{posts.map((post) => (
						<BlogCard key={post.slug} post={post} />
					))}
				</div>

				<Link
					href="/blog"
					className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-palette-lime hover:underline"
				>
					All articles
					<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</section>
	);
}

export default Journal;
