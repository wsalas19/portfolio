"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DownloadResume from "./DownloadResume";
import { Button } from "./ui/button";
import { Video, Menu, X } from "lucide-react";
import { CALENDAR_URL, paths as systemPaths } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";

function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		// passive: el handler solo lee scrollY, marcarlo así evita que el navegador
		// espere a que termine antes de pintar el scroll.
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const paths = pathname.includes("blog")
		? systemPaths.filter((p) => p.name === "blog")
		: systemPaths;

	// El panel tiene su propia barra. La nav del sitio flota abajo al centro y le
	// tapa la esquina del editor.
	if (pathname.startsWith("/admin")) return null;

	const NavItem = ({ path }: { path: (typeof paths)[0] }) => {
		const isActive = pathname === path.path;

		if (path.isRoute) {
			return (
				<Link
					className="font-medium hover:text-palette-lime transition-colors duration-300"
					href={path.path}
				>
					{path.name}
				</Link>
			);
		}

		return (
			<a
				className={`font-medium transition-colors duration-300 ${
					isActive ? "text-palette-lime" : "hover:text-palette-lime"
				}`}
				href={path.path}
			>
				{path.name}
			</a>
		);
	};

	const MobileNavItem = ({ path }: { path: (typeof paths)[0] }) => {
		if (path.isRoute) {
			return (
				<Link
					key={path.name}
					href={path.path}
					className="text-2xl font-semibold text-gray-300 hover:text-palette-lime transition-colors"
					onClick={() => setIsOpen(false)}
				>
					{path.name}
				</Link>
			);
		}

		return (
			<a
				key={path.name}
				href={path.path}
				className="text-2xl font-semibold text-gray-300 hover:text-palette-lime transition-colors"
				onClick={() => setIsOpen(false)}
			>
				{path.name}
			</a>
		);
	};

	return (
		<>
			<nav
				className={`fixed font-display font-bold bottom-6 py-3 left-1/2 -translate-x-1/2 w-[90%] md:w-[50%] rounded-2xl z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
					isScrolled
						? "glass-strong shadow-2xl glow-lime-hover"
						: "glass shadow-lg "
				}`}
			>
				<div className="flex items-center justify-between px-6 md:px-8">

					<Link href="/" className="flex items-center">
						<span className="font-bold text-palette-lime">{"<"}</span>
						<Image
							src="/images/logo-page.png"
							alt="Logo"
							width={40}
							height={40}
						/>
							<span className="font-bold text-palette-lime">{">"}</span>
						</Link>
						<ul className="hidden lg:flex gap-6">
							{paths.map((path) => (
								<li key={path.name}>
									<NavItem path={path} />
								</li>
							))}
						</ul>




					<button
						className="lg:hidden text-white"
						onClick={() => setIsOpen(!isOpen)}
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
						aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				id="mobile-menu"
				// Cerrado sigue en el DOM (para poder animar la salida), así que sin
				// esto el tabulador entra a links que están fuera de pantalla.
				inert={!isOpen}
				// `overflow-y-auto` no es decorativo. El panel mide una pantalla
				// (`inset-0`) y el contenido mide 688px fijos, así que en cualquier
				// viewport más bajo el contenido se sale de la caja. Con
				// `-translate-y-full` el panel sube una pantalla y esa sobra
				// reaparece ARRIBA: los dos botones del final, cortados, encima del
				// hero. Se veía en el teléfono (≈600px con la barra del navegador
				// visible) y no en escritorio (≥700px). El overflow recorta la sobra
				// y de paso deja el menú desplazable en pantallas cortas.
				className={`fixed inset-0 glass-strong z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
					isOpen ? "translate-y-0" : "-translate-y-full"
				} lg:hidden`}
			>
				{/* El `pb` deja el último botón por encima de la píldora de nav, que
				    flota en `bottom-6` y tiene z mayor que este panel. */}
				<div className="flex flex-col items-center pt-32 px-4 pb-24 space-y-8">
					{paths.map((path) => (
						<MobileNavItem key={path.name} path={path} />
					))}

					<div className="flex flex-col text-[16px] w-full gap-4 pt-6 max-w-xs">
						<DownloadResume />
						<a
							href={CALENDAR_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full"
						>
							<Button
								className="w-full  font-bold bg-palette-lime text-gray-900 hover:bg-palette-olive hover:text-white flex gap-2 justify-center"
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
