import React from "react";
import DownloadResume from "./DownloadResume";

async function NavBar() {
	const paths = [
		{
			name: "about",
			path: "#about",
		},
		{
			name: "experience",
			path: "#experience",
		},
		{
			name: "contact",
			path: "#contact",
		},
	];

	return (
		<nav
			id='#nav'
			className='w-full flex flex-row justify-between items-center py-3 gray-white-scheme shadow-xl self-center px-[10%] md:px-[20%] '
		>
			<div className='flex gap-5 items-center'>
				<h1 className=' font-bold text-4xl mr-5'>portfolio.</h1>
				<div className=' hidden md:flex gap-2 items-end'>
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
			<DownloadResume />
		</nav>
	);
}

export default NavBar;
