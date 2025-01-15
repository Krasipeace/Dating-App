import { dateTimeFormatHandler } from "./utilities";
import { MessageWithSenderRecipient } from "@/types";

/**
 * Maps a message object to a message data transfer object.
 * @param {MessageWithSenderRecipient} message - The message object to map.
 * @returns {MessageDto} The message data transfer object.
 * @example
 *   mapMessageToMessageDto(message);
 */
export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
    return {
        id: message.id,
        text: message.text,
        created: dateTimeFormatHandler(message.created),
        dateRead: message.dateRead ? dateTimeFormatHandler(message.dateRead) : null,
        isAbuse: message.isAbuse,
        senderId: message.sender?.userId,
        senderName: message.sender?.name,
        senderImage: message.sender?.image,
        recipientId: message.recipient?.userId,
        recipientName: message.recipient?.name,
        recipientImage: message.recipient?.image,
    }
}