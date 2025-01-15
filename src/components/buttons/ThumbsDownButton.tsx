"use client";

import { deleteMessage } from "@/app/actions/messageActions";
import { ThumbsButtonProps } from "@/types/buttonProps";
import { Button } from "@nextui-org/react";
import { FaRegThumbsDown } from "react-icons/fa";

/**
 * ThumpsDownButton component
 * @param {ThumbsButtonProps} { messageId }
 * @returns {JSX.Element} ThumpsDownButton component
 * @description ThumpsDownButton component to display a thumbs down button
 * @example
 *   <ThumpsDownButton messageId={messageId} />
 * @see ThumbsButtonProps
 */
export default function ThumpsDownButton({ messageId }: ThumbsButtonProps) {
    return (
        <Button
            color="danger"
            onClick={() => deleteMessage(messageId)}
        >
            <FaRegThumbsDown color="success" size={20} />
        </Button>
    )
}