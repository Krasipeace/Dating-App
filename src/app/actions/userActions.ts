"use server"

import { MemberEditSchema, memberEditSchema } from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { ORDER_BY_DESC, SET_MAIN_IMAGE_ERROR, SOMETHING_WENT_WRONG, STATUS_ERROR, STATUS_SUCCESS } from "@/constants/actionConstants";

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