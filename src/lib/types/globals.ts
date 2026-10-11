export type jobProps = {
	role: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
	technologies?: string[];
	companyUrl?: string;
};
// Un camino de servicio ("build", "advise"): lo que se puede contratar.
export type ServiceTrack = {
	id: string;
	eyebrow: string;
	title: string;
	description: string;
	items: string[];
};

export type FaqItem = {
	// Identificador estable para indexar la traducción por pregunta y no por
	// posición: reordenar el array no puede intercambiar dos traducciones.
	id: string;
	question: string;
	answer: string;
};

export type Testimonial = {
	quote: string;
	name: string;
	role: string;
	company?: string;
	portraitUrl?: string;
	linkedinUrl?: string;
};

export type PathType = {
	// El `name` de la constante neutral es la clave de traducción; el merge de
	// i18n lo reemplaza por la etiqueta del idioma.
	name: string;
	path: string;
	isRoute?: boolean; // If true, use Next.js Link instead of anchor tag
};
export interface Project {
	title: string;
	// Identifica el proyecto en el sistema de archivos: la carpeta de galería es
	// `public/images/projects/<slug>/`. Se escribe a mano y no se deriva del
	// título, que lleva tildes y espacios.
	slug: string;
	description: string;
	technologies: string[];
	liveUrl?: string;
	githubUrl?: string;
	imageUrl: string;
	// Capturas extra para el modal. No se escribe en `constants.ts`: la llena
	// ProjectShowcase leyendo la carpeta, excluyendo la portada.
	images?: string[];
	highlights: string[];
}
/**
 * Semillas neutrales: lo que queda en `constants.ts` después de sacar la prosa.
 * El merge de `@/lib/i18n` las hidrata con el copy del idioma para producir los
 * tipos de arriba (`jobProps`, `Project`, `ServiceTrack`, `FaqItem`). Cada
 * `Omit`/`Pick` dice exactamente qué campos son prosa y cuáles son datos.
 */
export type JobSeed = Omit<jobProps, "role" | "description">;
export type ProjectSeed = Omit<Project, "title" | "description" | "highlights">;
export type ServiceTrackSeed = Pick<ServiceTrack, "id">;
export type FaqSeed = Pick<FaqItem, "id">;

// Types
export interface ContributionDay {
	date: string;
	count: number;
	level: number;
}
export interface ContributionWeek {
	days: ContributionDay[];
}
export interface ContributionStats {
	total: number;
	maxContributions: number;
}
export interface GitHubContributionsProps {
	username: string;
}
