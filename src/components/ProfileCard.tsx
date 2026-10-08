"use client";
import React from "react";
import Image from "next/image";
import { CONTACT_EMAIL, SOCIAL_LINKS, imgSize } from "@/lib/constants";
import {
	MailPlus,
	Github,
	Linkedin,
	Code2,
	MapPin,
	Briefcase,
} from "lucide-react";
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
	{ icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
	{ icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
	{ icon: Briefcase, href: SOCIAL_LINKS.upwork, label: "Upwork" },
];

// Las entradas son `rise`/`pop` (globals.css), no framer-motion: así el HTML del
// servidor sale visible y el LCP no espera a la hidratación.
function ProfileCard() {
	const today = new Date();
	const year = today.getFullYear();
	return (
		<div
			id="about"
			className="flex items-center justify-center py-20 md:py-32 min-h-screen global-p"
		>
			<div className="glass rise p-10 md:p-16 mx-5 md:m-0 rounded-2xl w-full md:max-w-[57%] shadow-2xl glow-lime-hover transition-[background-color,box-shadow,border-color] duration-300">
				{/* Header Section - Centered */}
				<div className="flex flex-col items-center text-center mb-8">
					{/* Profile Image */}
					<div className="relative group mb-6 pop">
						<Image
							className="rounded-full shadow-primary shadow-lg aspect-square md:w-40 md:h-40 object-cover
	                         transition-transform duration-300 group-hover:scale-[1.02]"
							src={"/images/profile-img.png"}
							alt="William Salas - Software Engineer"
							width={imgSize}
							height={imgSize}
							sizes="(min-width: 768px) 160px, 300px"
							priority
						/>
						<div
							className="absolute inset-0 bg-palette-pink/10 rounded-full opacity-0
	                          group-hover:opacity-100 transition-opacity duration-300"
						/>
					</div>

					{/* Name and Title */}
					<div className="mb-6 rise [--rise-delay:200ms]">
						<h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-3 text-gradient-primary text-balance">
							William Salas Bolaño
						</h1>
						<p className="font-display text-gradient-lime text-xl md:text-2xl lg:text-3xl font-semibold">
							Software Engineer crafting exceptional digital experiences
						</p>
					</div>

					{/* Location and Experience */}
					<div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 mb-6 rise [--rise-delay:300ms]">
						<div className="flex items-center gap-2 ">
							<MapPin className="w-4 h-4 text-palette-lime" />
							<span className="font-semibold uppercase">
								Barranquilla, Colombia
							</span>
						</div>
						<div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
						<div className="text-gradient-lime font-semibold uppercase">
							+{year - 2022} Years of Experience
						</div>
					</div>

					{/* Social Links */}
					<div className="flex gap-4 mb-8 rise [--rise-delay:400ms]">
						{socialLinks.map(({ icon: Icon, href, label }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 rounded-full glass-subtle hover:bg-palette-pink/20
	                           transition-[background-color,transform] duration-300 border border-white/10
	                           glow-pink-hover hover:scale-110 active:scale-95"
							>
								<Icon className="w-5 h-5 text-gray-300" />
								<span className="sr-only">{label}</span>
							</a>
						))}
					</div>
				</div>

				{/* Description */}
				<div className="text-center mb-8 rise [--rise-delay:500ms]">
					<p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
						Experienced front-end developer with a unique background in
						architecture and graphic design. Passionate about creating intuitive
						user experiences and scalable applications. Collaborative team
						player with experience in both local and international projects.
					</p>
				</div>

				{/* Skills Section */}
				<div className="mb-8 rise [--rise-delay:600ms]">
					<h3 className="text-center font-semibold mb-4 text-sm uppercase tracking-wider">
						Technologies & Skills
					</h3>
					<div className="flex flex-wrap justify-center gap-3">
						{skills.map((skill, index) => (
							<span
								key={skill}
								// El retardo crece por píldora, así que va inline y no en una
								// clase arbitraria por índice.
								style={
									{ "--rise-delay": `${700 + index * 100}ms` } as React.CSSProperties
								}
								className="px-4 py-2 glass-pink text-palette-pink rounded-full
	                           text-sm font-medium hover:bg-palette-pink/30 transition-[background-color] duration-300
	                           border border-palette-pink/20 glow-pink-hover pop"
							>
								{skill}
							</span>
						))}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row justify-center gap-4 rise [--rise-delay:800ms]">
					<Button
						variant="green"
						size="lg"
						asChild
						className="glow-lime-hover w-full md:w-fit"
					>
						<a href={`mailto:${CONTACT_EMAIL}`}>
							<MailPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
							Get in Touch
						</a>
					</Button>
					<Button
						className="bg-[#495533]/40 font-semibold w-full md:w-fit justify-center"
						variant="ghost"
						size="lg"
						asChild
					>
						<a href="#projects">
							<Code2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
							View Projects
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;
