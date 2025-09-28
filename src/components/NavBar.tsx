"use client";
import React, { useState } from "react";
import DownloadResume from "./DownloadResume";
import { Button } from "./ui/button";
import { Video, Menu, X } from "lucide-react";
import { paths } from "@/lib/constants";

function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<nav
				id="#nav"
				className="w-full flex flex-row justify-between items-center py-3 gray-white-scheme self-center px-[10%] md:px-[20%] relative z-20"
			>
				<div className="flex gap-5 items-center">
					<h1 className="font-bold text-4xl">portfolio.</h1>
					<ul className="hidden xl:flex gap-2">
						{paths.map((path) => (
							<li key={path.name}>
								<a
									className="hover:text-palette-pink font-semibold"
									href={path.path}
								>
									{path.name}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="hidden lg:flex gap-5 justify-center items-center">
					<DownloadResume />
					{/* 	<a
						href='https://calendar.app.google/Yi51g1LEbcyJpoBb9'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Button
							className='w-full font-bold bg-palette-lime text-gray-900 hover:bg-palette-olive hover:text-white flex gap-2'
							size={"sm"}
						>
							<Video />
							Book a Meeting
						</Button>
					</a> */}
				</div>

				<button
					className="lg:hidden text-white"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</nav>

			<div
				className={`fixed inset-0 gray-white-scheme z-10 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-y-0" : "-translate-y-full"
				} lg:hidden`}
			>
				<div className="flex flex-col items-center pt-20 px-4 space-y-6">
					{paths.map((path) => (
						<a
							key={path.name}
							href={path.path}
							className="text-xl font-semibold hover:text-palette-pink"
							onClick={() => setIsOpen(false)}
						>
							{path.name}
						</a>
					))}

					<div className="flex flex-col w-full gap-4 pt-6">
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
