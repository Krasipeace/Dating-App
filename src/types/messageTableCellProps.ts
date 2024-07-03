import { MessageDto } from "@/types"

export type MessageTableCellProps = {
    item: MessageDto;
    columnKey: string;
    isOutbox: boolean;
    deleteMessage: (message: MessageDto) => void;
    isDeleting: boolean;
    isReporting: boolean;
    reportMessage: (message: MessageDto) => void;
}