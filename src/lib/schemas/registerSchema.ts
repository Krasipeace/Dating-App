import { z } from "zod";
import { calculateAge } from "../utilities";

export const registerSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }).max(50, {
        message: "Name can be at max 50 characters long"
    }),
    email: z.string().email({
        message: "Write a valid email (example@domain.com)"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    }).max(50, {
        message: "Password can be at max 50 characters long"
    }),
});

export const profileSchema = z.object({
    gender: z.string().min(1),
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
    }),
    birthDate: z.string().min(1, {
        message: "Date of birth is required"
    }).refine(InputAge => {
        const age = calculateAge(new Date(InputAge));
        return age >= 18;
    }, {
        message: "You must be at least 18 years old to register"
    }),
});

export const userRegisterSchema = registerSchema.and(profileSchema);

export type RegisterSchema = z.infer<typeof registerSchema & typeof profileSchema>