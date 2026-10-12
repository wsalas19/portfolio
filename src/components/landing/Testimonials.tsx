import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/constants";
import type { LandingCopy } from "@/lib/i18n";

/**
 * Las citas de `constants.ts` se muestran tal cual; son borradores hasta que
 * cada persona dé el visto bueno por escrito. El componente sigue devolviendo
 * `null` si el array queda vacío.
 *
 * El `id` es el ancla para el enlace profundo, pero `paths` todavía no lo
 * lista: un enlace a `#testimonials` existiría solo en esta página.
 */
function Testimonials({ copy }: { copy: LandingCopy }) {
	if (testimonials.length === 0) return null;

	return (
		<section id="testimonials" className="py-20 md:py-32">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionHeading
					eyebrow={copy.testimonialsSection.eyebrow}
					title={copy.testimonialsSection.title}
				/>

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
