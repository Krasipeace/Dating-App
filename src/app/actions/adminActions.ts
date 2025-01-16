"use server";

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";
import { Member, Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";
import { ACTION_LOG_FAILED, ACTION_LOG_SUCCESS, ADMIN_APPROVE_PHOTO, ADMIN_COULT_NOT_UPDATE_CHAT_POSSIBILITY, ADMIN_DECLINE_MESSAGE, ADMIN_DELETED_MEMBER, ADMIN_REJECT_PHOTO, ADMIN_UPDATED_CHAT_POSSIBILITY, ADMIN_UPDATED_MEMBER, CANNOT_APPROVE_PHOTO, ERROR_LOGGING_AUDIT_ACTION, FAILED_TO_UPDATE_MESSAGE_POSSIBILITY, FORBIDDEN_MESSAGE, MEMBER_NOT_FOUND, MESSAGE_NOT_ABUSE, NO_USER_ID_FOUND, ORDER_BY_DESC, STATUS_SUCCESS, USER_ROLE_ADMIN } from "@/constants/actionConstants";
import { updateMemberSchema } from "@/lib/schemas/adminFunctionsSchema";
import { auth } from "@/auth";

/**
 * Retrieves a list of photos that have not been approved.
 * 
 * @returns A list of photos that have not been approved.
 * @throws An error if the database query fails.
 */
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

/**
 * Approves a photo that has not been approved.
 * 
 * @param photoId - The ID of the photo to approve.
 * @returns The approved photo.
 * @throws An error if the database query fails.
 */
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

/**
 * Rejects a photo that has not been approved.
 * 
 * @param photo - The photo to reject.
 * @returns The rejected photo.
 * @throws An error if the database query fails.
 * @example
 *     await rejectPhoto(photo);
 */
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

/**
 * Retrieves a list of reported messages.
 * 
 * @returns A list of reported messages.
 * @throws An error if the database query fails.
 */
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

/**
 * Approves a reported message.
 * 
 * @param messageId - The ID of the message to approve.
 * @returns An object containing the status and the approved message data.
 * @throws An error if the database query fails.
 * @example
 *     await approveReportedMessage(messageId);
 */
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

/**
 * Logs an admin action to the audit log.
 * 
 * @param adminId - The ID of the admin performing the action.
 * @param action - The action to log.
 * @param entityId - The ID of the entity to log.
 * @param entityType - The type of entity to log.
 * @param details - Additional details to log.
 * @throws An error if the database query fails.
 * @returns A promise that resolves when the action is logged.
 * @example
 *     await logAuditAction("admin-id", "approve_photo", "photo-id", "photo", "Approved photo with ID photo-id");
 */
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

/**
 * Logs an admin action to the audit log.
 * 
 * @param action - The action to log.
 * @param entityId - The ID of the entity to log.
 * @param entityType - The type of entity to log.
 * @param details - Additional details to log.
 * @throws An error if the database query fails.
 * @returns A promise that resolves when the action is logged.
 * @example
 *     await performAdminAction("approve_photo", "photo-id", "photo", "Approved photo with ID photo-id");
 */
export async function performAdminAction(action: string, entityId: string | null, entityType: string, details: string | null = null) {
    try {
        const adminId = await getAdminId();
        await logAuditAction(adminId, action, entityId, entityType, details);

        console.log(ACTION_LOG_SUCCESS);
    } catch (error) {
        console.error(ACTION_LOG_FAILED, error);
    }
}

/**
 * Retrieves a list of audit logs.
 * 
 * @returns A list of audit logs.
 * @throws An error if the database query fails.
 * @example 
 *    await getAuditLogs();
 */
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

/**
 * Deletes a member and their associated data from the database.
 * 
 * @param memberId - The ID of the member to delete.
 * @returns An object containing the status and the deleted member data.
 * @throws An error if the user role is not admin, if the member is not found, or if the deletion fails.
 */
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

/**
 * Updates the chat possibility for a member.
 * 
 * @param userId - The ID of the user whose chat possibility is to be updated.
 * @param canSendMessages - A boolean indicating whether the user can send messages or not.
 * @returns The updated member object.
 * @throws Will throw an error if the user is not an admin, if the member is not found, or if the update fails.
 */
export async function updateChatPossibility(userId: string, canSendMessages: boolean) {
    try {
        const role = await getUserRole();
        if (role !== USER_ROLE_ADMIN) throw new Error("Forbidden");

        const member = await prisma.member.findUnique({
            where: { id: userId },
            select: { id: true, userId: true, canSendMessages: true }
        });
        if (!member) throw new Error(MEMBER_NOT_FOUND);

        await performAdminAction(
            "change_canSendMessages_member",
            userId,
            "member",
            ADMIN_UPDATED_CHAT_POSSIBILITY + userId
        );

        return await prisma.member.update({
            where: { id: userId },
            data: { canSendMessages },
        });
    } catch (error) {
        console.error(FAILED_TO_UPDATE_MESSAGE_POSSIBILITY, error);
        throw new Error(ADMIN_COULT_NOT_UPDATE_CHAT_POSSIBILITY);
    }
}

/**
 * Retrieves a list of all members.
 * 
 * @returns A list of all members.
 * @throws An error if the database query fails.
 * @example
 *    const members = await getAllMembers();
 */
export async function getAllMembers(): Promise<Member[]> {
    return await prisma.member.findMany();
}

/**
 * Updates a member's information in the database.
 *
 * @param memberId - The ID of the member to update.
 * @param data - The new data for the member.
 * @returns An object containing the status and the updated member data.
 * @throws Will throw an error if the user role is not admin or if there is an issue with the update.
 */
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