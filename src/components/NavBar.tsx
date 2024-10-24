import React from "react";
import DownloadResume from "./DownloadResume";
import { Button } from "./ui/button";
import { Video } from "lucide-react";
import { paths } from "@/lib/constants";

async function NavBar() {
	return (
		<nav
			id='#nav'
			className='w-full flex flex-row justify-between items-center py-3 gray-white-scheme shadow-xl self-center px-[10%] md:px-[20%] '
		>
			<div className='flex gap-5 items-center'>
				<h1 className=' font-bold text-4xl mr-5'>portfolio.</h1>
				<div className=' hidden lg:flex gap-2 items-end'>
					{paths.map((path) => {
						return (
							<a
								className=' hover:text-palette-pink font-semibold'
								key={path.name}
								href={path.path}
							>
								{path.name}
							</a>
						);
					})}
				</div>
			</div>
			<div className='flex gap-5 justify-center items-center'>
				<DownloadResume />
				<a
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
				</a>
			</div>
		</nav>
	);
}

export default NavBar;
