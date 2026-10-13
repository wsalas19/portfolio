import type { Config } from "tailwindcss";

const config = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", "sans-serif"],
				display: ["var(--font-carme)", "sans-serif"],
			},
			zIndex: {
				// Escala única; reemplaza los `z-40/z-50/z-[70]/z-[100]` sueltos.
				dropdown: "40",
				nav: "50",
				overlay: "60",
				modal: "70",
				toast: "100",
			},
			colors: {
				border: "#2e3320", // palette.alt
				input: "#2e3320", // palette.alt
				ring: "#d4ff4d", // palette.lime — anillo de foco (DESIGN.md C4)
				background: "#1c1c1c", // canvas (DESIGN.md C2)
				foreground: "#ffffff",
				primary: {
					DEFAULT: "#fb8983", // palette.pink as primary
					foreground: "#111827", // gray-900, same ink the lime/pink buttons use
				},
				secondary: {
					DEFAULT: "#d4ff4d", // Lighter lime for better contrast on dark
					foreground: "#1a3300", // Darker green for light backgrounds
				},
				destructive: {
					DEFAULT: "#ff4343", // New red for destructive actions
					foreground: "#ffffff",
				},
				muted: {
					DEFAULT: "#2e3320", // palette.alt for muted backgrounds
					foreground: "#9ca3af", // gray-400, the muted text used elsewhere
				},
				accent: {
					DEFAULT: "#a2a206", // palette.olive as accent
					foreground: "#ffffff",
				},
				popover: {
					DEFAULT: "#121212", // palette.card (DESIGN.md C2)
					foreground: "#ffffff",
				},
				card: {
					DEFAULT: "#121212", // palette.card
					foreground: "#ffffff",
				},
				alt: {
					DEFAULT: "#2e3320",
					foreground: "#ffffff",
				},
				// Keep original palette
				palette: {
					lime: "#d4ff4d", // Improved for WCAG AA on dark backgrounds
					olive: "#a2a206",
					pink: "#fb8983",
					canvas: "#1c1c1c", // page background (DESIGN.md C2)
					card: "#121212",
					alt: "#2e3320",
					elevated: "#1a1a1a", // tool panels (twitter/threads)
					code: "#0d1117", // code block surface
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideIn: {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fadeIn: "fadeIn 0.5s ease-in-out",
				slideIn: "slideIn 0.5s ease-in-out",
				slideInDelayed: "slideIn 0.5s ease-in-out 0.2s",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
