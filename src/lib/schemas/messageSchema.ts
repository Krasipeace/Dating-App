import { MESSAGE_MAX_LENGTH, MESSAGE_REQ_MAX_LENGTH, MESSAGE_REQ_MIN_LENGTH, MESSAGE_REQUIRED } from "@/constants/schemaConstants";
import { z } from "zod";

export const messageSchema = z.object({
    text: z.string()
        .min(MESSAGE_REQ_MIN_LENGTH, { message: MESSAGE_REQUIRED })
        .max(MESSAGE_REQ_MAX_LENGTH, { message: MESSAGE_MAX_LENGTH }),
});

export type MessageSchema = z.infer<typeof messageSchema>;
