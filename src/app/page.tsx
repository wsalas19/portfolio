import ProfileCard from "@/components/ProfileCard";
import Experience from "@/components/Experience";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";
import ProjectShowcase from "@/components/ProjectShowcase";

export const metadata: Metadata = {
	title: "William Salas | Full Stack Developer",
	description:
		"Experienced web developer specializing in React, TypeScript, and modern web technologies",
	openGraph: {
		title: "William Salas - Portfolio",
		description:
			"Experienced web developer specializing in React, TypeScript, and modern web technologies",
		images: [
			{
				url: "path-to-og-image",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		creator: "@wsalas1905",
	},
};

export default async function Home() {
	//eslint-disable-next-line
	return (
		<>
			<ProfileCard />
			<Experience />
			<ProjectShowcase />
			<div className="flex flex-col items-center py-5">
				<h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-palette-pink">
					GITHUB CONTRIBUTIONS
				</h3>
				{/*eslint-disable-next-line*/}
				<img
					src="https://ghchart.rshah.org/bef728/wsalas19"
					alt="gh contributions"
					className="w-[80%]"
				/>
			</div>
			<ContactForm />
		</>
	);
}
