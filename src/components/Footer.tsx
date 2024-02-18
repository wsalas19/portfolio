import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
	return (
		<footer className='mt-auto flex justify-center w-full px-32 py-2 bg-gray-900 text-white'>
			<div className='flex flex-row gap-5 items-center'>
				<a className='hover:text-palette-lime' href='https://github.com/wsalas19'>
					<Github className=' w-8 h-8 mr-2' />
				</a>
				<a className='hover:text-palette-lime' href='https://www.linkedin.com/in/williamsalasb/'>
					<Linkedin className=' w-8 h-8 mr-2' />
				</a>
				<a className='hover:text-palette-lime' href='https://twitter.com/wsalas1905'>
					<Twitter className=' w-8 h-8 mr-2' />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
