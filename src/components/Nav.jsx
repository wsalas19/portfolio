import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
/* import cvEng from "../../public/assets/CV-ENG-WSALAS.pdf"; */

function Nav() {
	const handleDownload = () => {};

	return (
		<>
			<Flex w={"100%"} h={"60px"} bg={"blue.700"}>
				<Flex alignItems={"center"} w={"75%"}>
					<Heading color={"white"} p={"5"} size={"lg"}>
						<Link href={"/"}>myPortfolio</Link>
					</Heading>
				</Flex>
				<Flex
					alignItems={"center"}
					justifyContent={"space-around"}
					flexDirection={"row"}
					w={"25%"}
				>
					<Text color={"white"}>
						<Link href={"/aboutme"}>About</Link>
					</Text>
					<Text color={"white"}>
						<Link href={"/projects"}>Projects</Link>
					</Text>
					<Text color={"white"}>
						<Link href={"/contact"}>Contact</Link>
					</Text>
					<Button colorScheme={"red"} variant={"outline"}>
						Download CV
					</Button>
				</Flex>
			</Flex>
		</>
	);
}

export default Nav;
