import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";

// 2. Add your color mode config
const config = {
	initialColorMode: "light",
	fonts: {
		heading: "Monserrat, sans-serif",
	},
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
