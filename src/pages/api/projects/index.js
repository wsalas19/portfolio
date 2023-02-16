const { projects } = require("../../../config/projects");

export default function handler(req, res) {
	res.status(200).json(projects);
}
