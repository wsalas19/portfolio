import { z } from "zod";

const envSchema = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	NEXT_PUBLIC_VERCEL_URL: z.string().url(),
	NEXT_PUBLIC_ENV: z.enum(["dev", "prod"]),
});

const {
	NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
	NEXT_PUBLIC_VERCEL_URL,
	NEXT_PUBLIC_ENV,
} = process.env;

const parsedResult = envSchema.safeParse({
	NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
	NEXT_PUBLIC_VERCEL_URL,
	NEXT_PUBLIC_ENV,
});

if (!parsedResult.success) {
	console.log(parsedResult.error);
	throw new Error("Invalid environment variables");
}

export const environmentVariables = parsedResult.data;

type EnvVarSchemaType = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvVarSchemaType {}
	}
}
