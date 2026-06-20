import { NextResponse } from 'next/server';

export function middleware() {
	const response = NextResponse.next();

	// Content Security Policy - relaxed for WebGL and development
	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com blob:",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https: blob:",
			"font-src 'self' data:",
			"connect-src 'self' https://wsalas.tech https://www.google-analytics.com",
			"frame-src 'none'",
			"object-src 'none'",
			"base-uri 'self'",
			"form-action 'self'",
			"frame-ancestors 'none'",
			"upgrade-insecure-requests",
			"worker-src 'self' blob:"
		].join('; ')
	);

	// Security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	response.headers.set('X-XSS-Protection', '1; mode=block');

	// Remove server information
	response.headers.delete('Server');
	response.headers.delete('X-Powered-By');

	return response;
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
