import PresenceAvatar from "@/components/PresenceAvatar";
import { longMessageHandler } from "@/lib/utilities";
import { MessageDto } from "@/types";
import { MessageTableCellProps } from "@/types/messageTableCellProps";
import { Button } from "@nextui-org/react";
import { TiDeleteOutline } from "react-icons/ti";

export default function MessageTableCell({ item, columnKey, isOutbox, deleteMessage, isDeleting }: MessageTableCellProps) {
    const cellValue = item[columnKey as keyof MessageDto];

    switch (columnKey) {
        case "recipientName":
        case "senderName":
            return (
                <div className="flex items-center gap-2 cursor-pointer">
                    <PresenceAvatar
                        userId={isOutbox ? item.recipientId : item.senderId}
                        source={isOutbox ? item.recipientImage : item.senderImage}
                    />
                    <span>{cellValue}</span>
                </div>
            )
        case "text":
            return (
                <div>
                    {longMessageHandler(cellValue, 70)}
                </div>
            )
        case "created":
            return cellValue
        default:
            return (
                <Button
                    isIconOnly
                    variant="light"
                    onClick={() => deleteMessage(item)} isLoading={isDeleting}
                >
                    <TiDeleteOutline size={20} className="text-danger" />
                </Button>
            )
    }
}