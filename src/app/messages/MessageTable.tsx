"use client";

import { MessageDto } from "@/types";
import { MessageTableProps } from "@/types/messageTableProps";
import { Avatar, Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation"
import { Key, useCallback, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteMessage } from "../actions/messageActions";
import { longMessageHandler } from "@/lib/utilities";
import PresenceAvatar from "@/components/PresenceAvatar";

export default function MessageTable({ messages }: MessageTableProps) {
    const searchParams = useSearchParams();
    const isOutbox = searchParams.get("container") === "outbox";
    const router = useRouter();
    const [isDeleting, setDeleting] = useState({ id: "", loading: false });

    const cols = [
        { key: isOutbox ? "recipientName" : "senderName", label: isOutbox ? "Recipient" : "Sender" },
        { key: "text", label: "Message" },
        { key: "created", label: isOutbox ? "Date sent" : "Date received" },
        { key: "actions", label: "Actions" }
    ];

    const handleRowSelection = (key: Key) => {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(url + "/chat");
    }

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setDeleting({ id: message.id, loading: true });
        await deleteMessage(message.id, isOutbox);
        router.refresh();
        setDeleting({ id: "", loading: false });
    }, [isOutbox, router]);

    const getCell = useCallback((item: MessageDto, columnKey: keyof MessageDto) => {
        const cellValue = item[columnKey];

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
                        onClick={() => handleDeleteMessage(item)} isLoading={isDeleting.id === item.id && isDeleting.loading}
                    >
                        <TiDeleteOutline size={20} className="text-danger" />
                    </Button>
                )
        }
    }, [isOutbox, isDeleting.id, isDeleting.loading, handleDeleteMessage]);

    return (
        <Card className="flex flex-col gap-3 h-[70vh] overflow-auto">
            <Table
                aria-label="Table with messages"
                selectionMode="single"
                onRowAction={(key) => handleRowSelection(key)}
                shadow="none"
            >
                <TableHeader columns={cols}>
                    {(col) => <TableColumn key={col.key} width={col.key === "text" ? "50%" : undefined}>{col.label}</TableColumn>}
                </TableHeader>
                <TableBody items={messages} emptyContent="No messages yet">
                    {(item) => (
                        <TableRow key={item.id} className="cursor-pointer">
                            {(columnKey) => (
                                <TableCell className={`${!item.dateRead && !isOutbox ? "font-semibold" : ""}`}>
                                    {getCell(item, columnKey as keyof MessageDto)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}