import "./globals.css";

import NavBar from "@/components/NavBar";
import ScrollButton from "@/components/ScrollButton";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { Carme } from "next/font/google";

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
				<NavBar />
				{children}
				<Toaster />
				<ScrollButton />
				<Analytics />
			</body>
		</html>
	);
}
