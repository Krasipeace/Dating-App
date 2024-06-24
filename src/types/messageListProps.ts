import { MessageDto } from "@/types";

export type MessageListProps = {
    initialMessages: { messages: MessageDto[], readCount: number };
    currentUserId: string;
    chatId: string;
}