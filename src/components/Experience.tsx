import React from "react";
import ExperienceCard from "./ExperienceCard";

const jobs = [
	{
		role: "Technical Staff",
		company: "App Academy - USA",
		startDate: "Dec 2023",
		endDate: "Present",
		description:
			"As a Technical Staff member at App Academy (USA), I provided thorough debugging support on portfolio projects. Additionally, hosted technical office hours to offer additional assistance, clarification, and guidance to Job Seekers, promoting a collaborative learning community.",
	},

	{
		role: "Full Stack Developer",
		company: "PNG Technology Solutions - Barranquilla",
		startDate: "Jul 2023",
		endDate: "Nov 2023",
		description:
			"As a Full Stack Developer at PNG Technology Solutions (Barranquilla), I developed bespoke software solutions tailored to meet the unique needs of client companies. Actively participated in meetings to meticulously gather project requirements and ensure a comprehensive understanding of client expectations.",
	},
	{
		role: "Programming Mentor",
		company: "Henry - Argentina",
		startDate: "Sep 2022",
		endDate: "Feb 2023",
		description:
			"As a Programming Mentor at Henry (Argentina), I facilitated the resolution of programming exercises, providing personalized assistance to learners to ensure comprehension and mastery.",
	},
];
function Experience() {
	return (
		<div id='experience' className='gray-white-scheme global-p h-[100svh] pt-2 flex flex-col'>
			<h1 className='text-2xl font-bold text-center mb-20'>EXPERIENCE</h1>
			{/*markup */}
			<div className='flex self-center w-[90%] md:w-[70%] '>
				<ol className='relative border-s border-gray-400 '>
					{jobs.map((job) => {
						return <ExperienceCard key={job.company} {...job} />;
					})}
					<li className='ms-8 font-semibold text-2xl'>2022</li>
				</ol>
			</div>
		</div>
	);
}

export default Experience;
