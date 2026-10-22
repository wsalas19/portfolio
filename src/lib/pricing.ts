// Reglas de precio que no dependen de React ni del servidor, para que las pueda
// probar `node --test` directamente (ver `tests/pricing.test.mjs`). Este módulo
// no importa nada con el alias `@/`: el test corre con el type-stripping de
// Node, que no resuelve los paths de tsconfig.
import type { Currency, ServiceTrack } from "./types/globals";

// Solo Colombia recibe pesos. Un Set y no un `===` para que sumar un país sea
// una línea. Ojo: es el país de la IP, así que una VPN da la moneda equivocada.
// No es un cobro, es un precio en pantalla.
const PESO_COUNTRIES = new Set(["CO"]);

export function currencyForCountry(country: string | null | undefined): Currency {
	if (!country) return "USD";
	return PESO_COUNTRIES.has(country.trim().toUpperCase()) ? "COP" : "USD";
}

// El importe de un tier en la moneda que toque. No hay conversión: los dos
// números están escritos a mano en `constants.ts`.
export function amountFor(
	price: NonNullable<ServiceTrack["price"]>,
	currency: Currency,
): number {
	return currency === "COP" ? price.cop : price.usd;
}

const FORMAT_LOCALE: Record<Currency, string> = { USD: "en-US", COP: "es-CO" };

// Sin decimales en las dos monedas: los precios son redondos y céntimos solo
// agregan ruido. Se agrega el código ISO porque el símbolo "$" es el mismo en
// USD y en COP, así que solo no distingue nada.
export function formatPrice(amount: number, currency: Currency): string {
	const formatted = new Intl.NumberFormat(FORMAT_LOCALE[currency], {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);

	return `${formatted} ${currency}`;
}

// `https://wa.me/<número>?text=<mensaje>`. Devuelve `null` si el número no
// sirve (vacío, o el placeholder del `.env.example`): quien llama usa el
// calendario en ese caso, así el botón nunca queda muerto.
export function whatsappUrl(number: string | undefined, message: string): string | null {
	if (!number) return null;

	// wa.me quiere el número en formato internacional sin "+" ni separadores.
	const digits = number.replace(/\D/g, "");
	if (digits.length < 8) return null;

	return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

// Reemplazo de `{clave}` en las plantillas de `i18n`. Una clave que falta se
// deja visible a propósito: es un error de traducción, no algo que se tape.
export function fillTemplate(
	template: string,
	values: Record<string, string>,
): string {
	return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
