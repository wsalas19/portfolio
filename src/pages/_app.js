import "@/styles/globals.scss";
import Nav from "../components/Nav";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Nav />

			<Component {...pageProps} />

			<Footer />
		</ChakraProvider>
	);
}
