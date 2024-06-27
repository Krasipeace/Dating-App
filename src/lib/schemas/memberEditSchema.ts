import { z } from "zod";

export const memberEditSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!"
    }).max(50, {
        message: "Name can be at max 50 characters long."
    }),
    description: z.string().min(10, {
        message: "Write something about yourself"
    }).max(1000, {
        message: "Description can be at max 1000 characters long."
    }),
    city: z.string().min(2, {
        message: "City is required!"
    }).max(28, {
        message: "City name can be at max 28 characters long"
    }),
    country: z.string().min(2, {
        message: "Country is required!"
    }).max(28, {
        message: "Country name can be at max 28 characters long"
    })
})

export type MemberEditSchema = z.infer<typeof memberEditSchema>