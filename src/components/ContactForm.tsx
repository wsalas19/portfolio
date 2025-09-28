"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import {
	Loader2,
	Send,
	Mail,
	User,
	MessageSquare,
	FileText,
} from "lucide-react";
import { motion } from "framer-motion";

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

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section
			id="contact"
			className="py-20 min-h-screen flex items-center justify-center global-p mx-5 md:m-0"
		>
			<div className="w-full max-w-6xl">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2
						className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent 
                     bg-gradient-to-r from-white to-palette-pink"
					>
						Let&apos;s Work Together
					</h2>
					<p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
						Have a project in mind or just want to chat? I&apos;d love to hear
						from you. Drop me a message and I&apos;ll get back to you as soon as
						possible.
					</p>
				</motion.div>

				{/* Single Unified Card */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className=" rounded-2xl border border-gray-800/50 shadow-2xl overflow-hidden"
				>
					<div className="grid lg:grid-cols-2">
						{/* Left Section - Contact Info */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="p-8 lg:p-12 bg-gradient-to-br bg-palette-alt from-palette-pink/5 to-transparent 
                         border-r border-gray-800/50 lg:border-r lg:border-b-0 border-b"
						>
							<h3 className="text-2xl font-bold mb-6 text-white">
								Get in Touch
							</h3>

							<div className="space-y-6 mb-8">
								<div className="flex items-center gap-4">
									<div className="p-3 bg-palette-pink/20 rounded-full">
										<Mail className="w-6 h-6 text-palette-pink" />
									</div>
									<div>
										<p className="text-gray-400 text-sm">Email</p>
										<p className="text-white font-medium">
											wa.salas1905@hotmail.com
										</p>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<div className="p-3 bg-palette-pink/20 rounded-full">
										<MessageSquare className="w-6 h-6 text-palette-pink" />
									</div>
									<div>
										<p className="text-gray-400 text-sm">Response Time</p>
										<p className="text-white font-medium">
											Usually within 24 hours
										</p>
									</div>
								</div>
							</div>

							<div
								className="p-6 bg-gradient-to-br from-palette-pink/10 to-transparent 
                          rounded-xl border border-palette-pink/20"
							>
								<h4 className="text-white font-semibold mb-2">
									Let&apos;s Build Something Amazing
								</h4>
								<p className="text-gray-300 text-sm leading-relaxed">
									Whether it&apos;s a web application, mobile app, or just a
									conversation about technology, I&apos;m always excited to
									collaborate on new projects.
								</p>
							</div>
						</motion.div>

						{/* Right Section - Contact Form */}
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="p-8 lg:p-12"
						>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Name and Email Row */}
								<div className="grid md:grid-cols-2 gap-6">
									<motion.div variants={itemVariants}>
										<Label
											htmlFor="name"
											className="flex items-center gap-2 text-gray-300 mb-2 font-bold text-base"
										>
											<User className="w-4 h-4" />
											Name
										</Label>
										<Input
											id="name"
											placeholder="John Doe"
											className="bg-gray-800/50 border-gray-700 focus:border-palette-pink 
                                     transition-colors h-12 text-white placeholder:text-gray-500"
											{...form.register("name")}
											aria-invalid={!!errors.name}
										/>
										{errors.name && (
											<p className="text-red-400 text-sm mt-2">
												{errors.name.message}
											</p>
										)}
									</motion.div>

									<motion.div variants={itemVariants}>
										<Label
											htmlFor="email"
											className="flex items-center gap-2 text-gray-300 mb-2 font-bold text-base"
										>
											<Mail className="w-4 h-4" />
											Email
										</Label>
										<Input
											id="email"
											placeholder="john@example.com"
											type="email"
											className="bg-gray-800/50 border-gray-700 focus:border-palette-pink 
                                     transition-colors h-12 text-white placeholder:text-gray-500"
											{...form.register("email")}
											aria-invalid={!!errors.email}
										/>
										{errors.email && (
											<p className="text-red-400 text-sm mt-2">
												{errors.email.message}
											</p>
										)}
									</motion.div>
								</div>

								{/* Subject */}
								<motion.div variants={itemVariants}>
									<Label
										htmlFor="title"
										className="flex items-center gap-2 text-gray-300 mb-2 font-bold text-base"
									>
										<FileText className="w-4 h-4" />
										Subject
									</Label>
									<Input
										id="title"
										placeholder="Let's discuss a project"
										className="bg-gray-800/50 border-gray-700 focus:border-palette-pink 
                                 transition-colors h-12 text-white placeholder:text-gray-500"
										{...form.register("title")}
										aria-invalid={!!errors.title}
									/>
									{errors.title && (
										<p className="text-red-400 text-sm mt-2">
											{errors.title.message}
										</p>
									)}
								</motion.div>

								{/* Message */}
								<motion.div variants={itemVariants}>
									<Label
										htmlFor="message"
										className="flex items-center gap-2 text-gray-300 mb-2 font-bold text-base"
									>
										<MessageSquare className="w-4 h-4" />
										Message
									</Label>
									<Textarea
										id="message"
										placeholder="Tell me about your project, ideas, or just say hello!"
										className="bg-gray-800/50 border-gray-700 focus:border-palette-pink 
                                 transition-colors min-h-[120px] text-white placeholder:text-gray-500 
                                 resize-none"
										{...form.register("message")}
										aria-invalid={!!errors.message}
									/>
									{errors.message && (
										<p className="text-red-400 text-sm mt-2">
											{errors.message.message}
										</p>
									)}
								</motion.div>

								{/* Submit Button */}
								<motion.div variants={itemVariants}>
									<Button
										variant={"green"}
										className="w-full"
										type="submit"
										/* className="w-full h-12 font-semibold text-white bg-gradient-to-r 
                                 from-palette-pink to-palette-pink/80 hover:from-palette-pink/90 
                                 hover:to-palette-pink/70 transition-all duration-300 
                                 transform hover:scale-[1.02] disabled:opacity-70 
                                 disabled:cursor-not-allowed disabled:transform-none" */
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<Loader2 className="mr-2 h-5 w-5 animate-spin" />
												Sending Message...
											</>
										) : (
											<>
												<Send className="mr-2 h-5 w-5" />
												Send Message
											</>
										)}
									</Button>
								</motion.div>
							</form>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default ContactForm;
