/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ydpmtaowqiacdyiwbxxm.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/portfolio-assets/**",
			},
		],
	},
};

export default nextConfig;
