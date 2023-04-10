import { news } from "@/config/news";

export default function handler(req, res) {
	res.status(200).json(news);
}
