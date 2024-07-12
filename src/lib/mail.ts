import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(email: string, token: string) {
    const link = `${baseUrl}/verify-email?token=${token}`;
    const currentYear = new Date().getFullYear();
    const pLine = "color: #555; font-size: 16px; line-height: 1.5;";

    return resend.emails.send({
        from: "heartbound@resend.dev",
        to: email,
        subject: "HeartBound - Verification Email",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
                <h1 style="color: #333; text-align: center;">Welcome to HeartBound!</h1>
                <p style=${pLine}>Hi there,</p>
                <p style=${pLine}>
                    Thank you for registering. To get started, please confirm your email address by clicking the link below:
                </p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="${link}" style="background-color: green; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Confirm Your Email</a>
                </p>
                <p style=${pLine}>
                    If you did not create an account, no further action is required.
                </p>
                <p style=${pLine}>
                    Cheers,<br>
                    The HeartBound Team
                </p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    &copy; ${currentYear} HeartBound. All rights reserved.
                </p>
            </div>
        `
    })
}

export async function sendForgottenPasswordEmail(email: string, token: string) {
    const link = `${baseUrl}/reset-password?token=${token}`;
    const currentYear = new Date().getFullYear();
    const pLine = "color: #555; font-size: 16px; line-height: 1.5;"

    return resend.emails.send({
        from: "heartbound@resend.dev",
        to: email,
        subject: "HeartBound - Forgotten Password Email",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
                <h1 style="color: #333; text-align: center;">Reset Password</h1>
                <p style=${pLine}>Hi there,</p>
                <p style=${pLine}>
                    Click the link below to reset your password:
                </p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="${link}" style="background-color: green; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Reset Password</a>
                </p>
                <p style=${pLine}>
                    If you did not requested to reset your password, no further action is required.
                </p>
                <p style=${pLine}>
                    Cheers,<br>
                    The HeartBound Team
                </p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    &copy; ${currentYear} HeartBound. All rights reserved.
                </p>
            </div>
        `
    })
}
