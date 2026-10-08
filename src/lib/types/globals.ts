export type jobProps = {
	role: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
	technologies?: string[];
	companyUrl?: string;
};
export type ButtonControl<T> = {
	sent: boolean;
	name: T;
};

export enum ButtonLabel {
	DOWNLOAD = "Download CV",
	DOWNLOADING = "Downloading",
}
export type ProfileCardProps = {
	imgSize: number;
};

export type PathType = {
	name: string;
	path: string;
	description: string;
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
