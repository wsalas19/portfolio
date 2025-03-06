import React from "react";
import Image from "next/image";
import { Github, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
	title: string;
	description: string;
	technologies: string[];
	liveUrl?: string;
	githubUrl?: string;
	imageUrl: string;
	highlights: string[];
}

const projects: Project[] = [
	{
		title: "Portfolio Website",
		description: "Personal portfolio built with Next.js and TypeScript",
		technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
		liveUrl: "https://yoursite.com",
		githubUrl: "https://github.com/yourusername/portfolio",
		imageUrl: "/path-to-image.jpg",
		highlights: ["Responsive Design", "Server-Side Rendering", "API Integration"],
	},
	// Add more projects...
];

function ProjectCard({ project }: { project: Project }) {
	return (
		<div className='flex flex-col md:flex-row gap-6 bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors'>
			<div className='md:w-1/2 relative aspect-video'>
				<Image
					src={project.imageUrl}
					alt={project.title}
					fill
					className='rounded-lg object-cover'
				/>
			</div>
			<div className='md:w-1/2 flex flex-col justify-between'>
				<div>
					<h3 className='text-xl font-bold mb-2'>{project.title}</h3>
					<p className='text-gray-400 mb-4'>{project.description}</p>
					<div className='flex flex-wrap gap-2 mb-4'>
						{project.technologies.map((tech) => (
							<span
								key={tech}
								className='px-3 py-1 bg-palette-pink/20 text-palette-pink rounded-full text-sm'
							>
								{tech}
							</span>
						))}
					</div>
					<ul className='list-disc list-inside text-gray-400 mb-4'>
						{project.highlights.map((highlight) => (
							<li key={highlight}>{highlight}</li>
						))}
					</ul>
				</div>
				<div className='flex gap-4'>
					{project.githubUrl && (
						<Button variant='outline' className='flex gap-2 items-center' asChild>
							<a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
								<Github className='w-4 h-4' />
								Code
							</a>
						</Button>
					)}
					{project.liveUrl && (
						<Button variant='outline' className='flex gap-2 items-center' asChild>
							<a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
								<LinkIcon className='w-4 h-4' />
								Live Demo
							</a>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

function ProjectShowcase() {
	return (
		<section id='projects' className='gray-white-scheme global-p'>
			<h2 className='text-2xl font-bold text-center mb-10'>PROJECTS</h2>
			<div className='space-y-8'>
				{projects.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</div>
		</section>
	);
}

export default ProjectShowcase;
