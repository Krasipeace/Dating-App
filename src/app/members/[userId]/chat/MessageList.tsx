"use client";

import { MessageListProps } from "@/types/messageListProps"
import MessageBox from "./MessageBox"
import { useCallback, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { dateTimeFormatHandler } from "@/lib/utilities";
import { Channel } from "pusher-js";

export default function MessageList({ initialMessages, currentUserId, chatId }: MessageListProps) {
    const [messages, setMessages] = useState(initialMessages);
    const channelRef = useRef<Channel | null>(null);

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
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(chatId);
            channelRef.current.bind("message:new", handleNewMessage);
            channelRef.current.bind("messages:read", handleReadMessages);
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind("message:new", handleNewMessage);
                channelRef.current.unbind("messages:read", handleReadMessages);
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