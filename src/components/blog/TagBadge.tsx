import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium glass-subtle",
        // `hover:glass` no generaba nada: `glass` es una clase CSS suelta de
        // @layer utilities, no una utilidad de Tailwind, así que no existe la
        // variante. Mismo realce que el botón "View Code", que va sobre el mismo
        // vidrio.
        "hover:bg-white/10 transition-colors duration-200",
        "text-lime-300",
        className
      )}
    >
      {tag}
    </span>
  );
}
