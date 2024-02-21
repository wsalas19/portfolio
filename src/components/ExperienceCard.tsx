import React from "react";
import { jobProps } from "@/types/globals";
import { Briefcase } from "lucide-react";

function ExperienceCard({ role, company, endDate, startDate, description }: jobProps) {
	return (
		<li className='mb-10 ms-8'>
			<span className='absolute flex items-center justify-center w-10 h-10  rounded-full -start-5   ring-palette-pink bg-palette-pink'>
				<Briefcase aria-label='job briefcase icon' className='w-4 h-4 text-gray-900' />
			</span>
			<h3 className='flex gap-3 items-center mb-1 text-2xl font-semibold text-white '>
				{role}
				{endDate === "Present" ? (
					<span className=' text-sm font-semibold px-2 py-0.5 rounded-full bg-palette-lime text-gray-900'>
						Latest
					</span>
				) : null}
			</h3>
			<p className='text-lg font-bold text-gray-400'>{company}</p>
			<time className='block mb-2 text-sm font-semibold leading-none text-gray-400'>
				{startDate} - {endDate}
			</time>
			<p className='mb-4 text-md font-normal text-gray-400'>{description}</p>
		</li>
	);
}

export default ExperienceCard;
