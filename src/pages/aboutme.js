import React from "react";
import { Flex, Image } from "@chakra-ui/react";

function AboutMe({ url }) {
	return (
		<>
			<Flex alignContent={"center"} w={"100%"} h={"100%"} bg={"red.200"}>
				<Flex w={"250px"} h={"250px"}>
					<Image src={url} alt="face" />
				</Flex>
				<Flex></Flex>
			</Flex>
		</>
	);
}

export default AboutMe;

export async function getStaticProps() {
	const response = await fetch("http://localhost:3000/api/image");

	const data = await response.json();
	return { props: { ...data } };
}
