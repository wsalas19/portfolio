"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadResume from "./DownloadResume";
import { CONTACT_EMAIL, PROFILE, SOCIAL_LINKS } from "@/lib/constants";
import { getChromeCopy, getNavPaths, localeFromPathname } from "@/lib/i18n/core";
import { cn } from "@/lib/utils";

const LINK =
	"focus-ring text-sm capitalize text-gray-400 transition-colors hover:text-palette-lime";

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

	const locale = localeFromPathname(pathname);
	const copy = getChromeCopy(locale);
	const paths = getNavPaths(locale);
	const anchors = paths.filter((path) => !path.isRoute);
	const routes = paths.filter((path) => path.isRoute);

	// El idioma solo se puede cambiar donde hay dos versiones que ofrecer: la
	// landing. En /blog o /tools un "Español" llevaría a la landing en español, que
	// no es la página que se está leyendo.
	const isLanding = pathname === "/" || pathname === "/es";

	const socials = [
	// El `rel="me"` de abajo declara que los tres perfiles son de la misma persona
	// que firma el sitio. No es factor de posicionamiento: es verificación de
	// identidad (IndieAuth), que es justamente para lo que existen estos enlaces.
	{ label: "GitHub", href: SOCIAL_LINKS.github },
		{ label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
		{ label: "Upwork", href: SOCIAL_LINKS.upwork },
	];

	return (
		// El pb deja libre la píldora de navegación, que flota fija abajo al centro
		// y taparía el crédito y el wordmark.
		<footer className="relative mt-10 border-t border-white/10 pb-28 md:pb-32">
			<div className="container-page pt-14">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div className="lg:col-span-1">
						<p className="font-display text-lg font-bold text-white">{PROFILE.name}</p>
						<p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
							{PROFILE.location} · {copy.footer.about}
						</p>
					</div>

					<nav aria-label={copy.footer.onThisPage}>
						<h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
							{copy.footer.onThisPage}
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

					<nav aria-label={copy.footer.more}>
						<h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
							{copy.footer.more}
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

					<nav aria-label={copy.footer.elsewhere}>
						<h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
							{copy.footer.elsewhere}
						</h3>
						<ul className="mt-4 space-y-2.5">
							{socials.map((social) => (
								<li key={social.label}>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer me"
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
						© {new Date().getFullYear()} {PROFILE.name}. {copy.footer.rights}
					</p>
					<p>{copy.footer.builtWith}</p>
					{/* Los nombres de idioma son endónimos y no se traducen: quien no
					    entiende el idioma actual necesita reconocer el suyo escrito como
					    él lo escribe. `hrefLang` es para el navegador, no para el ojo. */}
					{isLanding && (
						<Link
							href={locale === "en" ? "/es" : "/"}
							hrefLang={locale === "en" ? "es" : "en"}
							className={cn(LINK, "normal-case font-medium")}
						>
							{locale === "en" ? "Español" : "English"}
						</Link>
					)}
				</div>
			</div>
		</footer>
	);
}

export default Footer;
