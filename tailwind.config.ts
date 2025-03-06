import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
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
			colors: {
				border: "#2e3320", // Using palette.alt for borders
				input: "#1d1e2c", // Using palette.card for input backgrounds
				ring: "#fb8983", // Using palette.pink for focus rings
				background: "#1d1e2c", // Using palette.card for main background
				foreground: "#ffffff", // White text for contrast
				primary: {
					DEFAULT: "#fb8983", // palette.pink as primary
					foreground: "#1d1e2c", // palette.card for contrast
				},
				secondary: {
					DEFAULT: "#bef728", // palette.lime as secondary
					foreground: "#1d1e2c", // palette.card for contrast
				},
				destructive: {
					DEFAULT: "#ff4343", // New red for destructive actions
					foreground: "#ffffff",
				},
				muted: {
					DEFAULT: "#2e3320", // palette.alt for muted backgrounds
					foreground: "#a1a1aa", // Subtle text color
				},
				accent: {
					DEFAULT: "#a2a206", // palette.olive as accent
					foreground: "#ffffff",
				},
				popover: {
					DEFAULT: "#1d1e2c", // palette.card for popovers
					foreground: "#ffffff",
				},
				card: {
					DEFAULT: "#1d1e2c", // palette.card
					foreground: "#ffffff",
				},
				alt: {
					DEFAULT: "#2e3320",
					foreground: "#ffffff",
				},
				// Keep original palette
				palette: {
					lime: "#bef728",
					olive: "#a2a206",
					pink: "#fb8983",
					card: "#1d1e2c",
					alt: "#2e3320",
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
