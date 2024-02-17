import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import ScrollButton from "@/components/ScrollButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "William Salas | portfolio.",
	description: "A brief showcase of my work.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='flex flex-col min-h-screen gray-white-scheme'>
				<NavBar />
				{children}
				<Toaster />
				<ScrollButton />
				<Footer />
			</body>
		</html>
	);
}
