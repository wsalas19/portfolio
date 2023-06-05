import Head from "next/head";
import {
	Button,
	Flex,
	Heading,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Nav() {
	return (
		<>
			<Head>
				<title>Contact</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Flex w={"100%"} bg={"#1E1E1E"}>
				<Flex alignItems={"center"} w={"75%"}>
					<Heading color={"white"} p={"5"} size={"lg"}>
						<Link href={"/"}>{">myPortfolio"}</Link>
					</Heading>
					<Flex
						className="navLinks"
						ml={"10"}
						gap={8}
						justifyContent={"space-between"}
					>
						<Text color={"white"}>
							<Link href={"/"}>Home</Link>
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
					<Menu>
						<MenuButton colorScheme={"orange"} variant={"outline"} as={Button}>
							Download CV
						</MenuButton>
						<MenuList>
							<MenuItem
								as={"a"}
								href={
									"https://drive.google.com/file/d/1zOdpnJkIiTwedJ-Tm9le9VH5n01aA8cO/view?usp=sharing"
								}
								isexternal="true"
								minH="48px"
							>
								<Image
									mr={1}
									boxSize={"1.5rem"}
									src="https://cdn-icons-png.flaticon.com/512/555/555526.png"
									alt={"flag"}
								/>
								English
							</MenuItem>
							<MenuItem
								as={"a"}
								href={
									"https://drive.google.com/file/d/1fdwW2qLwwYkLoE6k9Df52LO_teZwlDKr/view?usp=sharing"
								}
								isexternal="true"
								minH="48px"
							>
								<Image
									mr={1}
									boxSize={"1.5rem"}
									src="https://icons.iconarchive.com/icons/wikipedia/flags/256/ES-Spain-Flag-icon.png"
									alt={"flag"}
								/>
								Spanish
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
		</>
	);
}

export default Nav;
