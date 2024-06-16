import { z } from "zod";

export const messageSchema = z.object({
    text: z.string().min(1, {
        message: "You cannot send empty messages"
    }).max(100, {
        message: "Messages can be at max 100 characters long"
    })
});

export type MessageSchema = z.infer<typeof messageSchema>