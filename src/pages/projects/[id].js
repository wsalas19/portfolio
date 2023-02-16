import { NEXT_URL } from "@/config/config";
import {
	Box,
	Grid,
	GridItem,
	Heading,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function ProjectDetails({ project }) {
	const router = useRouter();
	const { id } = router.query;
	const { image, name, url, description, technologies } = project;
	return (
		<>
			<Box p={"20px"} w={"100%"} h={"93.6vh"} bg={"#323232"}>
				<Grid
					gridTemplateColumns="repeat(4,1fr)"
					gridTemplateRows="repeat(4,1fr)"
					gridTemplateAreas={
						'"img img img side" "img img img side" "img img img side" "tech tech tech side"'
					}
					rowGap={"5"}
					columnGap={"5"}
					w={"100%"}
					h={"90vh"}
					margin={"auto"}
				>
					<GridItem overflow={"hidden"} borderRadius={"6"} gridArea={"img"}>
						<Image objectFit={"contain"} src={image} alt="project preview" />
					</GridItem>
					<GridItem p={6} borderRadius={"6"} bg={"yellow"} gridArea={"side"}>
						<VStack spacing={"5"}>
							<Heading size={"lg"}>{name}</Heading>
							<Text>{description}</Text>
						</VStack>
					</GridItem>
					<GridItem borderRadius={"6"} bg={"green"} gridArea={"tech"}>
						TECH
					</GridItem>
				</Grid>
			</Box>
		</>
	);
}

export async function getServerSideProps({ params }) {
	const id = params.id;
	const response = await fetch(`${NEXT_URL}/projects/${id}`);

	const data = await response.json();

	return { props: { project: data } };
}
