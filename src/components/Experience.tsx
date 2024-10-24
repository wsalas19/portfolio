import React from "react";
import ExperienceCard from "./ExperienceCard";
import { jobs } from "@/lib/constants";

function Experience() {
	return (
		<div id='experience' className='gray-white-scheme global-p pt-2 flex flex-col'>
			<h1 className='text-2xl font-bold text-center mb-10'>EXPERIENCE</h1>
			<div className='flex self-center w-[90%] lg:w-[70%] '>
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
