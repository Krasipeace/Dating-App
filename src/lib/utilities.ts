import { Member } from "@prisma/client";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";

export function calculateAge(date: Date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;

    return age;
}

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

export function longNameHandler(member: Member) {
    const nameLength = member.name.length;
    let shortName;

    if (nameLength > 10) {
        shortName = member.name.slice(0, 10) + "...";
    } else {
        shortName = member.name;
    }

    return shortName;
}

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

export function transformImageUrl(imageUrl?: string | null) {
    if (!imageUrl) return null;

    if (!imageUrl.includes("cloudinary")) return imageUrl;

    const uploadIndex = imageUrl.indexOf("/upload/") + "/upload/".length;
    const transformation = "c_fill,w_300,h_300,g_faces/";

    return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(uploadIndex)}`
}