"use client";
import React from "react";
import Image from "next/image";
import { imgSize } from "@/lib/constants";
import { motion } from "framer-motion";
import { Globe, MailPlus, Github, Linkedin, Code2 } from "lucide-react";
import { Button } from "./ui/button";

const skills = ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "GraphQL"];

function ProfileCard() {
	return (
		<div id='about' className='flex items-center justify-center py-10 min-h-screen global-p'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex bg-palette-alt p-8 rounded-lg flex-col lg:flex-row gap-8 w-[95%] md:w-[85%] lg:w-[75%] shadow-2xl'
			>
				{/* Image Section */}
				<motion.div
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className='lg:w-1/3 flex flex-col gap-4'
				>
					<div className='relative group'>
						<Image
							className='rounded-lg shadow-primary shadow-lg aspect-square m-auto 
                         transition-transform duration-300 group-hover:scale-[1.02]'
							src={"/images/profile-img.png"}
							alt='William Salas - Software Engineer'
							width={imgSize}
							height={imgSize}
							priority
						/>
						<div
							className='absolute inset-0 bg-palette-pink/10 rounded-lg opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300'
						/>
					</div>

					{/* Social Links - Mobile Only */}
					<div className='flex justify-center gap-4 lg:hidden'>
						<SocialLinks />
					</div>
				</motion.div>

				{/* Content Section */}
				<div className='lg:w-2/3 flex flex-col gap-6'>
					<div className='space-y-2'>
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className='font-bold text-4xl md:text-5xl bg-clip-text text-transparent 
                         bg-gradient-to-r from-white to-palette-pink'
						>
							William Salas Bolaño
						</motion.h1>

						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
							className='space-y-2'
						>
							<p className='text-gray-300 text-xl font-semibold'>Software Engineer</p>
							<div className='text-gray-400 flex items-center gap-2'>
								<Globe className='w-4 h-4' />
								<p className='text-md font-semibold'>Barranquilla, Colombia</p>
							</div>
							<p className='text-palette-pink font-semibold'>1+ Years of Experience</p>
						</motion.div>
					</div>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className='text-lg text-gray-300 leading-relaxed'
					>
						Experienced front-end developer with a unique background in architecture and graphic
						design. Passionate about creating intuitive user experiences and scalable applications.
						Collaborative team player with experience in both local and international projects.
					</motion.p>

					{/* Skills Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className='flex flex-wrap gap-2'
					>
						{skills.map((skill) => (
							<span
								key={skill}
								className='px-3 py-1 bg-palette-pink/20 text-palette-pink rounded-full 
                           text-sm font-medium hover:bg-palette-pink/30 transition-colors'
							>
								{skill}
							</span>
						))}
					</motion.div>

					{/* Action Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className='flex flex-wrap gap-4 mt-auto'
					>
						<Button
							variant='outline'
							className='hover:bg-palette-pink hover:text-white group bg-palette-alt'
							asChild
						>
							<a href='mailto:wa.salas1905@hotmail.com'>
								<MailPlus className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform' />
								Get in Touch
							</a>
						</Button>
						<Button variant='green' asChild>
							<a href='#projects'>
								<Code2 className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform' />
								View Projects
							</a>
						</Button>
					</motion.div>

					{/* Social Links - Desktop Only */}
					<div className='hidden lg:flex gap-4 mt-4'>
						<SocialLinks />
					</div>
				</div>
			</motion.div>
		</div>
	);
}

// Separate component for social links
function SocialLinks() {
	const socialLinks = [
		{ icon: Github, href: "https://github.com/wsalas19", label: "GitHub" },
		{ icon: Linkedin, href: "https://www.linkedin.com/in/williamsalasb/", label: "LinkedIn" },
		// Add more social links as needed
	];

	return (
		<>
			{socialLinks.map(({ icon: Icon, href, label }) => (
				<motion.a
					key={label}
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className='p-2 rounded-full bg-gray-800 hover:bg-palette-pink/20 
                     transition-colors duration-300'
				>
					<Icon className='w-5 h-5' />
					<span className='sr-only'>{label}</span>
				</motion.a>
			))}
		</>
	);
}

export default ProfileCard;
