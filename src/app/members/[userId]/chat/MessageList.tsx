"use client";

import MessageBox from "./MessageBox"
import { useCallback, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { dateTimeFormatHandler } from "@/lib/utilities";
import useMessageStore from "@/hooks/useMessageStore";
import { MessageListProps } from "@/types/messageProps";

export default function MessageList({ initialMessages, currentUserId, chatId }: MessageListProps) {
    const setReadCount = useRef(false);
    const [messages, setMessages] = useState(initialMessages.messages);
    const { updateUnreadCount } = useMessageStore(state => ({
        updateUnreadCount: state.updateUnreadCount
    }));

    useEffect(() => {
        if (!setReadCount.current) {
            updateUnreadCount(-initialMessages.readCount);
            setReadCount.current = true;
        }
    }, [initialMessages.readCount, updateUnreadCount]);

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages(prevState => {
            return [...prevState, message]
        })
    }, []);

    const handleReadMessages = useCallback((messageIds: string[]) => {
        setMessages(prevState => prevState.map(m => messageIds.includes(m.id)
            ? { ...m, dateRead: dateTimeFormatHandler(new Date()) }
            : m
        ))
    }, []);

    useEffect(() => {
        const channel = pusherClient.subscribe(chatId);

        channel.bind("message:new", handleNewMessage);
        channel.bind("message:read", handleReadMessages);

        return () => {
            channel.unsubscribe();
            channel.unbind("message:new", handleNewMessage);
            channel.unbind("message:read", handleReadMessages);
        }

    }, [chatId, handleNewMessage, handleReadMessages]);

    return (
        <div>
            {messages.length === 0 ? "No messages yet" : (
                <div>
                    {messages.map(m =>
                    (
                        <MessageBox key={m.id} message={m} currentUserId={currentUserId} />
                    ))}
                </div>
            )}
        </div>
    )
}