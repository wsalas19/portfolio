import React from "react";
import DownloadResume from "./DownloadResume";

function NavBar() {
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
			className='w-full flex flex-row justify-between items-center global-p py-2 gray-white-scheme z-10 shadow-xl px-6'
		>
			<div className='flex  w-[50%] gap-5 items-center'>
				<h1 className=' font-bold  text-3xl mr-5'>portfolio.</h1>
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
