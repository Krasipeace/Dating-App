import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({
        message: "Write a valid email(example@domain.com)"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    }).max(50, {
        message: "Password can be at max 50 characters long"
    })
})

export type LoginSchema = z.infer<typeof loginSchema>