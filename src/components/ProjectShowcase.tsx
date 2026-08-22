"use client";
import { projects } from "@/lib/constants";
import { ExpandableProjectCard } from "@/components/ui/expandable-project-card";

function ProjectShowcase() {
	return (
		<section id="projects" className="w-full py-20 md:py-32">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
				{/* Projects Grid */}
				<div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch justify-center">
					{projects.map((project, index) => (
						<div
							key={`${project.title}-${index}`}
							className="w-full max-w-[380px]"
						>
							<ExpandableProjectCard project={project} index={index} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ProjectShowcase;
