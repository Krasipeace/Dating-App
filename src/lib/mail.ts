import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
    const link = `http://localhost:3001/verify-email?token=${token}`;

    return resend.emails.send({
        from: "heartbound@resend.dev",
        to: email,
        subject: "HeartBound - Verification Email",
        html: `
            <h1>Verify your email address</h1>
            <p>Click the link below to verify your email address</p>
            <a href="${link}">Confirm Registration with this email</a>
        `
    })
}