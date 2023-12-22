import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Image,
	Input,
	Textarea,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
export default function Contact() {
	const toast = useToast();
	const [error, setError] = useState({});
	const [buttonControl, setButtonControl] = useState({
		sent: false,
		name: "Send",
	});
	const [form, setForm] = useState({
		title: "",
		body: "",
	});

	const hanldeInputChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
		validator({ ...form, [name]: value });
	};
	const validator = (formState) => {
		let errors = {};

		if (formState.title.trim() === "") {
			errors.title = "Title is required";
		}

		if (formState.body.trim() === "") {
			errors.body = "Body is required";
		} else {
			const regexPattern = /^[a-zA-Z]{10,}$/;

			if (regexPattern.test(formState.body)) {
				errors.body = "Body must contain at least one meaningful word";
			}
			if (regexPattern.test(formState.title)) {
				errors.title = "Title must contain at least one meaningful word";
			}
		}
		setError(errors);
		return;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setButtonControl({ sent: true, name: "Sending..." });
		try {
			const response = await emailjs.send(
				"service_aeit20k",
				"template_q0h47ua",
				form,
				"tR3_o_blEZwFNXqUz",
			);
			toast({
				title: "Your message was ssuccessfully sent",
				status: "success",
				isClosable: true,
			});
			setButtonControl({ sent: false, name: "Send" });
			setForm({ title: "", body: "" });
		} catch (error) {
			toast({
				title: "There was an error, please try again",
				status: "error",
				isClosable: true,
			});
		} finally {
			setButtonControl({ sent: false, name: "Send" });
		}
	};
	return (
		<Box flexDirection={"row"} display={"flex"} h={"89svh"} className={"contact"}>
			<Flex
				p={5}
				flexDir={"column"}
				justifyContent={"space-between"}
				bg={"#181818"}
				w={"40%"}
				height={"full"}
			>
				<Image
					className='formImage'
					src='https://i.ibb.co/xXrSQS7/haze-hands-typing-on-the-keyboard.png'
					alt='hands-artwork'
					w={"300px"}
					alignSelf={"flex-end"}
				/>
				<Image
					className='formImage'
					src='https://i.ibb.co/sHFVHBX/haze-programmer-writing-code-on-laptop-1.png'
					alt='hands-computer artwork'
					w={"300px"}
				/>
			</Flex>
			<Flex gap={5} flexDir={"column"} p={"72px"} w={"60%"} height={"full"}>
				<Heading>Get in touch with me!</Heading>
				<FormControl isInvalid={error && error.title}>
					<FormLabel color={"gray.600"} fontWeight={"semibold"}>
						Title
					</FormLabel>
					<Input
						onChange={hanldeInputChange}
						name='title'
						variant={"filled"}
						type='text'
						placeholder='title goes here...'
						value={form.title}
					/>
					<FormErrorMessage>{error.title}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={error && error.body}>
					<FormLabel color={"gray.600"} fontWeight={"semibold"}>
						Body
					</FormLabel>
					<Textarea
						onChange={hanldeInputChange}
						name='body'
						className='textAreaInput'
						variant={"filled"}
						type='text'
						placeholder='message goes here...'
						h={"200px"}
						value={form.body}
					/>
					<FormErrorMessage>{error.body}</FormErrorMessage>
				</FormControl>
				<Button
					isDisabled={Object.keys(error).length !== 0 || buttonControl.sent}
					variant={"outline"}
					colorScheme='orange'
					w={"fit-content"}
					onClick={handleSubmit}
				>
					{buttonControl.name}
				</Button>
			</Flex>
		</Box>
	);
}
