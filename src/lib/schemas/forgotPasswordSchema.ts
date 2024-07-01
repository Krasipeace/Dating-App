import { z } from "zod";

export const forgotPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    confirmedPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
}).refine(data => data.password === data.confirmedPassword, {
    message: "Passwords do not match.",
    path: ["confirmedPassword"]
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>