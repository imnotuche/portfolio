import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: `
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Mail error:", err);
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
}