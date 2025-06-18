"use client";

import { declineReportedMessage } from "@/app/actions/adminActions";
import { ThumbsButtonProps } from "@/types/buttonProps";
import { Button, Tooltip } from "@heroui/react";
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
        <Tooltip content="Let message stay" placement="top" aria-live="polite">
            <Button
                color="success"
                onPress={() => declineReportedMessage(messageId)}
                aria-label="Approve message button"
            >
                <FaRegThumbsUp color="success" size={20} aria-hidden="true" />
            </Button>
        </Tooltip>
    )
}