// Datos legales compartidos con el cliente (el formulario de contacto los envía
// como evidencia). El contenido de /privacidad y /terminos vive en
// content/legal/*.md y se cargan desde "@/lib/legal/content".

// Versión = fecha de entrada en vigencia. Cambiarla obliga a volver a pedir
// autorización (art. 9 Ley 1581), por eso viaja en el correo del formulario.
export const POLITICA_VERSION = "2026-10-03";

// Derivada, para no mantener a mano la misma fecha en dos formatos.
// timeZone UTC: "2026-10-03" se parsea como medianoche UTC y no debe correrse
// un día según el huso del visitante.
export const POLITICA_FECHA = new Intl.DateTimeFormat("es-CO", {
	dateStyle: "long",
	timeZone: "UTC",
}).format(new Date(POLITICA_VERSION));
