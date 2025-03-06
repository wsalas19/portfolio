import ProfileCard from "@/components/ProfileCard";
import Experience from "@/components/Experience";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "William Salas | Full Stack Developer",
	description:
		"Experienced web developer specializing in React, TypeScript, and modern web technologies",
	openGraph: {
		title: "William Salas - Portfolio",
		description: "Experienced web developer specializing in React, TypeScript, and modern web technologies",
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
	return (
		<>
			<ProfileCard />
			<Experience />
			<ContactForm />
		</>
	);
}
