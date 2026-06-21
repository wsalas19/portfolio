import "./globals.css";

import NavBar from "@/components/NavBar";
import ScrollButton from "@/components/ScrollButton";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { Carme } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const carme = Carme({
	weight: "400",
	style: "normal",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={carme.className}>
			<body>
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
