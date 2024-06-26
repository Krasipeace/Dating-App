"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addYears } from "@/lib/utilities";
import { UserFilters } from "@/types";
import { Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";

export async function getMembers(searchParams: UserFilters) {
    const session = await auth();

    if (!session?.user) return null;

    const ageRange = searchParams?.ageRange?.toString()?.split(",") || [18, 100];
    const currentDate = new Date();
    const minDateOfBirth = addYears(currentDate, -ageRange[1] - 1);
    const maxDateOfBirth = addYears(currentDate, -ageRange[0]);
    const orderBySelection = searchParams?.orderBy || "updated";
    const selectedGender = searchParams?.gender?.toString()?.split(",") || ["male", "female"];

    try {
        return prisma.member.findMany({
            where: {
                AND: [
                    { birthDate: { gte: minDateOfBirth } },
                    { birthDate: { lte: maxDateOfBirth } },
                    { gender: { in: selectedGender } }
                ],
                NOT: {
                    userId: session.user.id
                }
            },
            orderBy: { [orderBySelection]: "desc" }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({ where: { userId } });
    } catch (error) {
        console.log(error);
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    const member = await prisma.member.findUnique({
        where: { userId },
        select: { photos: true }
    });

    if (!member) return null;

    return member.photos.map(p => p) as Photo[];
}

export async function updateLastActiveUser() {
    const userId = await getAuthUserId();

    try {
        return prisma.member.update({
            where: { userId },
            data: { updated: new Date() }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}