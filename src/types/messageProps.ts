import { MessageDto } from "@/types";

export type MessageBoxProps = {
    message: MessageDto;
    currentUserId: string;
}

export type MessageListProps = {
    initialMessages: { messages: MessageDto[], readCount: number };
    currentUserId: string;
    chatId: string;
}

export type MessageTableCellProps = {
    item: MessageDto;
    columnKey: string;
    isOutbox: boolean;
    deleteMessage: (message: MessageDto) => void;
    isDeleting: boolean;
    isReporting: boolean;
    reportMessage: (message: MessageDto) => void;
}

export type MessageTableProps = {
    initialMessages: MessageDto[];
    nextCursor?: string;
}