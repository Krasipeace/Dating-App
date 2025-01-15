"use server"

import { MemberEditSchema, memberEditSchema } from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { ORDER_BY_DESC, SET_MAIN_IMAGE_ERROR, SOMETHING_WENT_WRONG, STATUS_ERROR, STATUS_SUCCESS } from "@/constants/actionConstants";

/**
 * Update user profile
 * 
 * @param {MemberEditSchema} data - The updated profile data.
 * @param {boolean} nameUpdated - Flag indicating if the user's name should be updated.
 * @returns {Promise<ActionResult<Member>>} The result of the profile update operation.
 * @description Updates the user's profile information in the database.
 * @example
 *    const result = await updateProfile({ name: "John Doe", city: "New York" }, true);
 *    if (result.status === STATUS_SUCCESS) {
 *        console.log(result.data);
 *    } else {
 *        console.error(result.error);
 *    }
 * @throws An error if the database query or validation fails.
 */
export async function updateProfile(data: MemberEditSchema, nameUpdated: boolean): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();

        const validated = memberEditSchema.safeParse(data);
        if (!validated.success) return { status: STATUS_ERROR, error: validated.error.errors }

        const { name, description, city, country } = validated.data;

        if (nameUpdated) {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name
                }
            });
        }

        const member = await prisma.member.update({
            where: {
                userId
            },
            data: {
                name, description, city, country
            }
        });

        return { status: STATUS_SUCCESS, data: member }
    } catch (error) {
        console.log(error);

        return { status: STATUS_ERROR, error: SOMETHING_WENT_WRONG }
    }
}

/**
 * Add an image to the user's profile and store it in Cloudinary
 * 
 * @param {string} url - The URL of the image to be added.
 * @param {string} publicId - The public ID of the image in Cloudinary.
 * @returns {Promise<Member>} The updated user information with the new image.
 * @description Adds an image to the user's profile and associates it with Cloudinary for storage.
 * @example
 *    await addImage("https://example.com/image.jpg", "cloudinary-image-id");
 * @throws An error if the database query fails or Cloudinary operation encounters an issue.
 */
export async function addImage(url: string, publicId: string) {
    try {
        const userId = await getAuthUserId();

        return prisma.member.update({
            where: {
                userId
            },
            data: {
                photos: {
                    create: [{ url, publicId }]
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Set a specific photo as the main image for the user's profile
 * 
 * @param {Photo} photo - The photo object to set as the main image.
 * @returns {Promise<Member>} The updated user information with the new main image.
 * @description Updates the user's profile to set the given photo as the main image.
 * @example
 *    await setMainImage(photo);
 * @throws An error if the photo is not approved or the database query fails.
 */
export async function setMainImage(photo: Photo) {
    if (!photo.isApproved) throw new Error(SET_MAIN_IMAGE_ERROR);

    try {
        const userId = await getAuthUserId();

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                image: photo.url
            }
        });

        return prisma.member.update({
            where: {
                userId
            },
            data: {
                image: photo.url
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Retrieve user information based on the user ID from the token payload
 * 
 * @returns {Promise<Pick<Member, 'name' | 'image'>>} The user's name and profile image.
 * @description Fetches user information, including the name and profile image, using the user ID derived from the token payload.
 * @example
 *    const userInfo = await getUserInfo();
 * @throws An error if the database query fails.
 */
export async function getUserInfo() {
    try {
        const userId = await getAuthUserId();

        return prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                image: true
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Remove an image from the user's profile and delete it from Cloudinary
 * 
 * @param {Photo} photo - The photo object to be removed.
 * @returns {Promise<Member>} The updated user information after the image is removed.
 * @description Deletes a photo from the user's profile and removes it from Cloudinary.
 * @example
 *    await removeImage(photo);
 * @throws An error if the database query or Cloudinary operation fails.
 */
export async function removeImage(photo: Photo) {
    try {
        const userId = await getAuthUserId();

        if (photo.publicId) {
            await cloudinary.v2.uploader.destroy(photo.publicId);
        }

        return prisma.member.update({
            where: {
                userId
            },
            data: {
                photos: {
                    delete: { id: photo.id }
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Retrieve the top 10 most liked users
 * 
 * @returns {Promise<Member[]>} A list of the top 10 users with the highest number of likes.
 * @description Fetches the top 10 users based on the count of likes they have received.
 * @example
 *    const topLikedUsers = await getTopLikedUsers();
 * @throws An error if the database query fails.
 */
export async function getTopLikedUsers() {
    try {
        return prisma.member.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        targetLikes: true
                    }
                }
            },
            orderBy: {
                targetLikes: {
                    _count: ORDER_BY_DESC
                }
            },
            take: 10
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}