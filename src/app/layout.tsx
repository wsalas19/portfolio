import "./globals.css";

import NavBar from "@/components/NavBar";
import ScrollButton from "@/components/ScrollButton";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
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
			</body>
		</html>
	);
}
