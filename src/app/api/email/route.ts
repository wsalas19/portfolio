import { NextResponse } from "next/server";
import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";

emailjs.init({
	publicKey: process.env.EMAILJS_PUBLIC_KEY!,
	privateKey: process.env.EMAILJS_PRIVATE_KEY!,
	limitRate: {
		throttle: 10000, // 10s
	},
});

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const response: EmailJSResponseStatus = await emailjs.send(
			process.env.EMAILJS_SERVICE_ID!,
			process.env.EMAILJS_TEMPLATE_ID!,
			body, // your email template params
		);

		if (response.status === 200) {
			return NextResponse.json({
				ok: true,
				message: "Email sent successfully",
			});
		} else {
			throw new Error("Failed to send email");
		}
	} catch (error) {
		console.error("Email send error:", error);
		return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
	}
}
