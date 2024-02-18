/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["ydpmtaowqiacdyiwbxxm.supabase.co"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ydpmtaowqiacdyiwbxxm.supabase.co",
				port: "",
				pathname: "/storage/v1/object/*/portfolio-assets/**",
			},
		],
	},
};

export default nextConfig;
