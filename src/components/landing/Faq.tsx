"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { faq } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Acordeón con estado propio; nada de librería. La apertura anima
 * `grid-template-rows` de `0fr` a `1fr`, que es la forma de animar una altura
 * desconocida sin medirla con JS ni fijar un `max-height` que se recorta cuando
 * la respuesta es más larga de lo previsto.
 */
function Faq() {
	const [open, setOpen] = useState<number | null>(null);

	return (
		<section className="py-20 md:py-32">
			<div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
				<SectionHeading eyebrow="FAQ" title="What people ask before the call" />

				<ul className="border-t border-white/10">
					{faq.map((item, index) => {
						const isOpen = open === index;

						return (
							<li key={item.question} className="border-b border-white/10">
								<button
									type="button"
									onClick={() => setOpen(isOpen ? null : index)}
									aria-expanded={isOpen}
									aria-controls={`faq-panel-${index}`}
									className="group flex w-full items-center justify-between gap-4 py-5 text-left"
								>
									<span
										className={cn(
											"font-display text-lg font-semibold transition-colors group-hover:text-palette-lime",
											isOpen ? "text-palette-lime" : "text-white",
										)}
									>
										{item.question}
									</span>
									<Plus
										className={cn(
											"h-5 w-5 shrink-0 text-palette-lime transition-transform duration-300",
											isOpen && "rotate-45",
										)}
									/>
								</button>

								<div
									id={`faq-panel-${index}`}
									className={cn(
										"grid transition-[grid-template-rows] duration-300 ease-out",
										isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
									)}
								>
									<div className="overflow-hidden">
										<p className="pb-6 pr-6 leading-relaxed text-gray-300">
											{item.answer}
										</p>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}

export default Faq;
