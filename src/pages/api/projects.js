export default function handler(req, res) {
	let projects = [
		{
			name: "Country Finder",
			description:
				" A country App that included: searches, filtering, ordering and creation. I built the app using React, Redux, CSS for the client and developed it in Node.js with Express for the backend. Database in PostgreSQL and Sequelize.",
			image: "https://i.ibb.co/VLQvd86/countryfinder.png",
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
