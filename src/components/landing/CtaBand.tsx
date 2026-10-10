import { Mail, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CALENDAR_URL, CONTACT_EMAIL } from "@/lib/constants";

function CtaBand() {
	return (
		<section className="pb-20 md:pb-32">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="glass-strong glow-lime-hover rounded-3xl px-6 py-14 text-center md:px-16 md:py-20">
					<span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-palette-lime">
						Next step
					</span>
					<h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
						Build something that ships.
					</h2>
					<p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-300">
						A 30-minute call is enough to know if this is a good match. If it is
						not, I will tell you on the call.
					</p>
					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
					</div>
				</div>
			</div>
		</section>
	);
}

export default CtaBand;
