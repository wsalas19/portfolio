"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadResume from "./DownloadResume";
import { CONTACT_EMAIL, PROFILE, SOCIAL_LINKS, paths } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LINK =
	"text-sm capitalize text-gray-400 transition-colors hover:text-palette-lime";

/**
 * No había footer en ningún lado: el layout terminaba en `{children}` y las
 * páginas interiores se acababan en seco, sin ninguna navegación hacia abajo.
 *
 * Es cliente por el mismo motivo que `NavBar` y `ScrollButton`: necesita el
 * pathname para desaparecer en /admin, donde el panel tiene su propio layout.
 *
 * Las tres columnas salen de `paths` y de `SOCIAL_LINKS`: no hay un enlace
 * escrito a mano acá que pueda quedar desincronizado del resto del sitio.
 */
function Footer() {
	const pathname = usePathname();
	if (pathname.startsWith("/admin")) return null;

	const anchors = paths.filter((path) => !path.isRoute);
	const routes = paths.filter((path) => path.isRoute);

	const socials = [
		{ label: "GitHub", href: SOCIAL_LINKS.github },
		{ label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
		{ label: "Upwork", href: SOCIAL_LINKS.upwork },
	];

	return (
		// El pb deja libre la píldora de navegación, que flota fija abajo al centro
		// y taparía el crédito y el wordmark.
		<footer className="relative mt-10 border-t border-white/10 pb-28 md:pb-32">
			<div className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div className="lg:col-span-1">
						<p className="font-display text-lg font-bold text-white">{PROFILE.name}</p>
						<p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
							{PROFILE.location} · Full-stack product development and technical
							review, for teams that need it shipped.
						</p>
					</div>

					<nav aria-label="On this page">
						<h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
							On this page
						</h3>
						<ul className="mt-4 space-y-2.5">
							{anchors.map((path) => (
								<li key={path.name}>
									<a href={path.path} className={LINK}>
										{path.name}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<nav aria-label="More">
						<h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
							More
						</h3>
						<ul className="mt-4 space-y-2.5">
							{routes.map((path) => (
								<li key={path.name}>
									<Link href={path.path} className={LINK}>
										{path.name}
									</Link>
								</li>
							))}
							<li>
								{/* `normal-case`: el `capitalize` de LINK existe para los nombres de
								    `paths` ("about" → "About"), pero convertía el correo en
								    "Wa.Salas1905@Hotmail.Com". */}
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className={cn(LINK, "normal-case")}
								>
									{CONTACT_EMAIL}
								</a>
							</li>
						</ul>
					</nav>

					<nav aria-label="Elsewhere">
						<h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
							Elsewhere
						</h3>
						<ul className="mt-4 space-y-2.5">
							{socials.map((social) => (
								<li key={social.label}>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className={LINK}
									>
										{social.label}
									</a>
								</li>
							))}
							<li className="pt-1">
								<DownloadResume />
							</li>
						</ul>
					</nav>
				</div>

				<div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
					</p>
					<p>Built with Next.js and Tailwind CSS.</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
