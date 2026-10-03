// Carga de los documentos legales en Markdown (content/legal/*.md). Server-only:
// usa fs. Los datos que necesita el cliente viven en "@/lib/legal".

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content", "legal");

export type LegalSlug = "privacidad" | "terminos";

export type LegalDoc = {
	slug: LegalSlug;
	title: string;
	excerpt: string;
	content: string;
};

export function getLegalDoc(slug: LegalSlug): LegalDoc | null {
	const fullPath = path.join(contentDirectory, `${slug}.md`);
	if (!fs.existsSync(fullPath)) return null;

	const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

	return {
		slug,
		title: data.title,
		excerpt: data.excerpt,
		content,
	};
}
