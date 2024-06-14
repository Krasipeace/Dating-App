import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }).max(80, {
        message: "Name can be at max 80 characters long"
    }),
    email: z.string().email({
        message: "Write a valid email (example@domain.com)"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    }).max(50, {
        message: "Password can be at max 50 characters long"
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>