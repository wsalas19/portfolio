import Home from "@/components/pages/home";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "William Salas | Full Stack Developer & Software Engineer",
	description:
		"William Salas is a Full Stack Developer and Software Engineer specializing in React, TypeScript, Next.js, and modern web technologies. Explore the portfolio of William Salas featuring projects, experience, and technical expertise.",
	keywords: [
		"William Salas",
		"William",
		"Salas",
		"Full Stack Developer",
		"Software Engineer",
		"React Developer",
		"TypeScript Developer",
		"Next.js Developer",
		"Web Developer",
		"Frontend Developer",
		"Backend Developer",
		"Portfolio",
		"wsalas",
	],
	authors: [{ name: "William Salas", url: "https://wsalasdev.site" }],
	creator: "William Salas",
	publisher: "William Salas",

	openGraph: {
		title: "William Salas | Full Stack Developer & Software Engineer",
		description:
			"William Salas is a Full Stack Developer and Software Engineer specializing in React, TypeScript, Next.js, and modern web technologies. Explore the portfolio of William Salas featuring projects, experience, and technical expertise.",
		url: "https://wsalasdev.site",
		siteName: "William Salas Portfolio",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "https://wsalasdev.site/og-image.png",
				width: 1200,
				height: 630,
				alt: "William Salas - Full Stack Developer Portfolio",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "William Salas | Full Stack Developer & Software Engineer",
		description:
			"William Salas is a Full Stack Developer and Software Engineer specializing in React, TypeScript, Next.js, and modern web technologies. Explore the portfolio of William Salas featuring projects, experience, and technical expertise.",
		images: ["https://wsalasdev.site/og-image.png"],
		creator: "@wsalas19",
		site: "@wsalas19",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	verification: {
		// Add your verification codes here when you get them from:
		// google: "your-google-verification-code",
		// yandex: "your-yandex-verification-code",
	},
};

export default async function page() {
	return <Home />;
}
