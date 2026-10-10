import "./globals.css";

import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollButton from "@/components/ScrollButton";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { Carme, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { env } from "@/lib/env";
import { PROFILE, SOCIAL_LINKS, serviceTracks } from "@/lib/constants";

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

const SITE_URL = "https://www.wsalas.com";

/**
 * Un `@graph` y no dos `<script>`: el `Person` de siempre más el
 * `ProfessionalService` que faltaba. Sin él, el sitio declaraba quién es la
 * persona pero no que hubiera algo contratable — que es justamente lo que la
 * página ahora vende.
 *
 * Las ofertas salen de `serviceTracks`, saltando el track de proceso (no es algo
 * que se contrate): el schema no puede desincronizarse del contenido visible.
 */
const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: "William Salas",
			url: SITE_URL,
			sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
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
		},
		{
			"@type": "ProfessionalService",
			"@id": `${SITE_URL}/#service`,
			name: "William Salas — Software Development & Technical Review",
			url: SITE_URL,
			description:
				"Freelance full-stack product development and technical review: Next.js, React and TypeScript web applications, the APIs behind them, and the architecture decisions before they get expensive to change.",
			areaServed: "Worldwide",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Barranquilla",
				addressCountry: PROFILE.country,
			},
			provider: { "@id": `${SITE_URL}/#person` },
			makesOffer: serviceTracks
				.filter((track) => track.id !== "process")
				.map((track) => ({
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: track.title,
						description: track.description,
					},
				})),
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
				<Footer />
				<Toaster />
				<ScrollButton />
				<Analytics />
			</body>
		</html>
	);
}
