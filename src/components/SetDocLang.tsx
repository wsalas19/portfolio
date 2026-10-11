"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/types";

/**
 * El `lang` del `<html>` lo fija `app/layout.tsx` en `en`, y un layout anidado no
 * puede volver a renderizar `<html>`. Sin esto, `/es` se declara inglés ante los
 * lectores de pantalla y ante Google.
 *
 * ponytail: se corrige después de hidratar, así que el HTML del servidor sale con
 * `lang="en"` y el atributo cambia en el cliente. La alternativa limpia —un
 * `app/[locale]/layout.tsx` que reciba `params`— obliga a mover todas las rutas
 * del sitio (blog, tools, admin, legales) bajo ese segmento y les cambiaría la
 * URL. Para un atributo, no.
 */
export default function SetDocLang({ locale }: { locale: Locale }) {
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	return null;
}
