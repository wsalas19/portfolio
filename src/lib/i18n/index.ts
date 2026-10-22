import {
	PROFILE,
	faq as faqSeeds,
	jobs as jobSeeds,
	projects as projectSeeds,
	serviceTracks as trackSeeds,
	testimonials as testimonialSeeds,
} from "@/lib/constants";
import { getNavPaths } from "./core";
import type {
	FaqItem,
	PathType,
	Project,
	ServiceTrack,
	jobProps,
} from "@/lib/types/globals";
import { en } from "./en";
import { es } from "./es";
import type { LandingCopy, Locale } from "./types";

export type { LandingCopy, Locale } from "./types";
// El chrome es cliente y no debe importar este módulo (arrastraría los dos
// diccionarios al navegador). Se reexporta solo por comodidad de quien ya está
// del lado del servidor.
export { getChromeCopy, localeFromPathname } from "./core";

const COPY: Record<Locale, LandingCopy> = { en, es };

// Cae a inglés si llega un idioma desconocido, para que una URL rara nunca deje
// la página sin copy.
export function getLandingCopy(locale: Locale): LandingCopy {
	return COPY[locale] ?? en;
}

/**
 * Hidrata las semillas neutrales de `constants.ts` con la prosa del idioma para
 * producir exactamente los mismos tipos que los componentes ya conocen
 * (`jobProps[]`, `Project[]`, `ServiceTrack[]`, `FaqItem[]`, `PathType[]`).
 *
 * Cada colección se indexa por su clave estable (company / slug / id / name) y
 * cae al inglés si la traducción de una entrada falta: nunca por posición, así
 * que reordenar un array no intercambia idiomas.
 */
export function getLandingContent(locale: Locale) {
	const copy = getLandingCopy(locale);

	const profile = { ...PROFILE, ...copy.profile };

	const jobs: jobProps[] = jobSeeds.map((job) => {
		const prose = copy.jobs[job.company] ?? en.jobs[job.company];
		return {
			...job,
			role: prose.role,
			description: prose.description,
			// "Present" es la única fecha que es palabra; el resto ("Oct 2025") son
			// datos y se leen igual en los dos idiomas.
			// ponytail: las abreviaturas de mes quedan en inglés ("Nov 2024"). Se
			// entienden en español; traducirlas pide un mapa de 12 meses y un parser
			// para algo que no cambia la decisión de nadie.
			endDate:
				job.endDate === en.dates.present ? copy.dates.present : job.endDate,
		};
	});

	const projects: Project[] = projectSeeds.map((project) => {
		const prose = copy.projects[project.slug] ?? en.projects[project.slug];
		return { ...project, ...prose };
	});

	// `...track` primero y la prosa encima: la semilla trae el precio y el CTA,
	// y `prose` trae eyebrow/title/description/items. Con `{ id, ...prose }` el
	// precio se caía acá sin error de tipos, porque `price` es opcional.
	const serviceTracks: ServiceTrack[] = trackSeeds.map((track) => {
		const prose = copy.serviceTracks[track.id] ?? en.serviceTracks[track.id];
		return { ...track, ...prose };
	});

	const faq: FaqItem[] = faqSeeds.map((item) => {
		const prose = copy.faq[item.id] ?? en.faq[item.id];
		return { id: item.id, ...prose };
	});

	const paths: PathType[] = getNavPaths(locale);

	// Las citas van verbatim (no se traducen), pero entran por acá igual que el
	// resto: la sección las recibe como prop y no importa `constants` por su
	// cuenta. Así una sola columna hidrata toda la página.
	const testimonials = testimonialSeeds;

	return {
		nav: copy.nav,
		profile,
		jobs,
		projects,
		serviceTracks,
		faq,
		paths,
		testimonials,
	};
}

export type LandingContent = ReturnType<typeof getLandingContent>;
export type LandingProfile = LandingContent["profile"];
