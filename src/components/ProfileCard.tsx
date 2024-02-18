import React from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Star, ExternalLink } from "lucide-react";
import { ProfileCardProps } from "@/types/globals";

function ProfileCard({ data, imgSize }: ProfileCardProps) {
	//TODO:
	// Remove stars and think of a better info to display on card.
	return (
		<div id='about' className='flex items-center justify-center py-10 h-screen global-p'>
			<div className='flex bg-palette-alt  p-6 rounded-lg flex-col md:flex-row gap-3 w-[90%] md:w-[70%]'>
				{data ? (
					<Image
						className=' rounded-md grayscale shadow-primary shadow-lg aspect-square'
						src={data.publicUrl}
						alt='personal-b&w-pic'
						width={imgSize}
						height={imgSize}
					/>
				) : (
					<Skeleton className='rounded-md' />
				)}
				<div className=' gap-1 flex flex-col'>
					<div className='flex flex-col justify-between md:flex-row'>
						<p className=' font-bold text-3xl transition-all hover:text-glow-lime'>William Salas</p>
						{/* <div className='flex items-center gap-1'>
							{"fives".split("").map((i) => {
								return <Star key={i} className='w-6 h-6 text-palette-lime hover:icon-glow-lime' />;
							})}
						</div> */}
					</div>
					<p className=' text-gray-400 text-xl'>Software Engineer</p>
					<p className='text-palette-pink'>+1 yrs experience</p>
					<p className='text-md mt-1'>
						{
							"Experienced front-end developer with a background in architecture and graphic design. Collaborative team player adept at crafting custom full-stack applications for both local and international companies. Proficient in modern technologies like React and Node.js."
						}
					</p>
					<a
						href='mailto:wa.salas1905@hotmail.com'
						className='text-gray-400 flex gap-1 mt-auto justify-end items-center hover:text-gray-200'
					>
						Contact <ExternalLink className='w-4' />
					</a>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;
