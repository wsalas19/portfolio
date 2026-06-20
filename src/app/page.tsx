import Home from "@/components/pages/home";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "William Salas | Full Stack Developer",
	description:
		"Experienced web developer specializing in React, TypeScript, and modern web technologies",
	openGraph: {
		title: "William Salas - Portfolio",
		description:
			"Experienced web developer specializing in React, TypeScript, and modern web technologies",
	},
};

export default async function page() {
	return <Home />;
}
