"use client";
import React, { useState, useEffect } from "react";
import DownloadResume from "./DownloadResume";
import { Button } from "./ui/button";
import { Video, Menu, X } from "lucide-react";
import { paths } from "@/lib/constants";

function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<nav
				id="#nav"
				className={`fixed bottom-6 py-3 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:min-w-[750px] rounded-2xl z-50 transition-all duration-300 ${
					isScrolled
						? "glass-strong shadow-2xl glow-pink-hover "
						: "glass shadow-lg "
				}`}
			>
				<div className="flex flex-row justify-between items-center px-6 md:px-8">
					<div className="flex gap-6 items-center">
						<h1 className="font-bold text-2xl md:text-3xl text-gradient-primary">
							portfolio.
						</h1>
						<ul className="hidden lg:flex gap-6">
							{paths.map((path) => (
								<li key={path.name}>
									<a
										className="font-medium hover:text-palette-lime transition-colors duration-300"
										href={path.path}
									>
										{path.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div className="hidden lg:flex gap-4 justify-center items-center">
						<DownloadResume />
					</div>

					<button
						className="lg:hidden text-white"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				className={`fixed inset-0 glass-strong z-40 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-y-0" : "-translate-y-full"
				} lg:hidden`}
			>
				<div className="flex flex-col items-center pt-32 px-4 space-y-8">
					{paths.map((path) => (
						<a
							key={path.name}
							href={path.path}
							className="text-2xl font-semibold text-gray-300 hover:text-palette-lime transition-colors"
							onClick={() => setIsOpen(false)}
						>
							{path.name}
						</a>
					))}

					<div className="flex flex-col w-full gap-4 pt-6 max-w-xs">
						<DownloadResume />
						<a
							href="https://calendar.app.google/Yi51g1LEbcyJpoBb9"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full"
						>
							<Button
								className="w-full font-bold bg-palette-lime text-gray-900 hover:bg-palette-olive hover:text-white flex gap-2 justify-center"
								size={"sm"}
							>
								<Video />
								Book a Meeting
							</Button>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default NavBar;
