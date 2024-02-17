export type jobProps = {
	role: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
};

export type ButtonControl = {
	sent: boolean;
	name: "Send" | "Sending...";
};
export type ProfileCardProps = {
	data: {
		publicUrl: string;
	};
	imgSize: number;
};
