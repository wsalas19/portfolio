import { Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import { SiNextdotjs, SiJavascript } from "react-icons/si";
import { FaSass, FaReact, FaHeart } from "react-icons/fa";

function Footer() {
	return (
		<Flex
			className="footer"
			h={"50px"}
			w={"100%"}
			bg={"#323232"}
			flexDirection={"row"}
			p={5}
			justifyContent={"space-between"}
		>
			<Flex
				className="socials"
				gap={"5"}
				alignItems={"center"}
				flexDirection={"row"}
			>
				<Text fontWeight={"medium"}>{">mySocials:"}</Text>
				<Link
					isexternal="true"
					className="linkedin"
					href="https://www.linkedin.com/in/williamsalasb/"
				>
					<BsLinkedin />
				</Link>
				<Link
					isexternal="true"
					className="github"
					href="https://github.com/wsalas19"
				>
					<BsGithub />
				</Link>
				<Link
					isexternal="true"
					className="twitter"
					href="https://twitter.com/wsalas1905"
				>
					<BsTwitter />
				</Link>
			</Flex>

			<Flex gap={3} alignItems={"center"} flexDirection={"row"}>
				<Text color={"white"} fontWeight={"medium"}>
					Made with
				</Text>
				<SiNextdotjs color={"white"} /> <FaSass color="#dc3e74" />{" "}
				<FaReact color="#5ed3f3" /> <SiJavascript color="yellow" />
				<Text color={"white"} fontWeight={"medium"}>
					&
				</Text>
				<FaHeart color="red" />
			</Flex>

			<Flex gap={3} alignItems={"center"} flexDirection={"row"}>
				<Text color={"white"} fontWeight={"medium"}>
					Donate
				</Text>
				<Link
					isexternal="true"
					href="https://ihh.org.tr/en/donate/turkey-emergency?gclid=Cj0KCQiAorKfBhC0ARIsAHDzsltCZcK7aSSBcvCzV_4uP_L46xyxT5ft9t9a2CUwpiOmU5PZ2m5TJzUaAsJ3EALw_wcB"
				>
					<Image
						width={6}
						src={
							"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/220px-Flag_of_Turkey.svg.png"
						}
						alt={"turkey flag"}
					/>
				</Link>

				<Link href="https://war.ukraine.ua/donate/" isexternal="true">
					<Image
						width={6}
						src={
							"https://cdn.britannica.com/14/4814-004-7C0DF1BB/Flag-Ukraine.jpg"
						}
						alt={"ukraine flag"}
					/>
				</Link>
			</Flex>
		</Flex>
	);
}

export default Footer;
