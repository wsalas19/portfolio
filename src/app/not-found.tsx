import Link from "next/link";
import { ArrowLeft, Compass, SearchX } from "lucide-react";



// Anillos de radar con un "blip" perdido: decorativo, aria-hidden.
function RadarBackdrop() {
	return (
		<svg
			aria-hidden
			viewBox="0 0 600 600"
			className="pointer-events-none absolute left-1/2 top-1/2 h-[min(92vw,560px)] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 opacity-60"
		>
			<defs>
				<linearGradient id="nf-sweep" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="#d4ff4d" stopOpacity="0" />
					<stop offset="100%" stopColor="#d4ff4d" stopOpacity="0.5" />
				</linearGradient>
			</defs>
			{[110, 190, 270].map((r) => (
				<circle
					key={r}
					cx="300"
					cy="300"
					r={r}
					fill="none"
					stroke="#d4ff4d"
					strokeOpacity="0.12"
					strokeWidth="1"
					strokeDasharray="3 9"
				/>
			))}
			<line
				x1="300"
				y1="300"
				x2="556"
				y2="166"
				stroke="url(#nf-sweep)"
				strokeWidth="1.5"
			/>
			<circle cx="300" cy="300" r="3" fill="#d4ff4d" fillOpacity="0.5" />
			<circle className="animate-pulse" cx="433" cy="203" r="5" fill="#d4ff4d" />
			<circle
				className="animate-pulse"
				cx="213"
				cy="397"
				r="4"
				fill="#fb8983"
				fillOpacity="0.8"
			/>
		</svg>
	);
}

export default function NotFound() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-40 pt-24 text-center">
			{/* Halo suave detrás del radar */}
			<div
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,255,77,0.10)_0%,transparent_65%)]"
			/>
			<RadarBackdrop />

			<div className="relative z-[1] animate-slideIn">
				<span className="glass-lime inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-palette-lime">
					<Compass size={13} className="shrink-0" />
					Error 404
				</span>

				<h1
					aria-label="Error 404"
					className="mt-7 flex items-center justify-center gap-1 font-display text-[5.5rem] font-bold leading-none tracking-[-0.03em] md:text-[8rem]"
				>
					<span aria-hidden className="text-gradient-primary">
						4
					</span>
					<SearchX
						aria-hidden
						strokeWidth={1.5}
						className="icon-glow-lime h-[0.74em] w-[0.74em] text-palette-lime"
					/>
					<span aria-hidden className="text-gradient-primary">
						4
					</span>
				</h1>

				<h2 className="mt-6 font-display text-2xl font-semibold text-white md:text-3xl">
					This page drifted off the radar
				</h2>
				<p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400 md:text-base">
					The link may be broken, or the page moved. Let&apos;s get you back on
					solid ground.
				</p>

				<div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link
						href="/"
						className="glow-lime-hover flex w-full items-center justify-center gap-2 rounded-md bg-palette-lime px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-palette-olive hover:text-white sm:w-auto"
					>
						<ArrowLeft size={16} />
						Back home
					</Link>
					<Link
						href="/tools"
						className="flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-palette-lime hover:text-white sm:w-auto"
					>
						<Compass size={16} />
						Explore tools
					</Link>
				</div>
			</div>
		</main>
	);
}
