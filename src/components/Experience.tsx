"use client";
import React, { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { jobs } from "@/lib/constants";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

function Experience() {
	const [isExpanded, setIsExpanded] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	// Auto-animate the first card after component mount
	useEffect(() => {
		setActiveIndex(0);
		const timer = setTimeout(() => setActiveIndex(null), 1000);
		return () => clearTimeout(timer);
	}, []);

	const visibleJobs = isExpanded ? jobs : jobs.slice(0, 2);

	return (
		<div id="experience" className="global-p pt-2 flex flex-col min-h-screen">
			<div className="max-w-6xl mx-auto w-full px-4">
				{/* Section Header */}
				<div className="text-center mb-12 space-y-4 z-50">
					<h1
						className="text-4xl font-bold bg-clip-text text-transparent
                         bg-gradient-to-r from-white to-palette-pink"
					>
						EXPERIENCE
					</h1>
					<p className="text-gray-400 max-w-2xl mx-auto uppercase font-semibold">
						A timeline of my professional journey and key milestones
					</p>
				</div>

				{/* Timeline */}
				<div className="flex justify-center">
					<div className="w-[80%] md:w-full max-w-4xl">
						<ol className="relative border-s-2 border-gray-400 space-y-10">
							{visibleJobs.map((job, index) => (
								<div
									key={job.company}
									className={`transform transition-all duration-500
                    ${activeIndex === index ? "scale-105" : "scale-100"}
                    hover:scale-[1.02]`}
									onMouseEnter={() => setActiveIndex(index)}
									onMouseLeave={() => setActiveIndex(null)}
								>
									<ExperienceCard {...job} isActive={activeIndex === index} />
								</div>
							))}

							{/* Starting Year Marker */}
							<li className="ms-8 font-semibold text-2xl text-white">2022</li>
						</ol>

						{/* Show More/Less Button */}
						{jobs.length > 3 && (
							<div className="text-center mt-8">
								<Button
									variant="outline"
									onClick={() => setIsExpanded(!isExpanded)}
									className="group rounded-lg transition-all "
								>
									{isExpanded ? (
										<>
											Show Less
											<ChevronUp className="w-4 h-4 ml-2 group-hover:transform group-hover:scale-125 transition-transform" />
										</>
									) : (
										<>
											Show More
											<ChevronDown className="w-4 h-4 ml-2 group-hover:transform group-hover:scale-125 transition-transform" />
										</>
									)}
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// Helper function to extract unique technologies from jobs
/* function getTechnologies(): string[] {
	const techSet = new Set<string>();
	jobs.forEach((job) => {
		// Assuming you add a technologies array to your job type
		job.technologies?.forEach((tech) => techSet.add(tech));
	});
	return Array.from(techSet);
} */

export default Experience;
