export type jobProps = {
	role: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
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
};
