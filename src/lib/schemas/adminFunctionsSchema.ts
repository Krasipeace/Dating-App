import { z } from "zod";
import { GENDERS } from "@/constants/actionConstants";

export const updateMemberSchema = z.object({
    name: z.string().optional(),
    gender: z.enum([GENDERS]).optional(),
    birthDate: z.date().optional(),
    description: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    image: z.string().url().optional(),
});
