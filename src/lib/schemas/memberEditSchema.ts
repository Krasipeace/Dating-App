import { NAME_REQUIRED, NAME_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH, CITY_REQUIRED, CITY_MAX_LENGTH, COUNTRY_REQUIRED, COUNTRY_MAX_LENGTH, DESCRIPTION_REQ_MAX_LENGTH, DESCRIPTION_REQ_MIN_LENGTH, LOCATION_REQ_MAX_LENGTH, LOCATION_REQ_MIN_LENGTH, NAME_REQ_MAX_LENGTH, NAME_REQ_MIN_LENGTH } from "@/constants/schemaConstants";
import { z } from "zod";

export const memberEditSchema = z.object({
    name: z.string()
        .min(NAME_REQ_MIN_LENGTH, { message: NAME_REQUIRED })
        .max(NAME_REQ_MAX_LENGTH, { message: NAME_MAX_LENGTH }),
    description: z.string()
        .min(DESCRIPTION_REQ_MIN_LENGTH, { message: DESCRIPTION_MIN_LENGTH })
        .max(DESCRIPTION_REQ_MAX_LENGTH, { message: DESCRIPTION_MAX_LENGTH }),
    city: z.string()
        .min(LOCATION_REQ_MIN_LENGTH, { message: CITY_REQUIRED })
        .max(LOCATION_REQ_MAX_LENGTH, { message: CITY_MAX_LENGTH }),
    country: z.string()
        .min(LOCATION_REQ_MIN_LENGTH, { message: COUNTRY_REQUIRED })
        .max(LOCATION_REQ_MAX_LENGTH, { message: COUNTRY_MAX_LENGTH }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
