import { Project } from "@/lib/types/globals";
import Image from "next/image";

interface ProjectCardContentProps {
	project: Project;
	imageAspectRatio?: string;
	className?: string;
}

export function ProjectCardContent({
	project,
	imageAspectRatio = "aspect-video",
	className = "",
}: ProjectCardContentProps) {
	return (
		<div
			style={{
				background: "rgba(18, 18, 18, 0.4)",
				borderRadius: "16px",
				backdropFilter: "blur(16px)",
				WebkitBackdropFilter: "blur(16px)",
				border: "1px solid rgba(255, 255, 255, 0.12)",
			}}
			className={`rounded-2xl overflow-hidden glow-lime-hover transition-all duration-300 h-full ${className}`}
		>
			<div className={`relative ${imageAspectRatio}`}>
				<Image
					src={project.imageUrl}
					alt={project.title}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-palette-card via-palette-card/50 to-transparent opacity-90" />
			</div>

			<div className="p-8">
				<h3 className="text-2xl uppercase font-bold mb-3 text-gradient-pink">
					{project.title}
				</h3>

				<p className="text-gray-300 mb-6 line-clamp-2">
					{project.description}
				</p>

				<div className="flex flex-wrap gap-2 mb-6">
					{project.technologies.map((tech) => (
						<span
							key={tech}
							className="px-3 py-1 glass-pink text-palette-pink rounded-full text-sm
							hover:bg-palette-pink/30 transition-all duration-300 cursor-default border border-palette-pink/20 glow-pink-hover"
						>
							{tech}
						</span>
					))}
				</div>

				<div className="space-y-2 mb-6">
					{project.highlights.map((highlight) => (
						<div
							key={highlight}
							className="flex items-center gap-2 text-gray-400"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-palette-lime glow-lime" />
							<span>{highlight}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
