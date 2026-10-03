import "./globals.css";

import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import ScrollButton from "@/components/ScrollButton";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { Carme, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { env } from "@/lib/env";

// metadataBase hace absolutas las `alternates.canonical` relativas de cada ruta.
export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
};

const carme = Carme({
	weight: "400",
	style: "normal",
	subsets: ["latin"],
	variable: "--font-carme",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "William Salas",
	url: "https://wsalasdev.site",
	sameAs: [
		"https://www.linkedin.com/in/william-salas-19",
		"https://github.com/wsalas19",
	],
	jobTitle: "Full Stack Developer",
	description:
		"William Salas is a Full Stack Developer and Software Engineer specializing in React, TypeScript, Next.js, and modern web technologies.",
	knowsAbout: [
		"React",
		"TypeScript",
		"Next.js",
		"JavaScript",
		"Tailwind CSS",
		"Node.js",
		"PostgreSQL",
		"AWS",
		"GraphQL",
		"Full Stack Development",
		"Web Development",
		"Software Engineering",
	],
	worksFor: [
		{
			"@type": "Organization",
			name: "Everus",
			url: "https://everuscares.com",
		},
	],
	alumniOf: [
		{
			"@type": "EducationalOrganization",
			name: "soyHenry",
		},
		{
			"@type": "EducationalOrganization",
			name: "Universidad Nacional de Colombia",
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${carme.variable} ${inter.variable}`}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="font-sans">
				<SpeedInsights />
				<NavBar />
				{children}
				<Toaster />
				<ScrollButton />
				<Analytics />
			</body>
		</html>
	);
}
