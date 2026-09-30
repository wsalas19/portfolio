import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-credito-mono",
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
		<div className={`${mono.variable} contents`}>{children}</div>
	);
}
