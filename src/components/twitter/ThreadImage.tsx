"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

// pbs.twimg.com acepta ?name=large para servir la foto en tamaño completo.
// Si la URL ya trae query, se encadena con &.
function largeUrl(url: string): string {
	return `${url}${url.includes("?") ? "&" : "?"}name=large`;
}

// Miniatura clicable que abre la imagen completa. El <dialog> se monta en un
// portal (: es flow content y no puede anidarse dentro del <p> que
// react-markdown genera alrededor de cada imagen). showModal() aporta gratis el
// cierre con Escape, el fondo inerte y el focus trap.
export function ThreadImage({ src, alt }: { src: string; alt: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<>
			{/* El botón limita el ancho (no la altura) para no cortar la línea de
			    lectura: w-full + h-auto respeta la relación de aspecto original. */}
			<button
				type="button"
				onClick={() => dialogRef.current?.showModal()}
				aria-label={`Ampliar imagen: ${alt}`}
				className="mx-auto block w-full cursor-zoom-in sm:max-w-md"
			>
				{/* width/height en 0 + w-full h-auto: Next genera el srcset sin
				    imponer una relación de aspecto que la foto no tiene. */}
				<Image
					src={src}
					alt={alt}
					width={0}
					height={0}
					sizes="(max-width: 640px) 100vw, 448px"
					className="h-auto w-full rounded-lg border border-white/10 transition-opacity duration-200 hover:opacity-90"
				/>
			</button>

			{mounted &&
				createPortal(
					// open:* en vez de flex a secas: un display puesto a mano gana sobre
					// el `dialog:not([open]){display:none}` del navegador, y el visor
					// quedaría visible al final del artículo aunque esté cerrado.
					<dialog
						ref={dialogRef}
						onClick={(e) => {
							// El click en el backdrop tiene como target el propio <dialog>.
							if (e.target === dialogRef.current) dialogRef.current?.close();
						}}
						className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90 open:flex open:flex-col open:items-center open:gap-6"
					>
						{/*eslint-disable-next-line @next/next/no-img-element -- el visor debe
						    servir la foto original de Twitter, no una copia del optimizador */}
						<img
							src={largeUrl(src)}
							alt={alt}
							className="max-h-[74vh] max-w-[88vw] rounded-2xl border border-white/20 object-contain"
						/>
						{/* Cierre debajo de la foto: al no superponerse, el borde de la
						    imagen nunca queda recortado por el botón. */}
						<button
							type="button"
							onClick={() => dialogRef.current?.close()}
							aria-label="Cerrar imagen"
							className="shrink-0 rounded-full border border-white/30 p-3.5 text-white/70 transition-colors hover:border-palette-lime hover:text-palette-lime"
						>
							<X size={20} />
						</button>
					</dialog>,
					document.body,
				)}
		</>
	);
}
