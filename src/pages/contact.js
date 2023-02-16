import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";

export default function Contact() {
	return (
		<Box
			flexDirection={"column"}
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			h={"90vh"}
			className={"contact"}
		>
			<Heading>Under Construction</Heading>
			<Image
				w={"11"}
				src="https://www.pngmart.com/files/7/Construction-Sign-PNG-Free-Download.png"
				alt={"construction sign"}
			/>
		</Box>
	);
}
