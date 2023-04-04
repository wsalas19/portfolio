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
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
/* import cvEng from "../../public/assets/CV-ENG-WSALAS.pdf"; */

function Nav() {
	return (
		<>
			<Flex w={"100%"} h={"60px"} bg={"#1E1E1E"}>
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
							<Link href={"/#aboutme"}>About</Link>
						</Text>
						<Text color={"white"}>
							<a href={"/#projects"}>Projects</a>
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

					{/* <Button colorScheme={"green"} variant={"outline"}>
						<a
							href="https://drive.google.com/file/d/1zOdpnJkIiTwedJ-Tm9le9VH5n01aA8cO/view?usp=sharing"
							download
							target="_blank"
							rel="noreferrer"
						>
							Download CV
						</a>
					</Button> */}
				</Flex>
			</Flex>
		</>
	);
}

export default Nav;
