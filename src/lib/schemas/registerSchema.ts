import { z } from "zod";
import { calculateAge } from "../utilities";
import { NAME_REQUIRED, NAME_MAX_LENGTH, EMAIL_INVALID, PASSWORD_MIN_LENGTH, DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH, CITY_REQUIRED, CITY_MAX_LENGTH, COUNTRY_REQUIRED, COUNTRY_MAX_LENGTH, DATE_OF_BIRTH_REQUIRED, AGE_REQUIREMENT, AGE_REQUIREMENT_MIN_VALUE, BIRTH_DATE_REQ_MIN_VALUE, DESCRIPTION_REQ_MAX_LENGTH, DESCRIPTION_REQ_MIN_LENGTH, LOCATION_REQ_MAX_LENGTH, LOCATION_REQ_MIN_LENGTH, NAME_REQ_MAX_LENGTH, NAME_REQ_MIN_LENGTH, PASSWORD_REQ_LENGTH, GENDER_REQUIREMENT_VALUE } from "@/constants/schemaConstants";

export const registerSchema = z.object({
    name: z.string()
        .min(NAME_REQ_MIN_LENGTH, { message: NAME_REQUIRED })
        .max(NAME_REQ_MAX_LENGTH, { message: NAME_MAX_LENGTH }),
    email: z.string().email({
        message: EMAIL_INVALID,
    }),
    password: z.string().min(PASSWORD_REQ_LENGTH, {
        message: PASSWORD_MIN_LENGTH,
    }),
});

export const profileSchema = z.object({
    gender: z.string().min(GENDER_REQUIREMENT_VALUE),
    description: z.string()
        .min(DESCRIPTION_REQ_MIN_LENGTH, { message: DESCRIPTION_MIN_LENGTH })
        .max(DESCRIPTION_REQ_MAX_LENGTH, { message: DESCRIPTION_MAX_LENGTH }),
    city: z.string()
        .min(LOCATION_REQ_MIN_LENGTH, { message: CITY_REQUIRED })
        .max(LOCATION_REQ_MAX_LENGTH, { message: CITY_MAX_LENGTH }),
    country: z.string()
        .min(LOCATION_REQ_MIN_LENGTH, { message: COUNTRY_REQUIRED })
        .max(LOCATION_REQ_MAX_LENGTH, { message: COUNTRY_MAX_LENGTH }),
    birthDate: z.string()
        .min(BIRTH_DATE_REQ_MIN_VALUE, { message: DATE_OF_BIRTH_REQUIRED })
        .refine(inputAge => {
            const age = calculateAge(new Date(inputAge));
            return age >= AGE_REQUIREMENT_MIN_VALUE;
        }, { message: AGE_REQUIREMENT }),
});

export const userRegisterSchema = registerSchema.and(profileSchema);

export type RegisterSchema = z.infer<typeof registerSchema & typeof profileSchema>

export type ProfileSchema = z.infer<typeof profileSchema>