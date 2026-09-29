import type { Metadata } from "next";
import { JetBrains_Mono, Source_Serif_4 } from "next/font/google";

const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-credito-mono",
});

const serif = Source_Serif_4({
	subsets: ["latin"],
	variable: "--font-credito-serif",
});

export const metadata: Metadata = {
	title: "Visor de Crédito Hipotecario Colombia — Simulador de Amortización",
	description:
		"Proyección de amortización, seguros y abonos a capital para crédito hipotecario en Colombia. Línea UVR y línea pesos · Ley 546/1999 · Tasas referencia FNA.",
	alternates: { canonical: "/visor-credito" },
};

export default function VisorCreditoLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className={`${mono.variable} ${serif.variable} contents`}>
			{children}
		</div>
	);
}
