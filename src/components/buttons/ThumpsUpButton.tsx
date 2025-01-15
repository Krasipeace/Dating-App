"use client";

import { declineReportedMessage } from "@/app/actions/adminActions";
import { ThumbsButtonProps } from "@/types/buttonProps";
import { Button } from "@nextui-org/react";
import { FaRegThumbsUp } from "react-icons/fa";

/**
 * ThumpsUpButton component
 * @param {ThumbsButtonProps} { messageId }
 * @returns {JSX.Element} ThumpsUpButton component
 * @description ThumpsUpButton component to display a thumbs up button
 * @example
 *   <ThumpsUpButton messageId={messageId} />
 * @see ThumbsButtonProps
 */
export default function ThumpsUpButton({ messageId }: ThumbsButtonProps) {
    return (
        <Button
            color="success"
            onClick={() => declineReportedMessage(messageId)}
        >
            <FaRegThumbsUp color="success" size={20} />
        </Button>
    )
}