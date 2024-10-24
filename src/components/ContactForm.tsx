"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import emailjs from "@emailjs/browser";
import { useToast } from "./ui/use-toast";
import { ButtonControl } from "../lib/types/globals";

const formSchema = z.object({
	name: z.string().min(3, "Name is too short").max(30, "Name is too long"),
	title: z.string().min(8, "Title is too short").max(30, "Title is too long"),
	message: z.string().min(20, "Message is too short").max(200, "Message is too long"),
});

function ContactForm() {
	const { toast } = useToast();
	const [buttonControl, setButtonControl] = useState<ButtonControl<"Send" | "Sending...">>({
		sent: false,
		name: "Send",
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			title: "",
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setButtonControl({ sent: true, name: "Sending..." });
		try {
			await emailjs.send("mail_main", "template_q0h47ua", values, "tR3_o_blEZwFNXqUz");
			setButtonControl({ sent: false, name: "Send" });
			form.reset();
			toast({
				title: `Thanks ${values.name}!`,
				description: `I will get back to you as soon as possible.`,
				variant: "success",
			});
		} catch (error) {
			toast({
				title: `Something went wrong`,
				description: `Please try again later.`,
				variant: "destructive",
			});
			console.log(error);
		} finally {
			setButtonControl({ sent: false, name: "Send" });
		}
	}

	return (
		<div className='flex flex-col'>
			<div id='contact' className='global-p flex  gap-2  h-screen items-center justify-center '>
				<Card className=' bg-palette-card text-white border-none self-center w-[90%] lg:w-[70%]'>
					<CardHeader>
						<CardTitle>{"Lets's Talk"}</CardTitle>
						<CardDescription className='text-gray-400 font-semibold'>
							Write a message and submit to send me an email.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form className='space-y-2'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel className=' font-semibold'>Name</FormLabel>
											<FormControl>
												<Input placeholder='John Doe' {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel className=' font-semibold'>Title</FormLabel>
											<FormControl>
												<Input placeholder='Job Offer' {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='message'
									render={({ field }) => (
										<FormItem>
											<FormLabel className=' font-semibold'>Message</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Hey! I hope this email finds you well...'
													className=''
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</CardContent>
					<CardFooter className='flex items-center justify-center'>
						<Button
							disabled={buttonControl.sent}
							onClick={form.handleSubmit(onSubmit)}
							className='w-full font-bold bg-palette-card text-white flex gap-2 hover:bg-palette-lime hover:text-gray-900 hover:border-palette-lime '
							variant={"outline"}
							size={"sm"}
						>
							{buttonControl.name}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

export default ContactForm;
