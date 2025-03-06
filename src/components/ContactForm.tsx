"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email"),
	title: z.string().min(3, "Subject must be at least 3 characters"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

function ContactForm() {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			title: "",
			message: "",
		},
	});

	const {
		formState: { isSubmitting, errors },
	} = form;

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await fetch("/api/email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Failed to send email");
			}

			form.reset();
			toast({
				title: `Thanks ${values.name}!`,
				description: "I'll get back to you soon.",
				variant: "success",
				duration: 2500,
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
			console.error("Error sending email:", error);
		}
	}

	return (
		<section id='contact' className='gray-white-scheme mt-4 md:global-p'>
			<h2 className='text-2xl font-bold text-center mb-10'>GET IN TOUCH</h2>
			<div className='max-w-md mx-auto px-3 md:px-0'>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							placeholder='Your Name'
							{...form.register("name")}
							aria-invalid={!!errors.name}
						/>
						{errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
					</div>

					<div>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							placeholder='Your Email'
							type='email'
							{...form.register("email")}
							aria-invalid={!!errors.email}
						/>
						{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
					</div>

					<div>
						<Label htmlFor='title'>Subject</Label>
						<Input
							id='title'
							placeholder='Message Subject'
							{...form.register("title")}
							aria-invalid={!!errors.title}
						/>
						{errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>}
					</div>

					<div>
						<Label htmlFor='message'>Message</Label>
						<Textarea
							id='message'
							placeholder='Your Message'
							{...form.register("message")}
							aria-invalid={!!errors.message}
						/>
						{errors.message && (
							<p className='text-red-500 text-sm mt-1'>{errors.message.message}</p>
						)}
					</div>

					<Button type='submit' className='w-full font-semibold' disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Sending...
							</>
						) : (
							"Send Message"
						)}
					</Button>
				</form>
			</div>
		</section>
	);
}

export default ContactForm;
