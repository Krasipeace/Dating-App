import { EMAIL_INVALID, PASSWORD_MIN_LENGTH, PASSWORD_REQ_LENGTH } from "@/constants/schemaConstants";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({
        message: EMAIL_INVALID,
    }),
    password: z.string().min(PASSWORD_REQ_LENGTH, {
        message: PASSWORD_MIN_LENGTH,
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
