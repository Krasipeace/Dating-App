import { z } from "zod";

export const memberEditSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!"
    }).max(80, {
        message: "Name can be at max 80 characters long."
    }),
    description: z.string().min(10, {
        message: "Write something about yourself"
    }).max(1000, {
        message: "Description can be at max 1000 characters long."
    }),
    city: z.string().min(2, {
        message: "City is required!"
    }).max(176, {
        message: "Did you know... Longest City name on Earth is 176 symbols long ;)"
    }),
    country: z.string().min(2, {
        message: "Country is required!"
    }).max(56, {
        message: "Did you know... Longest country name on Earth is 56 symbols long ;)"
    })
})

export type MemberEditSchema = z.infer<typeof memberEditSchema>