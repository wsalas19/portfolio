import { z } from 'zod';

const envSchema = z.object({
  // Server-side variables
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  RESEND_TO_EMAIL: z.string().email().optional(),

  // Client-side variables (with defaults for production)
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://wsalasdev.site'),
});

const parsedEnv = envSchema.safeParse(process.env);

export const env = parsedEnv.success ? parsedEnv.data : {
  RESEND_API_KEY: undefined,
  RESEND_FROM_EMAIL: undefined,
  RESEND_TO_EMAIL: undefined,
  NEXT_PUBLIC_SITE_URL: 'https://wsalasdev.site'
};

// Validate on import (throws in development if missing)
if (process.env.NODE_ENV === 'development') {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw error;
  }
}
