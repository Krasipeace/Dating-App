"use server";

import { prisma } from "@/lib/prisma";
import { addYears } from "@/lib/utilities";
import { MemberParams, PaginationRespone } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { AGE_RANGE, BOOLEAN_TRUE, GENDERS, ORDER_BY_DESC, ORDER_BY_UPDATED, PAGE_SIZE, START_PAGE_NUMBER } from "@/constants/actionConstants";

/**
 * Get members based on the specified parameters.
 * 
 * @param {MemberParams} params - The parameters to filter the members.
 * @returns {Promise<PaginationRespone<Member>>} The paginated list of members.
 * @description Retrieves a list of members based on the specified parameters.
 * @example 
 *     const members = await getMembers({ ageRange: "18,30", gender: "male", orderBy: "updated", pageNumber: "1", pageSize: "10", hasPhoto: "true" });
 */
export async function getMembers({ ageRange = AGE_RANGE, gender = GENDERS, orderBy = ORDER_BY_UPDATED, pageNumber = START_PAGE_NUMBER, pageSize = PAGE_SIZE, hasPhoto = BOOLEAN_TRUE }
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
            ...(hasPhoto === BOOLEAN_TRUE ? [{ image: { not: null } }] : [])
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
            orderBy: { [orderBy]: ORDER_BY_DESC },
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

/**
 * Get a member by user ID.
 * 
 * @param {string} userId - The user ID of the member.
 * @returns {Promise<Member | null>} The member object or null if not found.
 * @description Retrieves a member based on the user ID.
 * @example 
 *     const member = await getMemberByUserId("user123");
 */
export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({
            where: { userId }
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get photos of a member by user ID.
 * 
 * @param {string} userId - The user ID of the member.
 * @returns {Promise<Photo[] | null>} The list of photos or null if not found.
 * @description Retrieves the photos of a member based on the user ID.
 * @example 
 *     const photos = await getMemberPhotosByUserId("user123");
 */
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

/**
 * Update the last active timestamp of the authenticated user.
 * 
 * @returns {Promise<Member>} The updated member object.
 * @description Updates the last active timestamp of the authenticated user.
 * @example 
 *     const updatedMember = await updateLastActiveUser();
 */
export async function updateLastActiveUser() {
    const userId = await getAuthUserId();

    try {
        return prisma.member.update({
            where: {
                userId
            },
            data: {
                updated: new Date()
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}