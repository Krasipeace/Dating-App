"use server"

import { prisma } from "@/lib/prisma";
import { addYears } from "@/lib/utilities";
import { MemberParams, PaginationRespone } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";

export async function getMembers({ ageRange = "18,100", gender = "male,female", orderBy = "updated", pageNumber = "1", pageSize = "12", hasPhoto = "true" }
    : MemberParams): Promise<PaginationRespone<Member>> {
    const userId = await getAuthUserId();
    const [minAge, maxAge] = ageRange.split(",");
    const currentDate = new Date();
    const minDateOfBirth = addYears(currentDate, -maxAge - 1);
    const maxDateOfBirth = addYears(currentDate, -minAge);
    const selectedGender = gender.split(",");
    const page = parseInt(pageNumber);
    const limit = parseInt(pageSize);
    const skip = (page - 1) * limit;

    const whereClause = {
        AND: [
            { birthDate: { gte: minDateOfBirth } },
            { birthDate: { lte: maxDateOfBirth } },
            { gender: { in: selectedGender } },
            ...(hasPhoto === "true" ? [{ image: { not: null } }] : [])
        ],
        NOT: {
            userId
        }
    };

    try {
        const count = await prisma.member.count({
            where: whereClause,
        })

        const members = await prisma.member.findMany({
            where: whereClause,
            orderBy: { [orderBy]: "desc" },
            skip,
            take: limit
        });

        return {
            items: members,
            totalCount: count
        }
    } catch (error) {
        console.log(error);
        throw error;
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
    const currentUserId = await getAuthUserId();
    const member = await prisma.member.findUnique({
        where: { userId },
        select: {
            photos: {
                where: currentUserId === userId ? {} : { isApproved: true }
            }
        }
    });

    if (!member) return null;

    return member.photos as Photo[];
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