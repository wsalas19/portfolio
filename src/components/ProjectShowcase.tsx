"use client";
import { projects } from "@/lib/constants";
import { Project } from "@/lib/types/globals";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProjectCard({
	project,
	isActive,
}: {
	project: Project;
	isActive: boolean;
}) {
	return (
		<div
			className={`transform transition-all duration-500 px-4
        ${
					isActive
						? "opacity-100 scale-100"
						: "opacity-0 scale-95 pointer-events-none absolute"
				}`}
		>
			<div className="bg-palette-card rounded-xl overflow-hidden shadow-2xl ">
				<div className="relative aspect-video">
					<Image
						src={project.imageUrl}
						alt={project.title}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-palette-card to-transparent" />
				</div>

				<div className="p-8">
					<h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-palette-pink">
						{project.title}
					</h3>

					<p className="text-gray-400 mb-6 line-clamp-2">
						{project.description}
					</p>

					<div className="flex flex-wrap gap-2 mb-6">
						{project.technologies.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1 bg-palette-pink/10 text-palette-pink rounded-full text-sm
                         hover:bg-palette-pink/20 transition-all duration-300 cursor-default"
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
								<span className="w-1.5 h-1.5 rounded-full bg-palette-pink/50" />
								<span>{highlight}</span>
							</div>
						))}
					</div>

					{/* <div className='flex gap-4'>
						{project.githubUrl && (
							<Button
								variant='outline'
								className='flex-1 hover:bg-palette-pink hover:text-white group'
								asChild
							>
								<a
									href={project.githubUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-2'
								>
									<Github className='w-4 h-4 group-hover:scale-110 transition-transform' />
									Code
								</a>
							</Button>
						)}
						{project.liveUrl && (
							<Button
								variant='outline'
								className='flex-1 hover:bg-palette-lime hover:text-gray-900 group'
								asChild
							>
								<a
									href={project.liveUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-2'
								>
									<LinkIcon className='w-4 h-4 group-hover:scale-110 transition-transform' />
									Live Demo
								</a>
							</Button>
						)}
					</div> */}
				</div>
			</div>
		</div>
	);
}

function ProjectShowcase() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		if (!isAutoPlaying) return;

		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % projects.length);
		}, 17000);

		return () => clearInterval(timer);
	}, [isAutoPlaying]);

	const goToProject = (index: number) => {
		setCurrentIndex(index);
		setIsAutoPlaying(false);
	};

	const nextProject = () => {
		setCurrentIndex((prev) => (prev + 1) % projects.length);
		setIsAutoPlaying(false);
	};

	const previousProject = () => {
		setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
		setIsAutoPlaying(false);
	};

	return (
		<section id="projects" className="gray-white-scheme global-p ">
			<div className="max-w-6xl mx-auto">
				<h2
					className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent 
                       bg-gradient-to-r from-white to-palette-pink"
				>
					PROJECTS
				</h2>
				<p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
					A showcase of my recent work and side projects
				</p>

				<div className="relative">
					{/* Projects Container */}
					<div className="relative overflow-hidden">
						{projects.map((project, index) => (
							<ProjectCard
								key={project.title}
								project={project}
								isActive={index === currentIndex}
							/>
						))}
					</div>

					{/* Navigation Arrows */}
					<button
						onClick={previousProject}
						className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-palette-card/50 
                     hover:bg-palette-pink/20 transition-all duration-300"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>
					<button
						onClick={nextProject}
						className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-palette-card/50 
                     hover:bg-palette-pink/20 transition-all duration-300"
					>
						<ChevronRight className="w-6 h-6" />
					</button>

					{/* Navigation Dots */}
					<div className="flex justify-center gap-2 mt-8">
						{projects.map((_, index) => (
							<button
								key={index}
								onClick={() => goToProject(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${
										index === currentIndex
											? "w-8 bg-palette-pink"
											: "bg-gray-600 hover:bg-palette-pink/50"
									}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProjectShowcase;
