import { useEffect, useState } from "react";

export function useWindowSize() {
	const [size, setSize] = useState({
		width: undefined,
		height: undefined,
	});
	const [opacityScroll, setOpacityScroll] = useState(1);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const checkpoint = 60;
			let opacity = 1;
			const handleScroll = () => {
				window.addEventListener("scroll", () => {
					const currentScroll = window.pageYOffset;
					if (currentScroll <= checkpoint) {
						opacity = 1 - currentScroll / checkpoint;
					} else {
						opacity = 0;
					}
					setOpacityScroll(opacity);
				});
			};
			const handleResize = () => {
				setSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			};
			window.addEventListener("scroll", handleScroll);
			window.addEventListener("resize", handleResize);
			handleResize();
			handleScroll();
			return () => {
				window.removeEventListener("resize", handleResize);
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);
	return { size, opacityScroll };
}
