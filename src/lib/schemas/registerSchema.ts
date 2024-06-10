import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters"
    }),
    email: z.string().email({
        message: "Write a valid email (example@domain.com)"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>