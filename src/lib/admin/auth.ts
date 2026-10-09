// Lógica de autenticación del panel de administración.
//
// Este archivo es PURO a propósito: solo importa `node:crypto`, nada de
// `server-only` ni de `next/server`. Eso permite correrlo con `node --test`
// (ver `tests/admin-auth.test.mjs`), que es donde se prueba la frontera de
// seguridad — cookie y rutas — sin levantar Next.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "admin_session";
/** En segundos, porque es lo que espera `Max-Age` de la cookie. */
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60;
const SESSION_TTL_MS = SESSION_MAX_AGE * 1000;

function sha256(value: string): Buffer {
	return createHash("sha256").update(value, "utf8").digest();
}

/**
 * Se comparan hashes y no los textos: `timingSafeEqual` exige buffers del mismo
 * largo, así que comparar directo filtraría la longitud por excepción.
 *
 * `expected` indefinido devuelve `false` a secas. Sin ese guard, si la env no
 * está configurada el servidor compararía `sha256("")` contra el string vacío
 * que manda el cliente y dejaría entrar con la contraseña en blanco.
 */
export function checkPassword(
	submitted: string,
	expected: string | undefined,
): boolean {
	if (!expected || !submitted) return false;
	return timingSafeEqual(sha256(submitted), sha256(expected));
}

function signPayload(payload: string, secret: string): string {
	return createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Token con vencimiento embebido: `v1.<exp>.<firma>`. La firma cubre la fecha,
 * así que alargarla exigiría `ADMIN_SECRET`.
 *
 * El secreto de firma es distinto de la contraseña a propósito: si se firmara
 * con la contraseña, quien tuviera una cookie podría probar contraseñas offline
 * contra ella, porque un HMAC es un verificador.
 */
export function signSession(
	secret: string | undefined,
	now: number = Date.now(),
): string | null {
	if (!secret) return null;
	const exp = String(now + SESSION_TTL_MS);
	return `v1.${exp}.${signPayload(`v1.${exp}`, secret)}`;
}

export function verifySession(
	token: string | undefined,
	secret: string | undefined,
	now: number = Date.now(),
): boolean {
	if (!token || !secret) return false;

	const [version, exp, signature] = token.split(".");
	if (version !== "v1" || !exp || !signature) return false;

	const expected = signPayload(`v1.${exp}`, secret);
	if (signature.length !== expected.length) return false;
	if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;

	return Number(exp) > now;
}

// Allowlist de rutas que el panel puede leer y escribir. El `[A-Za-z0-9._-]` no
// admite `/`, así que no se puede salir del directorio con la ruta; el guard de
// `..` es redundante y está por si alguien relaja el regex más adelante.
const CONTENT_PATH = /^content\/(blog|legal)\/[A-Za-z0-9._-]+\.md$/;
const BLOG_SLUG = /^[a-z0-9][a-z0-9-]*$/;

export function isAllowedContentPath(value: unknown): value is string {
	if (typeof value !== "string" || value.includes("..")) return false;
	return CONTENT_PATH.test(value);
}

/**
 * El slug de un archivo que todavía no existe no pasa por `isAllowedContentPath`
 * (la ruta no está armada), así que se valida solo. Con esto se construyen tanto
 * la ruta del post nuevo como la carpeta de imágenes.
 */
export function isAllowedBlogSlug(value: unknown): value is string {
	return typeof value === "string" && BLOG_SLUG.test(value);
}
