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
export type ProfileCardProps = {
	imgSize: number;
};

export type PathType = {
	name: string;
	path: string;
	description: string;
};
export interface Project {
	title: string;
	description: string;
	technologies: string[];
	liveUrl?: string;
	githubUrl?: string;
	imageUrl: string;
	highlights: string[];
}
