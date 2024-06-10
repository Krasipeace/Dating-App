import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    })
})

export type LoginSchema = z.infer<typeof loginSchema>