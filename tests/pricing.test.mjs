// Reglas de precio y enlace de WhatsApp.
//
//   node --test tests/pricing.test.mjs
//
// `.mjs` por la misma razón que `admin-auth.test.mjs`: queda fuera del `include`
// de tsconfig.json y puede importar el `.ts` directamente usando el
// type-stripping de Node. `pricing.ts` no importa nada con el alias `@/` a
// propósito, así que no hace falta ningún loader.
import assert from "node:assert/strict";
import test from "node:test";
import {
	amountFor,
	currencyForCountry,
	fillTemplate,
	formatPrice,
	whatsappUrl,
} from "../src/lib/pricing.ts";

test("solo Colombia recibe pesos", () => {
	assert.equal(currencyForCountry("CO"), "COP");
	assert.equal(currencyForCountry("co"), "COP");
	assert.equal(currencyForCountry(" CO "), "COP");
	assert.equal(currencyForCountry("US"), "USD");
	assert.equal(currencyForCountry("MX"), "USD");
	assert.equal(currencyForCountry(undefined), "USD");
	assert.equal(currencyForCountry(null), "USD");
	assert.equal(currencyForCountry(""), "USD");
});

test("amountFor devuelve el precio escrito a mano, no una conversión", () => {
	const price = { usd: 500, cop: 1_500_000 };
	assert.equal(amountFor(price, "USD"), 500);
	assert.equal(amountFor(price, "COP"), 1_500_000);
});

test("formatPrice no muestra decimales y sí el código de moneda", () => {
	const usd = formatPrice(1500, "USD");
	const cop = formatPrice(1_500_000, "COP");

	assert.match(usd, /1,500/);
	assert.match(usd, /USD$/);
	assert.doesNotMatch(usd, /\.00/);

	// es-CO agrupa con punto y mete un espacio duro después del "$".
	assert.match(cop, /1\.500\.000/);
	assert.match(cop, /COP$/);
	assert.doesNotMatch(cop, /,00/);
});

test("whatsappUrl arma wa.me sin separadores y codifica el mensaje", () => {
	const url = whatsappUrl("+57 300 123 4567", "Hola, me interesa el plan de $1,500");

	assert.ok(url);
	assert.ok(url.startsWith("https://wa.me/573001234567?text="));
	// El mensaje va codificado: nada de espacios ni "$" crudos en el query.
	assert.equal(url.includes(" "), false);
	assert.equal(url.includes("$"), false);
	assert.equal(
		decodeURIComponent(url.split("?text=")[1]),
		"Hola, me interesa el plan de $1,500",
	);
});

test("whatsappUrl devuelve null cuando el número no sirve", () => {
	// Así el botón cae al calendario en vez de apuntar a un wa.me roto.
	assert.equal(whatsappUrl(undefined, "hola"), null);
	assert.equal(whatsappUrl("", "hola"), null);
	assert.equal(whatsappUrl("123", "hola"), null);
});

test("fillTemplate reemplaza las claves y deja visible la que falta", () => {
	assert.equal(
		fillTemplate("Hola {name}, te interesa {plan}", { name: "William", plan: "SEO" }),
		"Hola William, te interesa SEO",
	);
	// Una clave sin valor se deja tal cual: es un error de traducción visible,
	// no algo que se tape con un string vacío.
	assert.equal(fillTemplate("Hola {name}", {}), "Hola {name}");
});
