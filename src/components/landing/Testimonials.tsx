import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/constants";

/**
 * Andamiaje, no contenido: hay dos permisos pendientes antes de poder publicar
 * nombres y citas reales. Mientras `testimonials` esté vacío esto no renderiza
 * nada — nada de nombres de relleno ni de "coming soon". Cargar los objetos en
 * `constants.ts` es todo lo que hace falta para que la sección aparezca acá.
 */
function Testimonials() {
	if (testimonials.length === 0) return null;

	return (
		<section className="py-20 md:py-32">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionHeading eyebrow="Testimonials" title="What the people I worked with say" />

				<div className="grid gap-6 md:grid-cols-2">
					{testimonials.map((testimonial) => (
						<figure
							key={testimonial.name}
							className="glass flex flex-col rounded-2xl p-7"
						>
							<blockquote className="flex-1 text-lg leading-relaxed text-gray-200">
								&ldquo;{testimonial.quote}&rdquo;
							</blockquote>
							<figcaption className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
								{testimonial.portraitUrl && (
									<Image
										src={testimonial.portraitUrl}
										alt=""
										width={48}
										height={48}
										sizes="48px"
										className="h-12 w-12 rounded-full object-cover"
									/>
								)}
								<div className="text-sm">
									<p className="font-semibold text-white">{testimonial.name}</p>
									<p className="text-gray-400">
										{testimonial.role}
										{testimonial.company ? `, ${testimonial.company}` : ""}
									</p>
								</div>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}

export default Testimonials;
