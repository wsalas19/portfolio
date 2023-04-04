import {
	Divider,
	Flex,
	HStack,
	Heading,
	LinkBox,
	LinkOverlay,
	Tag,
	Text,
} from "@chakra-ui/react";
import React from "react";

function NewsCard({ url, title, description, date, publisher }) {
	const formatDay = (timestamp) => {
		const date = new Date(timestamp);

		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		const formattedDate = `${day}/${month}/${year}`;
		return formattedDate;
	};
	return (
		<>
			<LinkBox>
				<LinkOverlay href={url}>
					<Flex px={5} py={2} flexDir={"column"}>
						<Heading mb={2} size={"sm"}>
							{title}
						</Heading>
						<Text
							className="newsSummary"
							whiteSpace={"pre-wrap"}
							fontSize={"sm"}
							fontWeight={"hairline"}
						>
							{description}
						</Text>
						<HStack py={3} justifyContent={"space-between"}>
							<Text fontSize={"sm"}>{formatDay(date)}</Text>
							<Text fontSize={"sm"}>{publisher}</Text>
						</HStack>
						<Divider />
					</Flex>
				</LinkOverlay>
			</LinkBox>
		</>
	);
}

export default NewsCard;
