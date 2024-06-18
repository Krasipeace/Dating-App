"use client";

import { transformImageUrl } from "@/lib/utilities";
import { MessageBoxProps } from "@/types/messageBoxProps";
import { Avatar } from "@nextui-org/react";
import { useEffect, useRef } from "react";

export default function MessageBox({ message, currentUserId }: MessageBoxProps) {
    const isCurrentUserSender = message.senderId === currentUserId;
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageEndRef.current) messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messageEndRef])


    const getUserAvatar = () => (
        <Avatar
            name={message.senderName}
            className="self-end"
            src={transformImageUrl(message.senderImage) || "/images/user.png"}
        />
    )

    const getMessageContent = () => {
        return <div className={`${isCurrentUserSender
            ? "flex flex-col w-[50%] px-2 py-1 rounded-l-xl rounded-tr-xl text-white bg-pink-50"
            : "flex flex-col w-[50%] px-2 py-1 rounded-r-xl rounded-tl-xl border-gray-200 bg-purple-50"}`}>
            {getMessageHeader()}
            <p className="text-sm py-3 text-gray-900">
                {message.text}
            </p>
        </div>
    }

    const getMessageHeader = () => (
        <div className={`${isCurrentUserSender ? "flex items-center w-full justify-between" : "flex items-center w-full"}`}>
            {message.dateRead && message.recipientId !== currentUserId ? (
                <span className="text-xs text-black text-italic">
                    (read 2 mins ago)
                </span>
            ) : <div></div>}
            <div className="flex">
                <span className="text-sm font-semibold text-gray-900">
                    {message.senderName}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                    {message.created}
                </span>
            </div>
        </div>
    )

    return (
        <div className="grid grid-rows-1">
            <div className={`${isCurrentUserSender ? "flex gap-2 mb-3 justify-end text-right" : "flex gap-2 mb-3 justify-start text-left"}`}>
                {!isCurrentUserSender && getUserAvatar()}
                {getMessageContent()}
                {isCurrentUserSender && getUserAvatar()}
            </div>
            <div ref={messageEndRef} />
        </div>
    )
}