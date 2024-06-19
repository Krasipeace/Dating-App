import { z } from "zod";

export const messageSchema = z.object({
    text: z.string().min(1, {
        message: "You cannot send empty messages"
    }).max(200, {
        message: "Messages can be at max 200 characters long"
    })
});

export type MessageSchema = z.infer<typeof messageSchema>