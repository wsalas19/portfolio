import { theme } from "../theme";
import "@/styles/globals.css";
import Nav from "../components/Nav";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Nav />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
