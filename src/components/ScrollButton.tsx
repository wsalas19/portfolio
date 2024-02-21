"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function ScrollButton() {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", toggleVisible);

			return () => {
				window.removeEventListener("scroll", toggleVisible);
			};
		}
	}, []);
	return (
		<Button
			onClick={scrollToTop}
			variant={"outline"}
			className='fixed right-10 bottom-10 z-10 aspect-square rounded-full bg-gray-900 text-white hover:bg-palette-lime hover:text-gray-900 hover:border-palette-lime font-semibold'
			style={{ display: visible ? "inline" : "none" }}
		>
			{/* <ChevronUp /> */}
			Back to Top
		</Button>
	);
}
export default ScrollButton;
