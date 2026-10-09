import { z } from "zod";
import { isAllowedBlogSlug, isAllowedContentPath } from "@/lib/admin/auth";
import {
	HttpError,
	assertValidDoc,
	fileHistoryUrl,
	ghDelete,
	ghListOrEmpty,
	ghRead,
	ghSave,
	imagesFor,
	json,
	requireAdmin,
} from "@/lib/admin/server";
import { Logger } from "@/lib/logger";

const DIRS = { blog: "content/blog", legal: "content/legal" } as const;
type Kind = keyof typeof DIRS;

/** ~1 MB de markdown es holgadísimo: el post más largo del repo tiene 30 KB. */
const MAX_RAW = 1_000_000;

const saveSchema = z.object({
	path: z.string(),
	sha: z.string().min(1),
	raw: z.string().min(1).max(MAX_RAW),
});

const createSchema = z.object({
	kind: z.enum(["blog", "legal"]),
	slug: z.string(),
	raw: z.string().min(1).max(MAX_RAW),
});

function slugOf(path: string): string {
	return path.split("/").pop()?.replace(/\.md$/, "") ?? "";
}

function failure(error: unknown): Response {
	if (error instanceof HttpError) return json({ error: error.message }, error.status);

	Logger.error(error as Error, { route: "/api/admin/files" });
	return json({ error: "Request failed" }, 500);
}

export async function GET(request: Request) {
	const denied = requireAdmin(request, "GET");
	if (denied) return denied;

	const path = new URL(request.url).searchParams.get("path");

	try {
		if (path !== null) {
			if (!isAllowedContentPath(path)) return json({ error: "Invalid path" }, 400);

			// Todo lo que el editor necesita para abrir un documento en una sola
			// vuelta: el texto, el sha para el bloqueo optimista, a dónde apunta el
			// historial y qué imágenes ya tiene la carpeta del post.
			const slug = slugOf(path);
			const { sha, raw } = await ghRead(path);
			return json({
				path,
				sha,
				raw,
				historyUrl: fileHistoryUrl(path),
				images: path.startsWith("content/blog/") ? await imagesFor(slug) : [],
			});
		}

		const lists = await Promise.all(
			(Object.entries(DIRS) as [Kind, string][]).map(async ([kind, dir]) => {
				const entries = await ghListOrEmpty(dir);
				return entries
					.filter((entry) => entry.name.endsWith(".md"))
					.map((entry) => ({ kind, path: entry.path }));
			}),
		);

		return json({ files: lists.flat() });
	} catch (error) {
		return failure(error);
	}
}

export async function PUT(request: Request) {
	const denied = requireAdmin(request, "PUT");
	if (denied) return denied;

	try {
		const parsed = saveSchema.safeParse(await request.json());
		if (!parsed.success) return json({ error: "Invalid input data" }, 400);

		const { path, sha, raw } = parsed.data;
		if (!isAllowedContentPath(path)) return json({ error: "Invalid path" }, 400);
		assertValidDoc(raw);

		// El `sha` viejo hace que GitHub conteste 409 si el archivo cambió entre
		// la lectura y el guardado: se avisa en vez de pisar el cambio ajeno.
		const saved = await ghSave(path, raw, sha);
		Logger.security("ADMIN_SAVE", { path });
		return json({ ok: true, sha: saved.sha });
	} catch (error) {
		return failure(error);
	}
}

export async function DELETE(request: Request) {
	const denied = requireAdmin(request, "DELETE");
	if (denied) return denied;

	try {
		const path = new URL(request.url).searchParams.get("path") ?? "";
		if (!isAllowedContentPath(path)) return json({ error: "Invalid path" }, 400);

		// El sha se lee ahora y no se recibe del cliente: borrar es destructivo y
		// no puede depender de lo que el navegador crea que tiene.
		const { sha } = await ghRead(path);
		await ghDelete(path, sha);
		Logger.security("ADMIN_DELETE", { path });
		return json({ ok: true });
	} catch (error) {
		return failure(error);
	}
}

export async function POST(request: Request) {
	const denied = requireAdmin(request, "POST");
	if (denied) return denied;

	try {
		const parsed = createSchema.safeParse(await request.json());
		if (!parsed.success) return json({ error: "Invalid input data" }, 400);

		const { kind, slug, raw } = parsed.data;
		if (!isAllowedBlogSlug(slug)) return json({ error: "Invalid slug" }, 400);
		assertValidDoc(raw);

		const path = `${DIRS[kind]}/${slug}.md`;
		if (!isAllowedContentPath(path)) return json({ error: "Invalid slug" }, 400);

		// GitHub no avisa al crear sobre un archivo existente cuando no se manda
		// `sha`: lo sobreescribiría. Se chequea antes.
		const exists = await ghRead(path).then(
			() => true,
			(error) => {
				if (error instanceof HttpError && error.status === 404) return false;
				throw error;
			},
		);
		if (exists) return json({ error: "A file with that name already exists" }, 409);

		const created = await ghSave(path, raw, undefined);
		Logger.security("ADMIN_CREATE", { path });
		return json({ path, sha: created.sha }, 201);
	} catch (error) {
		return failure(error);
	}
}
