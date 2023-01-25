import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
/* import cvEng from "../../public/assets/CV-ENG-WSALAS.pdf"; */

function Nav() {
	const handleDownload = () => {};

	return (
		<>
			<Flex w={"100%"} h={"60px"} bg={"#1E1E1E"}>
				<Flex alignItems={"center"} w={"75%"}>
					<Heading color={"white"} p={"5"} size={"lg"}>
						<Link href={"/"}>myPortfolio</Link>
					</Heading>
					<Flex ml={"10"} gap={8} justifyContent={"space-between"}>
						<Text color={"white"}>
							<Link href={"/aboutme"}>About</Link>
						</Text>
						<Text color={"white"}>
							<Link href={"/projects"}>Projects</Link>
						</Text>
						<Text color={"white"}>
							<Link href={"/contact"}>Contact</Link>
						</Text>
					</Flex>
				</Flex>
				<Flex
					alignItems={"center"}
					justifyContent={"flex-end"}
					flexDirection={"row"}
					w={"25%"}
					pr={"5"}
				>
					<Button colorScheme={"green"} variant={"outline"}>
						<a
							href="https://drive.google.com/file/d/1zOdpnJkIiTwedJ-Tm9le9VH5n01aA8cO/view?usp=sharing"
							download
							target="_blank"
							rel="noreferrer"
						>
							Download CV
						</a>
					</Button>
				</Flex>
			</Flex>
		</>
	);
}

export default Nav;
