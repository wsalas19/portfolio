/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ydpmtaowqiacdyiwbxxm.supabase.co",
				port: "",
				pathname: "/storage/v1/object/*/portfolio-assets/**",
			},
			{
				protocol: "https",
				hostname: "i.ibb.co",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
