"use server";

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";
import { Member, Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";
import { ACTION_LOG_FAILED, ACTION_LOG_SUCCESS, ADMIN_APPROVE_PHOTO, ADMIN_DECLINE_MESSAGE, ADMIN_DELETED_MEMBER, ADMIN_REJECT_PHOTO, ADMIN_UPDATED_MEMBER, CANNOT_APPROVE_PHOTO, ERROR_LOGGING_AUDIT_ACTION, FORBIDDEN_MESSAGE, MEMBER_NOT_FOUND, MESSAGE_NOT_ABUSE, NO_USER_ID_FOUND, ORDER_BY_DESC, STATUS_SUCCESS, USER_ROLE_ADMIN } from "@/constants/actionConstants";
import { updateMemberSchema } from "@/lib/schemas/adminFunctionsSchema";
import { auth } from "@/auth";

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

        const adminId = await getAdminId();
        if (!adminId) throw new Error(NO_USER_ID_FOUND);

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

        await performAdminAction(
            "approve_photo",
            photo.id,
            "photo",
            ADMIN_APPROVE_PHOTO + photo.publicId
        );

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

        await performAdminAction(
            "reject_photo",
            photo.id,
            "photo",
            ADMIN_REJECT_PHOTO + photo.publicId
        );

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

        await performAdminAction(
            "decline_reported_message",
            messageId,
            "message",
            ADMIN_DECLINE_MESSAGE
        );

        return { status: STATUS_SUCCESS, data: MESSAGE_NOT_ABUSE }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function logAuditAction(adminId: string, action: string, entityId: string | null, entityType: string, details: string | null = null) {
    try {
        await prisma.auditLog.create({
            data: {
                adminId,
                action,
                entityId,
                entityType,
                details,
            },
        });
    } catch (error) {
        console.error(ERROR_LOGGING_AUDIT_ACTION, error);
    }
}

export async function performAdminAction(action: string, entityId: string | null, entityType: string, details: string | null = null) {
    try {
        const adminId = await getAdminId();
        await logAuditAction(adminId, action, entityId, entityType, details);

        console.log(ACTION_LOG_SUCCESS);
    } catch (error) {
        console.error(ACTION_LOG_FAILED, error);
    }
}

export async function getAuditLogs() {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        return prisma.auditLog.findMany({
            orderBy: {
                timestamp: ORDER_BY_DESC
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllMembers(): Promise<Member[]> {
    return await prisma.member.findMany();
}

export async function updateMember(memberId: string, data: any) {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        const validatedData = updateMemberSchema.parse(data);

        const updatedMember = await prisma.member.update({
            where: { id: memberId },
            data: validatedData,
        });

        await performAdminAction(
            "update_member",
            memberId,
            "member",
            ADMIN_UPDATED_MEMBER + memberId
        );

        return { status: STATUS_SUCCESS, data: updatedMember };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteMember(memberId: string) {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error(FORBIDDEN_MESSAGE);

        const member = await prisma.member.findUnique({
            where: { id: memberId },
        });
        if (!member) throw new Error(MEMBER_NOT_FOUND);

        await prisma.photo.deleteMany({ where: { memberId } });
        await prisma.like.deleteMany({ where: { OR: [{ sourceUserId: memberId }, { targetUserId: memberId }] } });
        await prisma.message.deleteMany({ where: { OR: [{ senderId: memberId }, { recipientId: memberId }] } });

        const deletedMember = await prisma.member.delete({
            where: { id: memberId },
        });

        await performAdminAction(
            "delete_member",
            memberId,
            "member",
            ADMIN_DELETED_MEMBER + memberId
        );

        return { status: STATUS_SUCCESS, data: deletedMember };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAdminId() {
    const session = await auth();

    const userId = session?.user.id;
    if (!userId) throw new Error(NO_USER_ID_FOUND);

    return userId;
}