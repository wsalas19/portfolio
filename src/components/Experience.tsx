import React from "react";
import ExperienceCard from "./ExperienceCard";

function Experience() {
	const jobs = [
		{
			role: "Technical Mentor",
			company: "App Academy",
			startDate: "Dec 23",
			endDate: "Present",
			description:
				"Provided technical mentorship at App Academy, contributing to various projects and initiatives aimed at skill development and innovation.",
		},

		{
			role: "Full Stack Developer",
			company: "PNG Technology SAS",
			startDate: "Jul 23",
			endDate: "December 23",
			description:
				"Contributed as a Full Stack Developer at PNG Technology SAS, actively involved in the development and enhancement of diverse software solutions.",
		},
		{
			role: "Programming Mentor",
			company: "Henry Academy",
			startDate: "Sep 22",
			endDate: "Mar 22",
			description:
				"Served as a Programming Mentor at Henry Academy, playing a key role in guiding and supporting learners in their coding journey, fostering a collaborative and productive learning environment.",
		},
	];
	return (
		<div id='experience' className='gray-white-scheme global-p h-[100svh] pt-2 flex flex-col'>
			<h1 className='text-2xl font-bold text-center'>EXPERIENCE</h1>
			{/*markup */}
			<div className='flex justify-center m-auto'>
				<ol className='relative border-s border-gray-200 '>
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
