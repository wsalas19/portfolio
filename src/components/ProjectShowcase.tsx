"use client";
import { projects } from "@/lib/constants";
import { ExpandableProjectCard } from "@/components/ui/expandable-project-card";

function ProjectShowcase() {
	return (
		<section id="projects" className="w-full py-20 md:py-32">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Projects Grid. Antes era flex-col md:flex-row con max-w-[380px]: no
				    había paso intermedio, así que a 768 las tres tarjetas caían de golpe
				    en 224px y el título partía a media frase. */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project, index) => (
						<ExpandableProjectCard
							key={`${project.title}-${index}`}
							project={project}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default ProjectShowcase;
