"use client";

import { MessageTableProps } from "@/types/messageTableProps";
import { Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation"
import { Key } from "react";

export default function MessageTable({ messages }: MessageTableProps) {
    const searchParams = useSearchParams();
    const isOutbox = searchParams.get("container") === "outbox";
    const router = useRouter();

    const cols = [
        { key: isOutbox ? "recipientName" : "senderName", label: isOutbox ? "Recipient" : "Sender" },
        { key: "text", label: "Message" },
        { key: "created", label: isOutbox ? "Date sent" : "Date received" }
    ];

    const handleRowSelection = (key: Key) => {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(url + "/chat");
    }

    return (
        <Card className="flex flex-col gap-3 h-[70vh] overflow-auto">
            <Table
                aria-label="Table with messages"
                selectionMode="single"
                onRowAction={(key) => handleRowSelection(key)}
                shadow="none"
            >
                <TableHeader columns={cols}>
                    {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
                </TableHeader>
                <TableBody items={messages} emptyContent="No messages yet">
                    {(item) => (
                        <TableRow key={item.id} className="cursor-pointer">
                            {(columnKey) => (
                                <TableCell>
                                    <div className={`${!item.dateRead && !isOutbox ? "font-semibold" : ""}`}>
                                        {getKeyValue(item, columnKey)}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}