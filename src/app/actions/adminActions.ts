"use server";

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";
import { Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";
import { CANNOT_APPROVE_PHOTO, FORBIDDEN_MESSAGE, MESSAGE_NOT_ABUSE, STATUS_SUCCESS, USER_ROLE_ADMIN } from "@/constants/actionConstants";

export async function getNonApprovedPhotos() {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        return prisma.photo.findMany({
            where: {
                isApproved: false
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function approvePhoto(photoId: string) {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        const photo = await prisma.photo.findUnique({
            where: {
                id: photoId
            },
            include: {
                member: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if (!photo || !photo.member || !photo.member.user) {
            throw new Error(CANNOT_APPROVE_PHOTO);
        }

        const { member } = photo;
        const userUpdate = member.user && member.user.image === null
            ? { image: photo.url } : {}
        const memberUpdate = member.image === null
            ? { image: photo.url } : {}

        if (Object.keys(userUpdate).length > 0) {
            await prisma.user.update({
                where: {
                    id: member.userId
                },
                data: userUpdate
            });
        }

        return prisma.member.update({
            where: {
                id: member.id
            },
            data: {
                ...memberUpdate,
                photos: {
                    update: {
                        where: {
                            id: photo.id
                        },
                        data: {
                            isApproved: true
                        }
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function rejectPhoto(photo: Photo) {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        if (photo.publicId) {
            await cloudinary.v2.uploader.destroy(photo.publicId);
        }

        return prisma.photo.delete({
            where: {
                id: photo.id
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getReportedMessages() {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        return prisma.message.findMany({
            where: {
                isAbuse: true
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function declineReportedMessage(messageId: string) {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        await prisma.message.update({
            where: {
                id: messageId
            },
            data: {
                isAbuse: false
            }
        });

        return { status: STATUS_SUCCESS, data: MESSAGE_NOT_ABUSE }
    } catch (error) {
        console.log(error);
        throw error;
    }
}