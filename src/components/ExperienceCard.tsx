import React from "react";
import { jobProps } from "@/lib/types/globals";
import { Briefcase } from "lucide-react";
import { Button } from "./ui/button";

interface ExperienceCardProps extends jobProps {
	isActive?: boolean;
}

function ExperienceCard({
	role,
	company,
	endDate,
	startDate,
	description,
	technologies = [],
	companyUrl = "",
	isActive = false,
}: ExperienceCardProps) {
	return (
		<li className='relative mb-10 ms-8'>
			{" "}
			{/* Added relative positioning here */}
			{/* Briefcase icon container - moved outside the scaling container */}
			<span
				className={`absolute flex items-center justify-center w-10 h-10 
        rounded-full -start-5 ring-8 ring-gray-900 bg-palette-pink
        transition-all duration-300 ${isActive ? "scale-110" : ""}`}
				style={{ transform: `translate(-50%, 0)` }} // Fix position
			>
				<Briefcase className='w-5 h-5 text-gray-900' />
			</span>
			{/* Content container with scale effect */}
			<div className={`transition-all duration-300 ${isActive ? "transform scale-[1.02]" : ""}`}>
				<div className='p-4 rounded-lg hover:bg-white/5 transition-colors duration-300'>
					<div className='flex flex-wrap items-center justify-between mb-2'>
						<h3 className='flex items-center gap-3 text-2xl font-bold text-white'>
							{role}
							{endDate === "Present" && (
								<span className='text-sm font-semibold px-2 py-0.5 rounded-full bg-palette-lime text-gray-900'>
									Current
								</span>
							)}
						</h3>

						{companyUrl ? (
							<Button variant='ghost' size='sm' className='group' asChild>
								<a href={companyUrl}>...</a>
							</Button>
						) : (
							<span className='text-gray-400 text-lg font-medium'>{company}</span>
						)}
					</div>

					<time className='block mb-4 text-sm font-semibold leading-none text-gray-400'>
						{startDate} - {endDate}
					</time>

					<p className='mb-4 text-gray-400 text-pretty'>{description}</p>

					{technologies.length > 0 && (
						<div className='flex flex-wrap gap-2 mt-4'>
							{technologies.map((tech) => (
								<span
									key={tech}
									className='px-2 py-1 text-xs font-medium rounded-full
                    bg-palette-pink/10 text-palette-pink
                    hover:bg-palette-pink/20 transition-all duration-300'
								>
									{tech}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</li>
	);
}

export default ExperienceCard;
