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
		name: "projects",
		path: "#projects",
		description: "A showcase of my recent work and side projects.",
	},
	{
		name: "contact",
		path: "#contact",
		description: "Get in touch with me for opportunities or inquiries.",
	},
	{
		name: "blog",
		path: "/blog",
		description: "Technical articles about React, Next.js, and web development.",
		isRoute: true,
	},
	{
		name: "tools",
		path: "/tools",
		description:
			"Free browser tools: X/Twitter thread reader and a Colombian mortgage credit simulator.",
		isRoute: true,
	},
];

export const imgSize: number = 300;

// Una sola fuente para los datos que aparecen en más de un sitio. El LinkedIn
// estaba escrito dos veces con handles distintos: `layout.tsx` (JSON-LD del
// Person) apuntaba a /in/william-salas-19 y el botón de la home a
// /in/williamsalasb/.
export const SOCIAL_LINKS = {
	github: "https://github.com/wsalas19",
	linkedin: "https://www.linkedin.com/in/williamsalasb/",
	upwork: "https://www.upwork.com/freelancers/williams59",
} as const;

export const CONTACT_EMAIL = "wa.salas1905@hotmail.com";
export const jobs: jobProps[] = [
	{
		role: "Full Stack Developer",
		company: "Everus",
		companyUrl:
			"https://everuscares.com",
		startDate: "Oct 2025",
		endDate: "Present",
		technologies: [
			"Next.js",
			"Typescript",
			"Vercel",
			"Supabase",
			"Tailwind CSS",
			"AI integration",
		],
		description:
			"Engineered and scaled the core full-stack web applications and robust backend APIs for an AI-powered smart-matching platform.",
	},
	{
		role: "Front-End Developer",
		company: "PatientStudio",
		companyUrl: "https://www.patientstudio.com/",
		startDate: "May 2025",
		endDate: "April 2026",
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
		role: "Solutions Engineer",
		company: "Gwocu Studio",
		startDate: "Nov 2024",
		endDate: "March 2024",
		technologies: ["Jira", "React", "REST API", "AI"],
		description:
			"Assisted API consumers by leveraging advanced workflow automation tools to optimize processes, while providing consultative support to enhance product functionality and drive continuous improvement.",
	},
	{
		role: "Technical Staff",
		company: "App Academy",
		companyUrl: "https://www.appacademy.io/",
		startDate: "Dec 2023",
		endDate: "Jan 2025",

		description:
			"Provided in-depth debugging and technical assistance on portfolio projects, helping students overcome challenges and improve their code. Conducted office hours to clarify concepts and guide job seekers, fostering a supportive and educational environment.",
	},

	{
		role: "Full Stack Developer",
		company: "PNG Technology Solutions",
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
		company: "Henry",
		companyUrl: "https://www.soyhenry.com/",
		startDate: "Sep 2022",
		endDate: "Feb 2023",
		description:
			"Supported students by guiding them through programming exercises, providing targeted help to build their confidence and skills. Focused on creating a learning experience that encouraged problem-solving and mastery of core concepts.",
	},
];
// El orden es el que ve el visitante: primero el trabajo propio y público (que se
// puede abrir y verificar), después el trabajo de cliente y, al final, la
// contribución a un proyecto de otro.
// Se quitaron Hunt Club Portal y Office Supplies Manager: los dos son software
// privado sin nada público que enlazar (Hunt Club solo lo abren socios; del otro
// no hay más material), y una tarjeta sin botón es un callejón sin salida que
// resta credibilidad en vez de sumarla.
export const projects: Project[] = [
	{
		title: "Frieda Player",
		slug: "frieda-player",
		description:
			"A frameless desktop card that mirrors whatever is playing through Windows' media controls and tints itself from the album artwork.",
		technologies: ["Rust", "Tauri 2", "React", "TypeScript", "Windows SMTC"],
		githubUrl: "https://github.com/wsalas19/frieda-player",
		imageUrl: "/images/frieda-player.png",
		highlights: [
			"Event-driven, zero polling",
			"Album-artwork color grading",
			"System tray resident",
			"Native Windows integration",
			"Alpha",
		],
	},
	{
		title: "Visor de Crédito Hipotecario",
		slug: "visor-credito",
		description:
			"Free mortgage simulator for Colombia that models UVR and pesos amortization under Ley 546/1999 — no other free tool applies the local rules.",
		technologies: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS"],
		liveUrl: "/visor-credito",
		imageUrl: "/images/visor-credito.png",
		highlights: [
			"UVR and pesos amortization",
			"Ley 546/1999 and FRECH/FNA rules",
			"CSV export",
			"Free, no signup",
		],
	},
	{
		title: "Twitter Thread Unroller",
		slug: "twitter-threads",
		description:
			"Paste an X/Twitter thread URL and get back a clean, readable article — built to route around the complexity of the X API.",
		technologies: ["Next.js", "TypeScript", "X API", "Tailwind CSS"],
		liveUrl: "/twitter-threads",
		imageUrl: "/images/twitter-threads.png",
		highlights: [
			"One-click unroll",
			"Readable article output",
			"No signup required",
			"Free tool",
		],
	},
	{
		title: "Barranquilla Verde",
		slug: "barranquilla-verde",
		description:
			"Block-level spatial study of Barranquilla: Sentinel-2 vegetation crossed with socioeconomic stratum across 7,761 city blocks.",
		technologies: [
			"Google Earth Engine",
			"Sentinel-2",
			"OSMnx",
			"Python",
			"ArcGIS",
		],
		liveUrl: "/blog/barranquilla-verde-desigualdad-2026",
		imageUrl:
			"/images/blog/barranquilla-verde-desigualdad-2026/01_estrato_y_ndvi.webp",
		highlights: [
			"7,761 city blocks analysed",
			"NDVI at 10 m resolution",
			"Local Moran's I (LISA) clustering",
			"Walkability computed from OpenStreetMap",
			"Open data only",
		],
	},
	{
		title: "Doctor Portal",
		slug: "doctor-portal",
		description:
			"Developed new features for the PatientStudio doctor portal, integrated new AI functionality and improved the user experience.",
		technologies: [
			"React",
			"Vite",
			"TypeScript",
			"Tailwind CSS",
			"Storybook",
			"Figma",
			"GraphQL",
		],
		// El portal en sí es privado (solo entra personal médico), así que el enlace
		// va al sitio del producto para el que se construyó.
		liveUrl: "https://www.patientstudio.com/",
		imageUrl: "/images/projects/doctor-portal/01-portal.png",
		highlights: [
			"AI Integration",
			"User Experience Improvement",
			"Medical Software",
			"UX/UI",
		],
	},
	{
		title: "Invoify — OSS Contribution",
		slug: "invoify",
		// Contribución, no proyecto propio: el texto lo dice para que la tarjeta no
		// se lea como si el repo fuera mío.
		description:
			"Open-source contribution to Invoify, a 6.3k-star invoice generator: fixed PDF generation in Firefox and rebuilt the theme toggle.",
		technologies: ["Next.js", "TypeScript", "React-PDF", "Shadcn"],
		// El enlace va al PR mergeado y no al repo: la tarjeta trata sobre el aporte,
		// y desde el PR el repo queda a un clic. El PR es la única prueba pública de
		// que el código entró.
		githubUrl: "https://github.com/al1abb/invoify/pull/664",
		imageUrl: "/images/invoify.png",
		highlights: [
			"Merged into a 6.3k-star project",
			"Fixed Firefox PDF generation (issue #11)",
			"PDFs download as attachments again",
			"3 files changed, +303/−392",
		],
	},
];

export const gradientColors = [ "#d4ff4d", "#a2a206", "#2e3320", "#fb8983",];
