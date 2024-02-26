import React from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Globe, MailPlus } from "lucide-react";
import { ProfileCardProps } from "@/types/globals";

function ProfileCard({ url, imgSize }: ProfileCardProps) {
	//TODO:
	// Remove stars and think of a better info to display on card.
	return (
		<div id='about' className='flex items-center justify-center py-10 h-screen global-p'>
			<div className='flex bg-palette-alt  p-6 rounded-lg flex-col lg:flex-row gap-3 w-[90%] md:w-[70%]'>
				{url ? (
					<Image
						className=' rounded-md grayscale shadow-primary shadow-lg aspect-square align-middle'
						src={url}
						alt='personal-b&w-pic'
						width={imgSize}
						height={imgSize}
					/>
				) : (
					<Skeleton className='rounded-md' />
				)}
				<div className=' gap-1 flex flex-col'>
					<div className='flex flex-col justify-between md:flex-row'>
						<p className=' font-bold text-3xl transition-all hover:text-glow-lime cursor-pointer'>
							William Salas Bolaño
						</p>
					</div>
					<p className=' text-gray-300 text-xl'>Software Engineer</p>
					<div className=' text-gray-400 flex flex-row gap-1 items-center'>
						<Globe aria-label='globe-wireframe' className='w-4 h-4' />
						<p className=' text-md'>Barranquilla, Colombia</p>
					</div>
					<p className='text-palette-pink'>+1 yrs experience</p>
					<p className='text-md mt-1'>
						{
							"Experienced front-end developer with a background in architecture and graphic design. Collaborative team player adept at crafting custom full-stack applications for both local and international companies. Proficient in modern technologies like React and Node.js."
						}
					</p>
					<a
						href='mailto:wa.salas1905@hotmail.com'
						className='text-gray-400 flex gap-1 mt-auto justify-end items-center'
					>
						<MailPlus
							aria-label='mail plus icon'
							className='w-6 h-6 hover:text-palette-lime hover:scale-125 transition'
						/>
					</a>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;
