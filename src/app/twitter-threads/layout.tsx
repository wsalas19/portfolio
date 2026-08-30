import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "X Thread to Article Converter — Readable Threads in One Click",
	description:
		"Stop screenshotting threads. Paste any X/Twitter thread URL and get a clean, readable article — no signup, results in seconds.",
	alternates: { canonical: "/twitter-threads" },
	openGraph: {
		title: "X Thread to Article Converter",
		description:
			"Paste any X/Twitter thread URL and get a clean, shareable article in seconds. No signup required.",
		type: "website",
		url: "https://wsalasdev.site/twitter-threads",
		siteName: "William Salas",
	},
	twitter: {
		card: "summary_large_image",
		title: "X Thread to Article Converter",
		description:
			"Paste any X/Twitter thread URL and get a clean, shareable article in seconds. No signup required.",
	},
};

const webAppJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: "X Thread to Article Converter",
	url: "https://wsalasdev.site/twitter-threads",
	applicationCategory: "UtilitiesApplication",
	operatingSystem: "Web",
	description:
		"Turn X/Twitter threads into clean, readable articles. No signup required.",
	offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	author: {
		"@type": "Person",
		name: "William Salas",
		url: "https://wsalasdev.site",
	},
};

export default function TwitterThreadsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
			/>
			{children}
		</>
	);
}