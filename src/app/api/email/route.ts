import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { Logger } from "@/lib/logger";
import { Resend } from "resend";

// Server-side validation schema with email injection protection
const emailSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name contains invalid characters"),
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .refine(email => !email.includes('\n') && !email.includes('\r'), "Invalid email format"),
  title: z.string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject too long")
    .refine(title => !title.includes('\n') && !title.includes('\r'), "Invalid subject format"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message too long")
    .refine(msg => !msg.includes('\r'), "Message contains invalid characters")
});

// In-memory rate limiting (resets on deployment)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): { allowed: boolean; resetAt?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  const maxRequests = 5;
  const windowMs = 3600000; // 1 hour

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, resetAt: record.resetTime };
  }

  record.count++;
  return { allowed: true };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL ||  'http://localhost:3000' || 'https://wsalasdev.site',

  ];

  if (!origin || !allowedOrigins.includes(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(request: Request) {
  // Get client IP from Vercel headers
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  // Check origin for CORS
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    process.env.SITE_URL || 'https://wsalasdev.site',
    'http://localhost:3000'
  ];

	if (!origin || !allowedOrigins.includes(origin)) {
		Logger.error(new Error('Forbidden'), { origin, allowedOrigins });
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  try {
    // Rate limiting check
    const { allowed, resetAt } = checkRateLimit(ip);
    if (!allowed) {
      Logger.security('RATE_LIMIT_EXCEEDED', { ip });
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          resetAt
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetAt?.toString() || '',
            'Retry-After': '3600'
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = emailSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.errors },
        { status: 400 }
      );
    }

    const data = validatedData.data;

    // Validate environment variables using env utility
    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.RESEND_TO_EMAIL) {
      Logger.error(new Error('Missing required environment variables'), { ip });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    console.log(env.RESEND_API_KEY)
    // Send email using Resend
    const resend = new Resend(env.RESEND_API_KEY);

    const emailData = {
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      subject: `Portfolio Contact: ${data.title}`,
      reply_to: data.email,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    };

    const { error } = await resend.emails.send(emailData);

    if (error) {
      Logger.error(new Error('Resend API error'), { ip, error: error.message });
      throw new Error('Failed to send email');
    }

    Logger.security('EMAIL_SENT', { ip, email: data.email });

    return NextResponse.json({
      ok: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    Logger.error(error as Error, { ip });
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
