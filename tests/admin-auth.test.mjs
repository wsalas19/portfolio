// Chequeo de la frontera de seguridad del panel /admin.
//
//   node --test tests/admin-auth.test.mjs
//
// Es .mjs a propósito: queda fuera del `include` de tsconfig.json, así que `tsc`
// no lo mira y no hay que tocar la config para poder importar `./auth.ts`.
// Solo prueba módulos puros: `server.ts` importa "server-only" y explota fuera
// del bundler de React Server Components.
import assert from "node:assert/strict";
import test from "node:test";
import {
	checkPassword,
	isAllowedBlogSlug,
	isAllowedContentPath,
	signSession,
	verifySession,
} from "../src/lib/admin/auth.ts";

const SECRET = "un-secreto-de-prueba-suficientemente-largo";

test("checkPassword compara de verdad", () => {
	assert.equal(checkPassword("correcta", "correcta"), true);
	assert.equal(checkPassword("incorrecta", "correcta"), false);
});

test("checkPassword falla cerrado cuando la env no está configurada", () => {
	// Sin este guard, sha256("") === sha256("") dejaría entrar con la contraseña
	// en blanco a un servidor sin ADMIN_PASSWORD.
	assert.equal(checkPassword("", undefined), false);
	assert.equal(checkPassword("", ""), false);
	assert.equal(checkPassword("algo", undefined), false);
});

test("la sesión firmada se verifica y vence", () => {
	const now = 1_700_000_000_000;
	const token = signSession(SECRET, now);

	assert.ok(token);
	assert.equal(verifySession(token, SECRET, now), true);
	assert.equal(verifySession(token, SECRET, now + 60_000), true);
	assert.equal(verifySession(token, SECRET, now + 8 * 24 * 60 * 60 * 1000), false);
});

test("una firma alterada o un secreto distinto no pasan", () => {
	const now = 1_700_000_000_000;
	const token = signSession(SECRET, now);
	const tampered = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;

	assert.equal(verifySession(tampered, SECRET, now), false);
	assert.equal(verifySession(token, "otro-secreto-distinto-aaaaaa", now), false);
	assert.equal(verifySession(token, undefined, now), false);
	assert.equal(verifySession(undefined, SECRET, now), false);
	assert.equal(verifySession("v2.9999999999999.deadbeef", SECRET, now), false);
});

test("signSession devuelve null si no hay secreto", () => {
	assert.equal(signSession(undefined), null);
	assert.equal(signSession(""), null);
});

test("rutas de contenido: se aceptan solo los archivos reales del repo", () => {
	const reales = [
		"content/blog/barranquilla-verde-desigualdad-2026.md",
		"content/blog/glm-models-alternative-2026.md",
		"content/blog/react-enhancements-2024.md",
		"content/blog/skill-files-agentic-coding-2026.md",
		"content/blog/twitter-api-nesting-map-2026.md",
		"content/blog/twitter-thread-unroller-2026.md",
		"content/legal/privacidad.md",
		"content/legal/terminos.md",
	];

	for (const ruta of reales) {
		assert.equal(isAllowedContentPath(ruta), true, ruta);
	}

	const rechazadas = [
		"content/blog/../../../etc/passwd",
		"content/blog/../../src/lib/env.ts",
		"/content/blog/x.md",
		"content/blog/sub/x.md",
		"content/other/x.md",
		"content/blog/x.mdx",
		"content/blog/x.txt",
		"src/lib/env.ts",
		"",
		42,
		null,
		undefined,
		{},
	];

	for (const ruta of rechazadas) {
		assert.equal(isAllowedContentPath(ruta), false, String(ruta));
	}
});

test("slug de blog", () => {
	assert.equal(isAllowedBlogSlug("nuevo-post-2026"), true);
	assert.equal(isAllowedBlogSlug("a"), true);

	for (const slug of ["../x", "Mayusculas", "con espacio", "-empieza-con-guion", "", "a/b", 7, null]) {
		assert.equal(isAllowedBlogSlug(slug), false, String(slug));
	}
});
