"use server";

import { MessageSchema, messageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult, MessageDto } from "@/types";
import { getAuthUserId, getUserRole } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { pusherServer } from "@/lib/pusher";
import { getChatId } from "@/lib/utilities";
import { ADMIN_APPROVE_MESSAGE, ORDER_BY_ASC, ORDER_BY_DESC, OUTBOX_CONTAINER, RECIPIENT_DELETED, RECIPIENT_ID, ROUTE_NEW_MESSAGE, ROUTE_PRIVATE_PREFIX, ROUTE_READ_MESSAGES, SENDER_DELETED, SENDER_ID, SOMETHING_WENT_WRONG, STATUS_ERROR, STATUS_SUCCESS, USER_ROLE_ADMIN } from "@/constants/actionConstants";
import { performAdminAction } from "./adminActions";

/**
 * Creates a new message and triggers pusher events for real-time updates.
 * 
 * @param receiverId - The ID of the message recipient.
 * @param data - The message data to be validated and saved.
 * @returns An ActionResult containing the created MessageDto or an error.
 * @throws An error if the database query fails.
 */
export async function createMessage(receiverId: string, data: MessageSchema): Promise<ActionResult<MessageDto>> {
    try {
        const userId = await getAuthUserId();

        const validated = messageSchema.safeParse(data);
        if (!validated.success) return { status: STATUS_ERROR, error: validated.error.errors }

        const { text } = validated.data;
        const message = await prisma.message.create({
            data: {
                text,
                recipientId: receiverId,
                senderId: userId
            },
            select: messageSelection
        });

        const messageDto = mapMessageToMessageDto(message);

        await pusherServer.trigger(getChatId(userId, receiverId), ROUTE_NEW_MESSAGE, messageDto);
        await pusherServer.trigger(`${ROUTE_PRIVATE_PREFIX}${receiverId}`, ROUTE_NEW_MESSAGE, messageDto);

        return { status: STATUS_SUCCESS, data: messageDto }
    } catch (error) {
        console.log(error);

        return { status: STATUS_ERROR, error: SOMETHING_WENT_WRONG }
    }
}

/**
 * Retrieves the message thread between the authenticated user and the specified recipient.
 * Marks unread messages as read and triggers pusher events for real-time updates.
 * 
 * @param recipientId - The ID of the message recipient.
 * @returns An object containing the messages and the count of newly read messages.
 * @throws An error if the database query fails.
 */
export async function getMessageThread(recipientId: string) {
    try {
        const userId = await getAuthUserId();

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        recipientId,
                        senderDeleted: false
                    },
                    {
                        senderId: recipientId,
                        recipientId: userId,
                        recipientDeleted: false
                    }
                ]
            },
            orderBy: {
                created: ORDER_BY_ASC
            },
            select: messageSelection
        });

        let readCount = 0;

        if (messages.length > 0) {
            const readMessageIds = messages.filter(m => m.dateRead === null && m.recipient?.userId === userId && m.sender?.userId === recipientId).map(m => m.id);


            await prisma.message.updateMany({
                where: { id: { in: readMessageIds } },
                data: { dateRead: new Date() }
            });

            readCount = readMessageIds.length;

            await pusherServer.trigger(getChatId(recipientId, userId), ROUTE_READ_MESSAGES, readMessageIds);
        }

        const messagesToReturn = messages.map(message => mapMessageToMessageDto(message));

        return { messages: messagesToReturn, readCount }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Retrieves messages for the authenticated user based on the specified container (inbox or outbox).
 * Supports pagination using a cursor and limit.
 * 
 * @param container - The container type (inbox or outbox).
 * @param cursor - The cursor for pagination.
 * @param limit - The maximum number of messages to retrieve.
 * @returns An object containing the messages and the next cursor for pagination.
 * @throws An error if the database query fails.
 */
export async function getMessagesByContainer(container?: string | null, cursor?: string, limit = 10) {
    try {
        const userId = await getAuthUserId();
        const selectorConditions = {
            [container === OUTBOX_CONTAINER ? SENDER_ID : RECIPIENT_ID]: userId,
            ...(container === OUTBOX_CONTAINER ? { senderDeleted: false } : { recipientDeleted: false })
        }

        const messages = await prisma.message.findMany({
            where: {
                ...selectorConditions,
                ...(cursor ? { created: { lte: new Date(cursor) } } : {})
            },
            orderBy: {
                created: ORDER_BY_DESC
            },
            select: messageSelection,
            take: limit + 1
        });

        let nextCursor: string | undefined;

        if (messages.length > limit) {
            const nextItem = messages.pop();
            nextCursor = nextItem?.created.toISOString();
        } else {
            nextCursor = undefined;
        }

        const messagesToReturn = messages.map(message => mapMessageToMessageDto(message));

        return { messages: messagesToReturn, nextCursor }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Deletes a message for the authenticated user. If the user is an admin, the message is permanently deleted.
 * Otherwise, it is marked as deleted for the user.
 * 
 * @param messageId - The ID of the message to delete.
 * @param isOutbox - Indicates if the message is in the outbox.
 * @throws An error if the database query fails.
 */
export async function deleteMessage(messageId: string, isOutbox?: boolean) {
    const selector = isOutbox ? SENDER_DELETED : RECIPIENT_DELETED;

    try {
        const userId = await getAuthUserId();
        const role = await getUserRole();

        if (role === USER_ROLE_ADMIN) {
            await performAdminAction(
                "deleted_reported_message",
                messageId,
                "message",
                ADMIN_APPROVE_MESSAGE
            );

            await prisma.message.delete({
                where: {
                    id: messageId
                }
            });
        } else {
            await prisma.message.update({
                where: {
                    id: messageId
                },
                data: {
                    [selector]: true
                }
            });

            const messagesToDelete = await prisma.message.findMany({
                where: {
                    OR: [
                        {
                            senderId: userId,
                            senderDeleted: true,
                            recipientDeleted: true
                        },
                        {
                            recipientId: userId,
                            senderDeleted: true,
                            recipientDeleted: true
                        }
                    ]
                }
            });

            if (messagesToDelete.length > 0) {
                await prisma.message.deleteMany({
                    where: {
                        OR: messagesToDelete.map(m => ({ id: m.id }))
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Retrieves the count of unread messages for the authenticated user.
 * 
 * @returns The count of unread messages.
 * @throws An error if the database query fails.
 */
export async function getUnreadMessageCount() {
    try {
        const userId = await getAuthUserId();

        return prisma.message.count({
            where: {
                recipientId: userId,
                dateRead: null,
                recipientDeleted: false
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Reports a message as abusive.
 * 
 * @param messageId - The ID of the message to report.
 * @returns The updated message with the abuse flag set.
 * @throws An error if the database query fails.
 */
export async function reportMessage(messageId: string) {
    try {
        const userId = await getAuthUserId();

        return prisma.message.update({
            where: {
                id: messageId
            },
            data: {
                isAbuse: true
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const messageSelection = {
    id: true,
    text: true,
    created: true,
    dateRead: true,
    isAbuse: true,
    sender: {
        select: {
            userId: true,
            name: true,
            image: true
        }
    },
    recipient: {
        select: {
            userId: true,
            name: true,
            image: true
        }
    }
}
