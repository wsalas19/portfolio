import {
	Flex,
	Heading,
	VStack,
	Text,
	Link,
	Tag,
	Image,
	Box,
	Button,
	HStack,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { FiExternalLink } from "react-icons/fi";

function ProjectCard({ name, image, url, id }) {
	const cardWidth = "250px";
	return (
		<>
			<Flex
				key={id}
				className="projectCards"
				flexDirection={"column"}
				w={{ base: cardWidth }}
				h={{ base: "150px" }}
				borderRadius={"10px"}
				bg={"#212121"}
				overflow={"hidden"}
			>
				<Link className="cardLink" as={NextLink} href={`/projects/${id}`}>
					<Box
						overflow={"hidden"}
						className="projectImage"
						w={cardWidth}
						h={"100px"}
					>
						<Image src={image} alt={"project preview"} objectFit={"contain"} />
					</Box>
					<HStack justifyContent={"space-between"} p={2}>
						<Heading alignSelf={"flex-start"} size={"sm"} color={"white"}>
							{name}
						</Heading>
						<Tag size={"sm"}>Learn More</Tag>
					</HStack>
				</Link>
			</Flex>
		</>
	);
}

export default ProjectCard;
