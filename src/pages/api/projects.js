export default function handler(req, res) {
	let projects = [
		{
			name: "Weather App",
			description:
				" A simple client-side-only weather app, that displays information about the current weather of any city or country using the OpenWeather API",
			image:
				"https://i.ibb.co/S0MW2fP/Captura-de-pantalla-2023-02-13-155819.png",
			url: "https://weather-app-2-0-nu.vercel.app/",
			technologies: ["React", "Javascript", "CSS"],
		},
		{
			name: "Country Finder",
			description:
				" A country App that included: searches, filtering, ordering and creation. I built the app using React, Redux, CSS for the client and developed it in Node.js with Express for the backend. Database in PostgreSQL and Sequelize.",
			image: "https://i.ibb.co/VLQvd86/countryfinder.png",
			url: "https://country-finder-wsb.vercel.app/",
			technologies: [
				"React",
				"Node",
				"Redux",
				"Javascript",
				"CSS",
				"Express",
				"Sequelize",
				"Postgres",
			],
		},
		{
			name: "To-Mate E-Commerce",
			description:
				" a complete E-Commerce with payment gateway,authentication, comments, profile and inventory management, using agile methodologies such as SCRUM to keep track of the overall process and goals.",
			image: "https://i.ibb.co/60jmFMh/tomate.png",
			url: "https://testpf.vercel.app/",
			technologies: [
				"React",
				"Node",
				"Redux Toolkit",
				"Javascript",
				"CSS",
				"ChakraUI",
				"Auth0",
				"MercadoPago",
				"Express",
				"Sequelize",
				"Postgres",
			],
		},
		{
			name: "myPortfolio",
			description:
				"a static website that showcases my profile and my previous work.",
			image: "null",
			url: "You're Here!",
			technologies: [
				"Next",
				"React",
				"Node",
				"Javascript",
				"CSS",
				"ChakraUI",
				"MercadoPago",
				"Express",
				"MongoDB",
			],
		},
	];

	res.status(200).json(projects);
}
