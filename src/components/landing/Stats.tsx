import Link from "next/link";
import { getAllPosts } from "@/lib/blog/posts";
import { PROFILE, projects } from "@/lib/constants";

const ITEM =
	"group flex flex-col gap-1 transition-colors";

/**
 * Tres números, y ninguno escrito a mano: si un post se publica o un proyecto se
 * agrega, el número cambia solo. Cada uno enlaza a su fuente, que es lo que hace
 * la afirmación verificable de un clic en vez de una cifra que hay que creer.
 */
function Stats() {
	const years = new Date().getFullYear() - PROFILE.experienceStart;
	const postCount = getAllPosts().length;

	// Con menos de tres artículos la ranura se lee pobre. El estudio de
	// Barranquilla tiene su propia cifra dura, ya publicada y enlazable.
	// ponytail: umbral a ojo; si el blog pasa de tres posts, esta rama muere sola.
	const stats = [
		{ value: `${years}`, label: "Years building software", href: "#experience" },
		// "Projects and tools" y no "Public projects & tools": los seis incluyen una
		// contribución a un repo ajeno y un portal privado, así que "public" no era
		// cierto para todos. "Studies published" tampoco: un estudio es Barranquilla
		// Verde; los otros cinco son artículos.
		{ value: `${projects.length}`, label: "Projects and tools", href: "#projects" },
		postCount >= 3
			? { value: `${postCount}`, label: "Articles published", href: "/blog" }
			: {
					value: "7,761",
					label: "City blocks analysed",
					href: "/blog/barranquilla-verde-desigualdad-2026",
				},
	];

	return (
		<section className="pb-4 md:pb-8">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 border-y border-white/10 py-10 sm:grid-cols-3 md:gap-4">
					{stats.map((stat) => {
						const inner = (
							<>
								<span className="font-display text-4xl font-bold text-white transition-colors group-hover:text-palette-lime md:text-5xl">
									{stat.value}
								</span>
								<span className="text-xs uppercase tracking-[0.2em] text-gray-400">
									{stat.label}
								</span>
							</>
						);

						return stat.href.startsWith("/") ? (
							<Link key={stat.label} href={stat.href} className={ITEM}>
								{inner}
							</Link>
						) : (
							<a key={stat.label} href={stat.href} className={ITEM}>
								{inner}
							</a>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Stats;
