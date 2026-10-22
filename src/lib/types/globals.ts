export type jobProps = {
	role: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
	technologies?: string[];
	companyUrl?: string;
};
// Un camino de servicio ("landing", "build", "partner"): lo que se puede
// contratar. La unión cerrada es lo que hace que `LandingCopy` exija las tres
// entradas en los dos idiomas: con `string`, una traducción que falta caía al
// inglés en silencio y nadie se enteraba hasta ver la página.
export type ServiceTrackId = "landing" | "build" | "partner";

export type ServiceTrack = {
	id: ServiceTrackId;
	eyebrow: string;
	title: string;
	description: string;
	items: string[];
	// Precio publicado. `usd` es la referencia (la que va al JSON-LD); `cop` no
	// es una conversión: es un precio distinto, más bajo, ajustado al mercado
	// local. Un tier sin precio (el que se negocia por llamada) no lo define.
	price?: { usd: number; cop: number };
	// "from $2,500" en vez de un precio cerrado: deja espacio para acotar hacia
	// arriba sin reescribir la página.
	priceFrom?: boolean;
	// Sufijo de cadencia. Un one-time no lo lleva.
	pricePeriod?: "month";
	// A dónde va el botón. Por defecto WhatsApp; lo que se negocia por llamada
	// va al calendario.
	cta?: "whatsapp" | "calendar";
};

// El importe que se muestra depende de la geolocalización, no del idioma: un
// visitante en Colombia ve pesos aunque lea el sitio en inglés.
export type Currency = "USD" | "COP";

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
	// Sitio de la persona o de su empresa. Estaba declarado como `linkedinUrl`
	// y no lo renderizaba nadie; el nombre era falso para quien enlaza a
	// patientstudio.com o samgaddis.com.
	url?: string;
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
export type ServiceTrackSeed = Pick<
	ServiceTrack,
	"price" | "priceFrom" | "pricePeriod" | "cta"
> & { id: ServiceTrackId };
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
