import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { CALENDAR_URL, serviceTracks } from "@/lib/constants";

/**
 * Lo que hoy no existía en ninguna parte del sitio: la oferta. Cada track sale de
 * `serviceTracks`, y cada afirmación de ahí sale de un trabajo en `jobs`.
 */
function Services() {
	return (
		<section id="services" className="py-20 md:py-32">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionHeading
					eyebrow="What you can hire"
					title="Build it, or get a second opinion before you do."
					description="Two ways to work together. I can take the feature end to end. Or I can review what you have and tell you what I would change."
				/>

				<div className="grid gap-6 lg:grid-cols-3">
					{serviceTracks.map((track, index) => (
						<div
							key={track.id}
							className="rise glass flex flex-col rounded-2xl p-7 transition-all duration-300 hover:glass-strong"
							style={{ "--rise-delay": `${index * 120}ms` } as CSSProperties}
						>
							<span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-pink">
								{track.eyebrow}
							</span>
							<h3 className="mt-3 font-display text-xl font-bold text-white">
								{track.title}
							</h3>
							<p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">
								{track.description}
							</p>
							<ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
								{track.items.map((item) => (
									<li key={item} className="flex items-start gap-3 text-sm text-gray-300">
										<Check className="mt-0.5 h-4 w-4 shrink-0 text-palette-lime" />
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<a
					href={CALENDAR_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-10 inline-block text-sm font-medium text-palette-lime hover:underline"
				>
					Tell me what you want to build →
				</a>
			</div>
		</section>
	);
}

export default Services;
