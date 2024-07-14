import { MessageDto } from "@/types";
import { Message } from "@prisma/client";

export type MessageTableProps = {
    initialMessages: MessageDto[];
    nextCursor?: string;
}