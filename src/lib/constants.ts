import { jobProps, PathType, Project } from "./types/globals";

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
		role: "Front-End Developer",
		company: "PatientStudio",
		companyUrl: "https://www.patientstudio.com/",
		startDate: "May 2025",
		endDate: "Present",
		technologies: [
			"React",
			"Typescript",
			"Tailwind",
			"Vite",
			"Storybook",
			"Jira",
			"GraphQL",
		],
		description:
			"Collaborated with a cross-functional team of backend developers and UX/UI designers to develop and enhance features for PatientStudio's healthcare platform, serving medical professionals. Built responsive, user-friendly interfaces using React and TypeScript, while maintaining design consistency through Storybook components. Actively participated in agile development cycles using Jira for project management, and promptly addressed client issues to ensure optimal platform performance and user experience for healthcare providers.",
	},
	{
		role: "Full Stack Developer",
		company: "Freelancer",
		companyUrl:
			"https://www.upwork.com/freelancers/~016ef2baac2d1684a6?mp_source=share",
		startDate: "Dec 2023",
		endDate: "Present",
		technologies: [
			"Next.js",
			"Typescript",
			"AWS",
			"GCP",
			"Vercel",
			"Tailwind CSS",
			"CRM Integration",
		],
		description:
			"Crafted custom software applications to address specific client needs, ensuring solutions were both effective and scalable. Collaborated closely with clients through regular meetings to thoroughly understand and refine project goals.",
	},
	{
		role: "Solutions Engineer",
		company: "Gwocu Studio",
		startDate: "Nov 2024",
		endDate: "March 2024",
		companyUrl: "https://wiki.gwocu.com/",
		technologies: ["Jira", "React", "REST API", "AI"],
		description:
			"Assisted API consumers by leveraging advanced workflow automation tools to optimize processes, while providing consultative support to enhance product functionality and drive continuous improvement.",
	},
	{
		role: "Technical Staff",
		company: "App Academy - USA",
		companyUrl: "https://www.appacademy.io/",
		startDate: "Dec 2023",
		endDate: "Jan 2025",

		description:
			"Provided in-depth debugging and technical assistance on portfolio projects, helping students overcome challenges and improve their code. Conducted office hours to clarify concepts and guide job seekers, fostering a supportive and educational environment.",
	},

	{
		role: "Full Stack Developer",
		company: "PNG Technology Solutions - Barranquilla",
		companyUrl: "https://www.linkedin.com/company/png-technology-solutions/",
		startDate: "Jul 2023",
		endDate: "Nov 2023",
		technologies: [
			"React",
			"Next.js",
			"Material UI",
			"Postgres",
			"Angular",
			"AWS",
			"Github Actions",
			"Docker",
		],
		description:
			"Designed and implemented tailored software solutions for diverse clients, ensuring projects aligned with their specific requirements. Engaged in regular consultations to capture project details and maintain clear communication throughout the development process.",
	},
	{
		role: "Programming Mentor",
		company: "Henry - Argentina",
		companyUrl: "https://www.soyhenry.com/",
		startDate: "Sep 2022",
		endDate: "Feb 2023",
		description:
			"Supported students by guiding them through programming exercises, providing targeted help to build their confidence and skills. Focused on creating a learning experience that encouraged problem-solving and mastery of core concepts.",
	},
];
export const projects: Project[] = [
	{
		title: "Portfolio Website",
		description:
			"Personal portfolio built with Next.js and TypeScript to showcase experience and personal work.",
		technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
		liveUrl: "https://wsalas.tech",
		githubUrl: "https://github.com/wsalas19/portfolio",
		imageUrl: "/images/portfolio.png",
		highlights: [
			"Responsive Design",
			"Server-Side Rendering",
			"UX/UI",
			"Personal Work",
		],
	},
	{
		title: "Office Supplies Manager",
		description:
			"Custom built private web-based procurement system designed to streamline the ordering and management of office supplies within a corporate environment.",
		technologies: [
			"Next.js",
			"TypeScript",
			"Material UI",
			"Postgres",
			"AWS",
			"CI/CD",
			"ORM",
		],
		imageUrl: "/images/gdc.png",
		highlights: [
			"Responsive Design",
			"Migration",
			"API Integration",
			"Coorporate Client",
		],
	},
	{
		title: "Hunt Club Portal",
		description:
			"is a modern Next.js application designed to streamline lodge reservations, wildlife outings, and member profile management.",
		technologies: [
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Zoho CRM",
			"GCP",
			"CI/CD",
			"Redis",
		],
		imageUrl: "/images/cottonwood.png",
		highlights: [
			"Responsive Design",
			"UX/UI",
			"API Integration",
			"SSR",
			"Image Optimization",
		],
	},
	// ... your other projects
];
