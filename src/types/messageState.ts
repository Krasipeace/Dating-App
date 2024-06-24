import { MessageDto } from "@/types"

export type MessageState = {
    messages: MessageDto[];
    add: (message: MessageDto) => void;
    remove: (id: string) => void;
    set: (message: MessageDto[]) => void;
    unreadCount: number;
    updateUnreadCount: (amount: number) => void;
}