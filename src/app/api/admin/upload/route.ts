import { isAllowedBlogSlug } from "@/lib/admin/auth";
import { HttpError, ghListOrEmpty, ghUpload, json, requireAdmin } from "@/lib/admin/server";
import { Logger } from "@/lib/logger";

/** El tope de body de una función de Vercel ronda los 4.5 MB. */
const MAX_BYTES = 4 * 1024 * 1024;

// La extensión sale del MIME y no del nombre del cliente: si se copiara el
// sufijo, un `algo.html` subido como image/png quedaría servido desde /public.
const EXTENSIONS: Record<string, string> = {
	"image/png": "png",
	"image/jpeg": "jpg",
	"image/webp": "webp",
};

function safeName(filename: string): string {
	return (
		filename
			.replace(/\.[^.]+$/, "")
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "")
			.slice(0, 60) || "imagen"
	);
}

export async function POST(request: Request) {
	const denied = requireAdmin(request, "POST");
	if (denied) return denied;

	try {
		const form = await request.formData();
		const file = form.get("file");
		const slug = form.get("slug");

		if (!isAllowedBlogSlug(slug)) return json({ error: "Invalid slug" }, 400);
		if (!(file instanceof File)) return json({ error: "Missing file" }, 400);

		const extension = EXTENSIONS[file.type];
		if (!extension) return json({ error: "Unsupported format (png, jpg or webp)" }, 400);
		if (file.size > MAX_BYTES) return json({ error: "The image is over 4 MB" }, 413);

		const dir = `public/images/blog/${slug}`;
		// El prefijo numérico es la convención de las carpetas que ya existen
		// (`01_estrato_y_ndvi.webp`), y ordena las capturas en el orden en que se
		// citan en el post.
		const existing = await ghListOrEmpty(dir);
		const filename = `${String(existing.length + 1).padStart(2, "0")}_${safeName(file.name)}.${extension}`;
		const path = `${dir}/${filename}`;

		await ghUpload(path, Buffer.from(await file.arrayBuffer()));
		Logger.security("ADMIN_UPLOAD", { path });

		return json({ ok: true, path: `/images/blog/${slug}/${filename}` });
	} catch (error) {
		if (error instanceof HttpError) return json({ error: error.message }, error.status);

		Logger.error(error as Error, { route: "/api/admin/upload" });
		return json({ error: "Upload failed" }, 500);
	}
}
