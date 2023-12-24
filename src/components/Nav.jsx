import {
	Box,
	Flex,
	HStack,
	Button,
	Text,
	Link,
	Menu,
	MenuList,
	MenuItem,
	Stack,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Heading,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useWindowSize } from "@/hooks/useWindowSize";

const links = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Contact",
		path: "/contact",
	},
];

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { size } = useWindowSize();
	// Main structure
	return (
		<Box px={4} bg={"#1E1E1E"}>
			<Flex h={16} alignItems='center' justifyContent='space-between' mx='auto'>
				<Flex>
					<Heading color={"white"}>{">MyPortfolio"}</Heading>

					{size.width > 600 ? (
						<HStack spacing={8}>
							<HStack as='nav' pl={4} pt={2} spacing={6} d={{ base: "none", md: "flex" }}>
								{links.map((link, index) => (
									<NavLink key={index} {...link} onClose={onClose} />
								))}

								<Menu autoSelect={false} isLazy>
									{({ isOpen, onClose }) => (
										<>
											<MenuList zIndex={5} border='none'>
												{links.map((link, index) => (
													<MenuLink
														key={index}
														name={link.name}
														path={link.path}
														onClose={onClose}
													/>
												))}
											</MenuList>
										</>
									)}
								</Menu>
							</HStack>
						</HStack>
					) : null}
				</Flex>

				{size.width > 600 ? <DownloadCVButton /> : null}

				{size.width < 600 ? (
					<IconButton
						variant='outline'
						colorScheme='whiteAlpha'
						size='md'
						icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
						aria-label='Open Menu'
						d={{ base: "inherit", md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
				) : null}
			</Flex>

			{/* Mobile Screen Links */}
			{isOpen ? (
				<Box pb={4} d={{ base: "inherit", md: "none" }}>
					<Stack as='nav' spacing={2}>
						{links.map((link, index) => (
							<NavLink key={index} {...link} onClose={onClose} />
						))}
						<DownloadCVButton />
					</Stack>
				</Box>
			) : null}
		</Box>
	);
}

const DownloadCVButton = () => {
	return (
		<Button
			variant={"outline"}
			colorScheme={"whiteAlpha"}
			size='md'
			rounded='md'
			d={{ base: "none", md: "block" }}
			as={"a"}
			href={"https://drive.google.com/file/d/1zOdpnJkIiTwedJ-Tm9le9VH5n01aA8cO/view?usp=sharing"}
		>
			Download CV
		</Button>
	);
};

// NavLink Component

const NavLink = ({ name, path, onClose }) => {
	return (
		<Link
			href={path}
			color={"whiteAlpha.500"}
			_hover={{
				textDecoration: "none",
				color: useColorModeValue("orange.300", "orange.200"),
			}}
			onClick={() => onClose()}
		>
			{name}
		</Link>
	);
};

// Dropdown MenuLink Component

const MenuLink = ({ name, path, onClose }) => {
	return (
		<Link href={path} onClick={() => onClose()}>
			<MenuItem _hover={{ color: "orange.400", bg: useColorModeValue("gray.200", "gray.700") }}>
				<Text>{name}</Text>
			</MenuItem>
		</Link>
	);
};
