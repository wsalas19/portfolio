import { cn } from "@/lib/utils";

interface SectionHeadingProps {
	eyebrow: string;
	title: string;
	description?: string;
	className?: string;
}

/**
 * No existía: lo más cercano era la micro-etiqueta en mayúsculas copiada a mano
 * en cada componente (`text-xs font-semibold uppercase tracking-wider`). Con
 * varias secciones nuevas, repetirla era repetir el lugar donde se desincroniza.
 */
export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
	return (
		<div className={cn("mb-10 md:mb-14", className)}>
			<span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
				{eyebrow}
			</span>
			<h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white text-balance md:text-4xl">
				{title}
			</h2>
			{description && (
				<p className="mt-3 max-w-2xl leading-relaxed text-gray-300">{description}</p>
			)}
		</div>
	);
}
