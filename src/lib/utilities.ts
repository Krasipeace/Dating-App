import { Member } from "@prisma/client";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";

/**
 * Calculates the age based on the given date.
 * @param date - The birth date.
 * @returns The calculated age.
 */
export function calculateAge(date: Date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;

    return age;
}

/**
 * Adds a specified number of years to a given date.
 * @param date - The initial date.
 * @param years - The number of years to add.
 * @returns The new date with the added years.
 * @throws Will throw an error if the provided date is invalid.
 */
export function addYears(date: Date, years: number): Date {
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date provided');
    }

    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);

    if (newDate.getMonth() !== date.getMonth()) {
        newDate.setDate(0);
    }

    return newDate;
}

/**
 * Formats a given date into a specific string format.
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export function dateTimeFormatHandler(date: Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const padWithZero = (num: number) => num.toString().padStart(2, '0');

    return `${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear()} ${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}.${padWithZero(date.getSeconds())}`;
}

/**
 * Calculates the appropriate text size class based on the length of a member's name.
 * @param member - The member object containing the name.
 * @returns The text size class.
 */
export function calculateNameLength(member: Member) {
    const nameLength = member.name.length;
    let textSize;

    if (nameLength <= 10) {
        textSize = "text-2xl";
    } else if (nameLength <= 20) {
        textSize = "text-xl";
    } else if (nameLength <= 30) {
        textSize = "text-lg";
    } else if (nameLength <= 40) {
        textSize = "text-md";
    } else {
        textSize = "text-sm";
    }

    return textSize;
}

/**
 * Shortens a member's name if it exceeds 12 characters.
 * @param member - The member object containing the name.
 * @returns The shortened name with ellipsis if it exceeds 12 characters.
 */
export function longNameHandler(member: Member) {
    const nameLength = member.name.length;
    let shortName;

    if (nameLength > 12) {
        shortName = member.name.slice(0, 12) + "...";
    } else {
        shortName = member.name;
    }

    return shortName;
}

/**
 * Shortens a string if it exceeds 20 characters.
 * @param text - The string to shorten.
 * @returns The shortened string with ellipsis if it exceeds 20 characters.
 */
export function longStringHandler(text: string) {
    const nameLength = text.length;
    let shortName;

    if (nameLength > 20) {
        shortName = text.slice(0, 20) + "...";
    } else {
        shortName = text;
    }

    return shortName;
}

/**
 * Shortens a message if it exceeds a specified size.
 * @param text - The message to shorten.
 * @param size - The maximum allowed size before shortening. Default is 50.
 * @returns The shortened message with ellipsis if it exceeds the specified size, or null if the text is null or undefined.
 */
export function longMessageHandler(text?: string | null, size = 50) {
    if (!text) return null;

    if (text.length <= size) return text;

    return text.slice(0, size) + "...";
}

/**
 * Handles server errors and sets form errors using react-hook-form's setError function.
 * @param errorResponse - The error response object containing the error message or array of Zod issues.
 * @param setError - The react-hook-form setError function.
 */
export function handleFormServerErrors<TFieldValues extends FieldValues>(errorResponse: { error: string | ZodIssue[] }, setError: UseFormSetError<TFieldValues>) {
    if (Array.isArray(errorResponse.error)) {
        errorResponse.error.forEach((e) => {
            const fieldName = e.path.join('.') as Path<TFieldValues>
            setError(fieldName, { message: e.message });
        })
    } else {
        setError("root.serverError", { message: errorResponse.error });
    }
}

/**
 * Transforms an image URL to include specific Cloudinary transformations.
 * @param imageUrl - The original image URL.
 * @returns The transformed image URL, or null if the original URL is null or undefined.
 */
export function transformImageUrl(imageUrl?: string | null) {
    if (!imageUrl) return null;

    if (!imageUrl.includes("cloudinary")) return imageUrl;

    const uploadIndex = imageUrl.indexOf("/upload/") + "/upload/".length;
    const transformation = "c_fill,w_300,h_300,g_faces/";

    return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(uploadIndex)}`
}

/**
 * Generates a unique chat ID based on two user IDs.
 * @param a - The first user ID.
 * @param b - The second user ID.
 * @returns The generated chat ID.
 */
export function getChatId(a: string, b: string) {
    return a > b ? `${b}-${a}` : `${a}-${b}`
}