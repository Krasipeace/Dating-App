"use client";

import { MessageTableProps } from "@/types/messageTableProps";
import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MessageTableCell from "./MessageTableCell";
import { useMessages } from "@/hooks/useMessages";

export default function MessageTable({ initialMessages, nextCursor }: MessageTableProps) {
    const { columns, isOutbox, isDeleting, deleteMessage, selectRow, messages, loadMoreMessages, loadingMoreMessages, hasMoreMessages } = useMessages(initialMessages, nextCursor);

    return (
        <div className="flex flex-col h-[70vh]">
            <Card>
                <Table
                    aria-label="Table with messages"
                    selectionMode="single"
                    onRowAction={(key) => selectRow(key)}
                    shadow="none"
                    className="flex flex-col gap-3 h-[70vh] overflow-auto"
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
                                            isOutbox={isOutbox}
                                            deleteMessage={deleteMessage}
                                            isDeleting={isDeleting.loading && isDeleting.id === item.id}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="sticky bottom-0 pb-3 mr-3 text-right">
                    <Button
                        color="secondary"
                        isLoading={loadingMoreMessages}
                        isDisabled={!hasMoreMessages}
                        onClick={loadMoreMessages}
                    >
                        {hasMoreMessages ? "Load more messages" : "No more messages"}
                    </Button>
                </div>
            </Card>
        </div>
    )
}