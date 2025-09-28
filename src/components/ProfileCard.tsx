"use client";
import React from "react";
import Image from "next/image";
import { imgSize } from "@/lib/constants";
import { motion } from "framer-motion";
import { MailPlus, Github, Linkedin, Code2, MapPin } from "lucide-react";
import { Button } from "./ui/button";

const skills = [
	"React",
	"TypeScript",
	"Node.js",
	"Next.js",
	"Tailwind CSS",
	"GraphQL",
];

const socialLinks = [
	{ icon: Github, href: "https://github.com/wsalas19", label: "GitHub" },
	{
		icon: Linkedin,
		href: "https://www.linkedin.com/in/williamsalasb/",
		label: "LinkedIn",
	},
];

function ProfileCard() {
	return (
		<div
			id="about"
			className="flex items-center justify-center py-10 min-h-screen global-p"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="bg-palette-alt p-8 md:p-12 mx-5 md:m-0 rounded-2xl w-full max-w-4xl shadow-2xl"
			>
				{/* Header Section - Centered */}
				<div className="flex flex-col items-center text-center mb-8">
					{/* Profile Image */}
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5 }}
						className="relative group mb-6"
					>
						<Image
							className="rounded-full shadow-primary shadow-lg aspect-square md:w-40 md:h-40 object-cover
                         transition-transform duration-300 group-hover:scale-[1.02]"
							src={"/images/profile-img.png"}
							alt="William Salas - Software Engineer"
							width={imgSize}
							height={imgSize}
							priority
						/>
						<div
							className="absolute inset-0 bg-palette-pink/10 rounded-full opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300"
						/>
					</motion.div>

					{/* Name and Title */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="mb-4"
					>
						<h1
							className="font-bold text-3xl md:text-5xl lg:text-6xl mb-2 bg-clip-text text-transparent 
                         bg-gradient-to-r from-white to-palette-pink"
						>
							William Salas Bolaño
						</h1>
						<p className="text-gray-300 text-xl md:text-2xl font-semibold">
							Software Engineer
						</p>
					</motion.div>

					{/* Location and Experience */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 mb-6"
					>
						<div className="flex items-center gap-2 text-gray-400">
							<MapPin className="w-4 h-4" />
							<span className="font-medium">Barranquilla, Colombia</span>
						</div>
						<div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
						<div className="text-palette-pink font-semibold">
							3+ Years of Experience
						</div>
					</motion.div>

					{/* Social Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="flex gap-4 mb-8"
					>
						{socialLinks.map(({ icon: Icon, href, label }) => (
							<motion.a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className="p-3 rounded-full bg-gray-800/50 hover:bg-palette-pink/20 
                           transition-colors duration-300 border border-gray-700/50"
							>
								<Icon className="w-5 h-5" />
								<span className="sr-only">{label}</span>
							</motion.a>
						))}
					</motion.div>
				</div>

				{/* Description */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="text-center mb-8"
				>
					<p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
						Experienced front-end developer with a unique background in
						architecture and graphic design. Passionate about creating intuitive
						user experiences and scalable applications. Collaborative team
						player with experience in both local and international projects.
					</p>
				</motion.div>

				{/* Skills Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="mb-8"
				>
					<h3 className="text-center text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">
						Technologies & Skills
					</h3>
					<div className="flex flex-wrap justify-center gap-3">
						{skills.map((skill, index) => (
							<motion.span
								key={skill}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.7 + index * 0.1 }}
								className="px-4 py-2 bg-palette-pink/20 text-palette-pink rounded-full 
                           text-sm font-medium hover:bg-palette-pink/30 transition-colors
                           border border-palette-pink/20"
							>
								{skill}
							</motion.span>
						))}
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
					className="flex flex-col sm:flex-row justify-center gap-4"
				>
					<Button variant="green" size="lg" asChild>
						<a href="mailto:wa.salas1905@hotmail.com">
							<MailPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
							Get in Touch
						</a>
					</Button>
					<Button
						className=" bg-[#495533]/40"
						variant="ghost"
						size="lg"
						asChild
					>
						<a href="#projects">
							<Code2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
							View Projects
						</a>
					</Button>
				</motion.div>
			</motion.div>
		</div>
	);
}

export default ProfileCard;
