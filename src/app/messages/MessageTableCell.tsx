import ModalWrapper from "@/components/ModalWrapper";
import PresenceAvatar from "@/components/PresenceAvatar";
import { longMessageHandler } from "@/lib/utilities";
import { MessageDto } from "@/types";
import { MessageTableCellProps } from "@/types/messageProps";
import { Button, useDisclosure } from "@heroui/react";
import { MdReportGmailerrorred } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

export default function MessageTableCell({ item, columnKey, isOutbox, deleteMessage, isDeleting, isReporting, reportMessage }: MessageTableCellProps) {
    const cellValue = item[columnKey as keyof MessageDto];

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const onConfirmDeleteMessage = () => {
        deleteMessage(item);
    }
    const deleteMsgFooter: any = [
        { onClick: onConfirmDeleteMessage, children: "Yes", color: "success" },
        { onClick: onDeleteClose, children: "No", color: "danger" },
    ];

    const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
    const onConfirmReportMessage = () => {
        reportMessage(item);
    }
    const reportMsgFooter: any = [
        { onClick: onConfirmReportMessage, children: "Yes", color: "success" },
        { onClick: onReportClose, children: "No", color: "danger" }
    ];

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
            return <div>{cellValue}</div>
        default:
            return (
                <>
                    <>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={() => onDeleteOpen()}
                            isLoading={isDeleting}
                            aria-label="Delete this message"
                        >
                            <TiDeleteOutline size={20} className="text-danger" />
                        </Button>
                        <ModalWrapper
                            isOpen={isDeleteOpen}
                            onClose={onDeleteClose}
                            header="Delete Message"
                            body={<div>Are you sure you want to delete this message?</div>}
                            footer={deleteMsgFooter}
                            aria-label="Confirmation to delete this message"
                        />
                    </>
                    <>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={() => onReportOpen()}
                            isLoading={isReporting}
                            aria-label="Report this message"
                        >
                            <MdReportGmailerrorred size={20} className="text-warning" />
                        </Button>
                        <ModalWrapper
                            isOpen={isReportOpen}
                            onClose={onReportClose}
                            header="Report Message"
                            body={<div>Are you sure you want to report this message?</div>}
                            footer={reportMsgFooter}
                            aria-label="Confirmation to report this message"
                        />
                    </>
                </>
            )
    }
}