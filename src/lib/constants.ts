import { jobProps, PathType } from "./types/globals";

export const paths: PathType[] = [
	{
		name: "about",
		path: "#about",
		description: "Learn more about my background and skills.",
	},
	{
		name: "experience",
		path: "#experience",
		description: "Explore my professional journey and accomplishments.",
	},
	{
		name: "contact",
		path: "#contact",
		description: "Get in touch with me for opportunities or inquiries.",
	},
];

export const imgSize: number = 300;
export const jobs: jobProps[] = [
	{
		role: "Full Stack Developer",
		company: "Freelancer",
		startDate: "Dec 2023",
		endDate: "Present",
		description:
			"Crafted custom software applications to address specific client needs, ensuring solutions were both effective and scalable. Collaborated closely with clients through regular meetings to thoroughly understand and refine project goals.",
	},
	{
		role: "Technical Staff",
		company: "App Academy - USA",
		startDate: "Dec 2023",
		endDate: "Jan 2025",
		description:
			"Provided in-depth debugging and technical assistance on portfolio projects, helping students overcome challenges and improve their code. Conducted office hours to clarify concepts and guide job seekers, fostering a supportive and educational environment.",
	},

	{
		role: "Full Stack Developer",
		company: "PNG Technology Solutions - Barranquilla",
		startDate: "Jul 2023",
		endDate: "Nov 2023",
		description:
			"Designed and implemented tailored software solutions for diverse clients, ensuring projects aligned with their specific requirements. Engaged in regular consultations to capture project details and maintain clear communication throughout the development process.",
	},
	{
		role: "Programming Mentor",
		company: "Henry - Argentina",
		startDate: "Sep 2022",
		endDate: "Feb 2023",
		description:
			"Supported students by guiding them through programming exercises, providing targeted help to build their confidence and skills. Focused on creating a learning experience that encouraged problem-solving and mastery of core concepts.",
	},
];
