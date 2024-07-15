"use client";

import MessageBox from "./MessageBox"
import { useCallback, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { dateTimeFormatHandler } from "@/lib/utilities";
import useMessageStore from "@/hooks/useMessageStore";
import { MessageListProps } from "@/types/messageProps";
import { Channel } from "pusher-js";

export default function MessageList({ initialMessages, currentUserId, chatId }: MessageListProps) {
    const setReadCount = useRef(false);
    const channel = useRef<Channel | null>(null);
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
        if (!channel.current) {
            channel.current = pusherClient.subscribe(chatId);
            channel.current.bind("message:new", handleNewMessage);
            channel.current.bind("message:read", handleReadMessages);

        }

        return () => {
            if (channel.current && channel.current.subscribed) {
                channel.current.unsubscribe();
                channel.current.unbind("message:new", handleNewMessage);
                channel.current.unbind("message:read", handleReadMessages);
            }
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