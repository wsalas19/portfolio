import Image from "next/image";
import { Mail, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	CALENDAR_URL,
	CONTACT_EMAIL,
	PROFILE,
	imgSize,
	projects,
} from "@/lib/constants";

// El panel destacado sale de `projects` por slug y no de un objeto propio: si el
// proyecto cambia de descripción o de portada, el hero lo sigue solo.
const featured =
	projects.find((project) => project.slug === "barranquilla-verde") ?? projects[0];

// Sin "use client": las entradas son `.rise`/`.pop` con `[--rise-delay]`, que es
// CSS. El HTML del servidor sale visible y el LCP no espera a la hidratación —
// la misma razón por la que el `ProfileCard` que esto reemplaza no usaba
// framer-motion.
function Hero() {
	return (
		<section id="about" className="py-20 md:py-32">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
					{/* Izquierda: quién es y qué se puede contratar. */}
					<div className="flex flex-col justify-center">
						<div className="rise flex items-center gap-3">
							<Image
								src="/images/profile-img.png"
								alt="William Salas"
								width={imgSize}
								height={imgSize}
								priority
								sizes="56px"
								className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15"
							/>
							<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-palette-lime">
								{PROFILE.eyebrow}
							</span>
						</div>

						<h1 className="rise [--rise-delay:100ms] mt-6 font-display text-4xl font-bold tracking-tight text-gradient-primary text-balance md:text-6xl lg:text-7xl">
							{PROFILE.name}
						</h1>

						<p className="rise [--rise-delay:200ms] mt-6 max-w-xl font-display text-xl font-semibold text-gradient-lime text-balance md:text-2xl">
							{PROFILE.tagline}
						</p>

						<div className="rise [--rise-delay:300ms] mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
							<Button variant="green" size="lg" asChild className="glow-lime-hover w-full sm:w-auto">
								<a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
									<Video className="mr-2 h-5 w-5" />
									Book a call
								</a>
							</Button>
							<Button variant="glass" size="lg" asChild>
								<a href={`mailto:${CONTACT_EMAIL}`}>
									<Mail className="mr-2 h-5 w-5" />
									Email me
								</a>
							</Button>
							<Button
								variant="ghost"
								size="lg"
								asChild
								className="justify-center bg-[#495533]/40 font-semibold"
							>
								<a href="#projects">See the work</a>
							</Button>
						</div>

						<p className="rise [--rise-delay:200ms] mt-6 text-lg leading-relaxed text-gray-300">
							{PROFILE.bio}
						</p>

						{/* Las píldoras van en la columna de la persona, no encima de la
						    tarjeta de trabajo: arriba a la derecha se leían como el stack
						    del proyecto destacado, y ese proyecto es Python y Google Earth
						    Engine. En `text-xs` cierran el bio como nota al pie y no
						    compiten con el H1, que es lo que pasaba con `text-sm` en la
						    primera fila. */}
						<div className="rise [--rise-delay:300ms] mt-6 flex flex-wrap gap-2">
							{PROFILE.skills.map((skill) => (
								<span
									key={skill}
									className="rounded-full border border-palette-pink/20 glass-pink px-2.5 py-1 text-xs font-medium text-palette-pink"
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					{/* Derecha: la prueba inmediata, el trabajo destacado. */}
					<div className="flex flex-col justify-center">
						<a
							href="#projects"
							className="rise [--rise-delay:400ms] glass group block overflow-hidden rounded-2xl transition-all duration-300 hover:glass-strong"
						>
							<div className="relative aspect-[16/10] w-full overflow-hidden">
								{/* `priority` saca el `loading="lazy"` y emite el `<link rel=preload>`,
								    pero Next 15 no deriva `fetchpriority` de él: hay que pasarlo
								    aparte (get-img-props.js solo lo reenvía si se le da). */}
								<Image
									src={featured.imageUrl}
									alt={featured.title}
									fill
									priority
									fetchPriority="high"
									sizes="(max-width: 1024px) 100vw, 520px"
									className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-[#1c1c1c]/30 to-transparent" />
							</div>
							<div className="p-5">
								<span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
									Featured work
								</span>
								<h2 className="mt-2 font-display text-xl font-bold text-white">
									{featured.title}
								</h2>
								<p className="mt-1 line-clamp-2 text-sm text-gray-300">
									{featured.description}
								</p>
								<div className="mt-3 flex flex-wrap gap-1.5">
									{featured.technologies.slice(0, 3).map((tech) => (
										<span
											key={tech}
											className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-gray-400"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
