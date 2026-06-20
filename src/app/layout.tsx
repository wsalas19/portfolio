import "./globals.css";

import NavBar from "@/components/NavBar";
import ScrollButton from "@/components/ScrollButton";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				{/* GradientBlinds fixed background - pointer-events-auto for mouse tracking */}

				<NavBar />
				{children}
				<Toaster />
				<ScrollButton />
				<Analytics />
			</body>
		</html>
	);
}
