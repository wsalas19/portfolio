import { Flex, Heading, Link, Tag, Image, Box, HStack } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

function ProjectCard({ name, image, id }) {
	return (
		<>
			<Flex
				key={id}
				className='projectCards'
				flexDirection={"column"}
				w={"12%"}
				borderRadius={"10px"}
				bg={"#212121"}
				overflow={"hidden"}
			>
				<Link className='cardLink' as={NextLink} href={`/projects/${id}`}>
					<Box overflow={"hidden"} className='projectImage'>
						<Image src={image} alt={"project preview"} objectFit={"contain"} />
					</Box>
					<HStack justifyContent={"space-between"} p={3}>
						<Heading alignSelf={"flex-start"} size={"sm"} color={"white"}>
							{name}
						</Heading>
						<Tag _hover={{ cursor: "pointer" }} size={"sm"}>
							Learn More
						</Tag>
					</HStack>
				</Link>
			</Flex>
		</>
	);
}

export default ProjectCard;
