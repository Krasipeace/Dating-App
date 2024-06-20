import { MessageDto } from "@/types";

export type MessageListProps = {
    initialMessages: MessageDto[];
    currentUserId: string;
    chatId: string;
}