import Link from "next/link";
import { BlogPost } from "@/lib/blog/types";
import { TagBadge } from "./TagBadge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

// Simple date formatter without external library
function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "block glass p-6 rounded-lg transition-all duration-200",
        "hover:glass-strong hover:scale-[1.02]",
        "group",
        className
      )}
    >
      <article>
        <h2 className="text-2xl font-bold text-gradient-primary mb-3 group-hover:text-lime-300 transition-colors">
          {post.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <time dateTime={post.date}>{formatDateShort(post.date)}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readingTime} min</span>
          </div>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-lime-400 group-hover:text-lime-300 transition-colors">
          <span className="font-medium">Read more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </article>
    </Link>
  );
}
