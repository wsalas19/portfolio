import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
	return (
		<footer className='mt-auto flex justify-center w-full px-32 py-2 bg-gray-900 text-white'>
			<div className='flex flex-row gap-5 items-center'>
				<a
					className='hover:text-palette-lime'
					href='https://github.com/wsalas19'
					aria-label='github-link'
				>
					<Github className=' w-8 h-8 mr-2' aria-label='github-icon' />
				</a>
				<a
					className='hover:text-palette-lime'
					href='https://www.linkedin.com/in/williamsalasb/'
					aria-label='linkedin-link'
				>
					<Linkedin className=' w-8 h-8 mr-2' aria-label='linkedin-icon' />
				</a>
				<a
					className='hover:text-palette-lime'
					href='https://twitter.com/wsalas1905'
					aria-label='twitter-link'
				>
					<Twitter className=' w-8 h-8 mr-2' aria-label='twitter-icon' />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
