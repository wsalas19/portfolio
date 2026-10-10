import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/constants";

// `next/og` viene con Next 15: no es una dependencia nueva.
export const alt = `${PROFILE.name} — full-stack developer for hire`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Reemplaza al `/og-image.png` que la metadata referenciaba y que nunca estuvo
 * en `public/`. Se genera en vez de mantener un PNG a mano para que el texto no
 * se desincronice de lo que dice el hero.
 */
export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					backgroundColor: "#1c1c1c",
					padding: "80px",
				}}
			>
				<div
					style={{
						fontSize: 26,
						letterSpacing: 8,
						textTransform: "uppercase",
						color: "#d4ff4d",
					}}
				>
					Available for freelance
				</div>
				<div style={{ fontSize: 84, fontWeight: 700, color: "#ffffff", marginTop: 28 }}>
					{PROFILE.name}
				</div>
				<div style={{ fontSize: 36, color: "#fb8983", marginTop: 20 }}>
					Full-stack product development &amp; technical review
				</div>
				<div style={{ fontSize: 28, color: "#9ca3af", marginTop: 48, display: "flex" }}>
					Next.js · React · TypeScript — wsalas.com
				</div>
			</div>
		),
		size,
	);
}
