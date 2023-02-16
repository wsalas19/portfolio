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
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { FiExternalLink } from "react-icons/fi";

function ProjectCard({ name, image, url, id }) {
	return (
		<>
			<Flex
				key={id}
				className="projectCards"
				flexDirection={"column"}
				w={"400px"}
				h={"320px"}
				borderRadius={"10px"}
				bg={"#212121"}
				overflow={"hidden"}
			>
				<Link className="cardLink" as={NextLink} href={`/projects/${id}`}>
					<Box className="projectImage" w={"400px"} h={"200px"}>
						<Image src={image} alt={"project preview"} objectFit={"contain"} />
					</Box>
					<VStack p={5}>
						<Heading alignSelf={"flex-start"} size={"lg"} color={"white"}>
							{name}
						</Heading>
					</VStack>
				</Link>
				<Flex flexDirection={"row"} justifyContent={"space-between"} px={5}>
					{url.includes(".app") ? (
						<Link
							display={"flex"}
							alignItems={"center"}
							gap={1}
							color={"#7E7E7E"}
							href={url}
							isExternal
						>
							Visit <FiExternalLink />
						</Link>
					) : (
						<Tag colorScheme={"yellow"}>{url}</Tag>
					)}

					<Tag>Learn More</Tag>
				</Flex>
			</Flex>
		</>
	);
}

export default ProjectCard;
