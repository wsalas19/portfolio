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
import { CgDetailsMore } from "react-icons/cg";

function ProjectCard({ name, image, description, url, technologies, id }) {
	return (
		<>
			<Flex
				border={" solid red 1px"}
				flexDirection={"column"}
				w={"400px"}
				h={"320px"}
				borderRadius={"10px"}
				bg={"#212121"}
				overflow={"hidden"}
			>
				<Box className="projectImage" w={"400px"} h={"200px"}>
					<Image src={image} alt={"project preview"} objectFit={"contain"} />
				</Box>
				<VStack p={5}>
					<Heading alignSelf={"flex-start"} size={"lg"} color={"white"}>
						{name}
					</Heading>
				</VStack>
				<Flex flexDirection={"row"} justifyContent={"space-between"} px={5}>
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

					<Link
						display={"flex"}
						alignItems={"center"}
						gap={1}
						as={NextLink}
						color={"white"}
						href={`/projects/${id}`}
					>
						see details <CgDetailsMore />
					</Link>
				</Flex>
			</Flex>
		</>
	);
}

export default ProjectCard;

/* {
	projects.map((p) => {
		return (
			<ProjectCard
				name={p.name}
				description={p.description}
				image={p.image}
				url={p.url}
				technologies={p.technologies}
				key={Math.random().toString(36).substr(2)}
			/>
		);
	});
} */

{
	/* <Flex wrap={"wrap"} w={"50%"}>
						{technologies.map((t) => {
							return <Tag key={Math.random().toString(36).substr(2)}>{t}</Tag>;
						})}
					</Flex> */
}
