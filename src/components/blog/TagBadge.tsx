import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium glass-light",
        "hover:glass transition-colors duration-200",
        "text-lime-300",
        className
      )}
    >
      {tag}
    </span>
  );
}
