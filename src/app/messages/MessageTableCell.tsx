import ModalWrapper from "@/components/ModalWrapper";
import PresenceAvatar from "@/components/PresenceAvatar";
import { longMessageHandler } from "@/lib/utilities";
import { MessageDto } from "@/types";
import { MessageTableCellProps } from "@/types/messageProps";
import { Button, useDisclosure } from "@nextui-org/react";
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
                            onClick={() => onDeleteOpen()}
                            isLoading={isDeleting}
                        >
                            <TiDeleteOutline size={20} className="text-danger" />
                        </Button>
                        <ModalWrapper
                            isOpen={isDeleteOpen}
                            onClose={onDeleteClose}
                            header="Delete Message"
                            body={<div>Are you sure you want to delete this message?</div>}
                            footer={deleteMsgFooter}
                        />
                    </>
                    <>
                        <Button
                            isIconOnly
                            variant="light"
                            onClick={() => onReportOpen()}
                            isLoading={isReporting}
                        >
                            <MdReportGmailerrorred size={20} className="text-warning" />
                        </Button>
                        <ModalWrapper
                            isOpen={isReportOpen}
                            onClose={onReportClose}
                            header="Report Message"
                            body={<div>Are you sure you want to report this message?</div>}
                            footer={reportMsgFooter}
                        />
                    </>
                </>
            )
    }
}