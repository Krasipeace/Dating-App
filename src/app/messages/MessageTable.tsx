"use client";

import { MessageTableProps } from "@/types/messageTableProps";
import { Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MessageTableCell from "./MessageTableCell";
import { useMessages } from "@/hooks/useMessages";

export default function MessageTable({ messages }: MessageTableProps) {
    const { columns, isOutbox, isDeleting, deleteMessage, selectRow } = useMessages(messages);

    return (
        <Card className="flex flex-col gap-3 h-[70vh] overflow-auto">
            <Table
                aria-label="Table with messages"
                selectionMode="single"
                onRowAction={(key) => selectRow(key)}
                shadow="none"
            >
                <TableHeader columns={columns}>
                    {(col) => <TableColumn key={col.key} width={col.key === "text" ? "50%" : undefined}>{col.label}</TableColumn>}
                </TableHeader>
                <TableBody items={messages} emptyContent="No messages yet">
                    {(item) => (
                        <TableRow key={item.id} className="cursor-pointer">
                            {(columnKey) => (
                                <TableCell className={`${!item.dateRead && !isOutbox ? "font-semibold" : ""}`}>
                                    <MessageTableCell
                                        item={item}
                                        columnKey={columnKey as string}
                                        deleteMessage={deleteMessage}
                                        isDeleting={isDeleting.loading && isDeleting.id === item.id}
                                        isOutbox={isOutbox}
                                    />
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}