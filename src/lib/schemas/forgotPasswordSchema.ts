import { PASSWORD_MIN_LENGTH, PASSWORD_REQ_LENGTH, PASSWORDS_DO_NOT_MATCH } from "@/constants/schemaConstants";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
    password: z.string().min(PASSWORD_REQ_LENGTH, {
        message: PASSWORD_MIN_LENGTH,
    }),
    confirmedPassword: z.string().min(PASSWORD_REQ_LENGTH, {
        message: PASSWORD_MIN_LENGTH,
    }),
}).refine(data => data.password === data.confirmedPassword, {
    message: PASSWORDS_DO_NOT_MATCH,
    path: ["confirmedPassword"],
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
