import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getLegalDoc } from "@/lib/legal/content";

const doc = getLegalDoc("privacidad");

export const metadata: Metadata = {
	title: doc?.title,
	description: doc?.excerpt,
	alternates: { canonical: "/privacidad" },
	robots: { index: true, follow: true },
	openGraph: {
		title: doc?.title,
		description: doc?.excerpt,
		url: "https://wsalasdev.site/privacidad",
		siteName: "William Salas",
		locale: "es_CO",
		type: "website",
	},
};

export default function PrivacidadPage() {
	if (!doc) notFound();
	return <LegalDocument doc={doc} />;
}
