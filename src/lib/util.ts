import { differenceInYears } from "date-fns";

export function calculateAge(date: Date) {
    return differenceInYears(new Date(), date);
}