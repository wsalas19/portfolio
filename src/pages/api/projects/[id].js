const { projects } = require("../../../config/projects");

export default function handler(req, res) {
	try {
		const { id } = req.query;
		const project = projects.find((p) => p.id === id);
		if (!project)
			throw new Error("project not found/does not exist", { status: 404 });
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json(error.toString());
	}
}
