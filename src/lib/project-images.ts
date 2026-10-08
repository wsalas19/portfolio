import "server-only"; // usa fs: se lee en el servidor, no se bundlea al cliente.

import fs from "fs";
import path from "path";

// Un directorio por proyecto, igual que las imágenes del blog
// (`content/blog/<slug>.md` ↔ `public/images/blog/<slug>/`). Agregar una captura
// es copiar el archivo a `public/images/projects/<slug>/` y nada más: no hay
// lista que mantener ni import que se olvide.
const projectsDir = path.join(process.cwd(), "public", "images", "projects");

export function galleryFor(slug: string): string[] {
	const dir = path.join(projectsDir, slug);
	if (!fs.existsSync(dir)) {
		return [];
	}

	return fs
		.readdirSync(dir)
		.filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
		.sort()
		.map((file) => `/images/projects/${slug}/${file}`);
}
