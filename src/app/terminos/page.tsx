import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getLegalDoc } from "@/lib/legal/content";

const doc = getLegalDoc("terminos");

export const metadata: Metadata = {
	title: doc?.title,
	description: doc?.excerpt,
	alternates: { canonical: "/terminos" },
	robots: { index: true, follow: true },
	openGraph: {
		title: doc?.title,
		description: doc?.excerpt,
		url: "https://wsalasdev.site/terminos",
		siteName: "William Salas",
		locale: "es_CO",
		type: "website",
	},
};

export default function TerminosPage() {
	if (!doc) notFound();
	return <LegalDocument doc={doc} />;
}
