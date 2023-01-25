import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import photo from "../../public/assets/FOTOCV.jpg";

function AboutMe(props) {
	console.log(props);
	return (
		<>
			<Flex alignContent={"center"} w={"100%"} h={"100%"} bg={"red.200"}>
				<Flex>
					<Image src={photo} alt="face" />
				</Flex>
				<Flex></Flex>
			</Flex>
		</>
	);
}

export default AboutMe;

export async function getStaticProps() {
	const repsonse = await fetch("/api/image");
	const data = await response.json();
	console.log(data);
	return { props: { data } };
}
