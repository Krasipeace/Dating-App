import { MessageDto } from "@/types";

export type MessageTableProps = {
    initialMessages: MessageDto[];
    nextCursor?: string;
}