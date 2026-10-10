import {
	FaqItem,
	jobProps,
	PathType,
	Project,
	ServiceTrack,
	Testimonial,
} from "./types/globals";

export const paths: PathType[] = [
	{
		name: "about",
		path: "#about",
		description: "Learn more about my background and skills.",
	},
	{
		name: "services",
		path: "#services",
		description: "What you can hire: product development and technical review.",
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
		description:
			"Technical articles about React, Next.js, and web development.",
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

// Estaba escrita a mano en `NavBar.tsx`. Ahora la usan la nav, el hero, la banda
// de CTA y el footer: cuatro copias del mismo link era una errata esperando.
export const CALENDAR_URL = "https://calendar.app.google/DY4tPQXi5Dn1gKZz9";

/**
 * Todo lo que se decía de la persona estaba hardcodeado dentro de `ProfileCard`:
 * el nombre en un `<h1>`, la bio en un `<p>`, las skills en un array local. Al
 * partir la home en secciones, esos datos los necesitan el hero, las stats, el
 * footer y el JSON-LD, así que viven acá.
 *
 * El texto pasó por una revisión de inglés técnico simplificado (ASD-STE100):
 * una idea por frase, voz activa, sin contracciones y sin frases de más de 20
 * palabras. La excepción deliberada son los títulos y los CTA — "Build something
 * that ships." funciona mejor en imperativo que en cualquier perífrasis.
 */
export const PROFILE = {
	name: "William Salas Bolaño",
	wordmark: "WSALAS",
	eyebrow: "Available for freelance · Barranquilla, Colombia",
	tagline:
		"I build production web software — Next.js, React and TypeScript. I also review architecture before the wrong decisions get expensive.",
	bio: "Full-stack developer with a background in architecture and graphic design. I build clear interfaces and the APIs behind them. I have worked with teams in Colombia and abroad.",
	location: "Barranquilla, Colombia",
	country: "CO",
	skills: [
		"React",
		"TypeScript",
		"Node.js",
		"Next.js",
		"Tailwind CSS",
		"GraphQL",
	],
	// El año en que arranca la línea de tiempo de `jobs`, para derivar los años
	// de experiencia en vez de escribir el número.
	experienceStart: 2022,
} as const;

// Las descripciones mantienen el estilo impersonal del CV ("Built and scaled…",
// sin sujeto) en vez de pasar a primera persona: son el registro de los cargos,
// no el pitch. Lo que cambió es la longitud — cada frase queda por debajo de las
// 20 palabras y cada párrafo dice una cosa sola.
export const jobs: jobProps[] = [
	{
		role: "Full Stack Developer",
		company: "Everus",
		companyUrl: "https://everuscares.com",
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
			"Built and scaled the main full-stack web applications and the backend APIs for an AI-powered smart-matching platform.",
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
			"Built and improved features for PatientStudio's healthcare platform, with a cross-functional team of backend developers and UX/UI designers. Built responsive interfaces in React and TypeScript and kept the components consistent in Storybook. Worked in agile sprints tracked in Jira and fixed client issues on the live platform.",
	},
	{
		role: "Solutions Engineer",
		company: "Gwocu Studio",
		startDate: "Nov 2024",
		endDate: "March 2024",
		technologies: ["Jira", "React", "REST API", "AI"],
		description:
			"Helped API consumers use workflow automation tools to simplify their processes. Gave consulting support to improve product features.",
	},
	{
		role: "Technical Staff",
		company: "App Academy",
		companyUrl: "https://www.appacademy.io/",
		startDate: "Dec 2023",
		endDate: "Jan 2025",

		description:
			"Debugged student portfolio projects and gave technical help to improve their code. Ran office hours to explain concepts and to prepare job seekers for interviews.",
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
			"Designed and built custom software for clients and matched each project to their requirements. Ran regular consultation calls to capture the project details and to keep communication clear.",
	},
	{
		role: "Programming Mentor",
		company: "Henry",
		companyUrl: "https://www.soyhenry.com/",
		startDate: "Sep 2022",
		endDate: "Feb 2023",
		description:
			"Guided students through programming exercises and gave targeted help to build their confidence. Designed exercises that encouraged problem-solving and the mastery of core concepts.",
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
		// "improved the user experience" se fue: no hay forma de verificarlo en una
		// aplicación privada, y la fila ya afirma lo que sí se puede comprobar.
		description:
			"Built new features for the PatientStudio doctor portal and added AI functionality.",
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

export const gradientColors = ["#d4ff4d", "#a2a206", "#2e3320", "#fb8983"];

// Los tres caminos que se pueden contratar. Cada afirmación sale de `jobs`: no
// hay ningún servicio acá que no tenga un trabajo detrás que lo respalde.
export const serviceTracks: ServiceTrack[] = [
	{
		id: "build",
		eyebrow: "Build",
		title: "Full-stack product development",
		description:
			"I ship features end to end: the interface, the API behind it and the deploy. I have done this on a healthcare platform, on client projects and on my own published tools.",
		items: [
			"Next.js, React and TypeScript",
			"Node APIs with Postgres or Supabase",
			"Deploys on Vercel and AWS",
		],
	},
	{
		id: "advise",
		eyebrow: "Advise",
		title: "Technical direction & review",
		description:
			"A second opinion before the expensive part. I tell you what to build first and what to cut. I also flag where the code will slow you down in six months.",
		items: [
			"Architecture and scope before you commit",
			"Code review with written findings",
			"Mentoring for a team picking up a new stack",
		],
	},
	{
		id: "process",
		eyebrow: "How it works",
		title: "Small, visible increments",
		description:
			"There are no black boxes and no month-long silence. You see the work while I build it.",
		items: [
			"A 30-minute call to scope it",
			"A written scope and estimate",
			"Something shippable every week",
		],
	},
];

// Respuestas apoyadas en datos del CV, no en promesas. Si una respuesta no se
// puede respaldar con un trabajo, una fecha o un repo, no va acá.
export const faq: FaqItem[] = [
	{
		question: "What kind of work do you take on?",
		answer:
			"Freelance work. I build a product or a feature end to end, and I advise on scope, architecture and code review. Most of it is web software in TypeScript.",
	},
	{
		question: "Which parts of the stack do you own?",
		answer:
			"The front end, the API behind it and the deploy. My main tools are React, Next.js, TypeScript, Tailwind, Node, Postgres or Supabase, Vercel and AWS. I have also worked in existing GraphQL and Angular codebases, so I can join an existing codebase instead of starting again.",
	},
	{
		question: "Have you worked inside an existing team?",
		answer:
			"Yes. At PatientStudio I worked with backend developers and UX/UI designers on a healthcare platform for medical staff. I built features in React and TypeScript, documented components in Storybook, used GraphQL and tracked sprints in Jira.",
	},
	{
		question: "Can you build AI features?",
		answer:
			"Yes. At Everus I built and scaled the backend of an AI-powered smart-matching platform. At PatientStudio I added AI features to the doctor portal.",
	},
	{
		question: "How do you work across time zones?",
		answer:
			"I am in Barranquilla, Colombia (UTC−5). That overlaps a full US workday. I have worked remotely with teams in the US and in other countries.",
	},
	{
		question: "How does an engagement start?",
		answer:
			"First a 30-minute call to understand what you need. Then a written scope that lists what is included. If it is not a good match, I will tell you on the call.",
	},
];

/**
 * Vacío a propósito: hay dos permisos pendientes antes de poder mostrar nombres
 * y citas. El componente devuelve `null` mientras el array esté vacío, así que
 * cargar los objetos es todo lo que hace falta para que la sección aparezca.
 */
export const testimonials: Testimonial[] = [];
