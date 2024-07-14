"use client";

import { deleteMessage } from "@/app/actions/messageActions";
import { ThumbsDownButtonProps } from "@/types/thumbsDownButtonProps";
import { Button } from "@nextui-org/react";
import { FaRegThumbsDown } from "react-icons/fa";

export default function ThumpsDownButton({ messageId }: ThumbsDownButtonProps) {
    return (
        <Button
            color="danger"
            onClick={() => deleteMessage(messageId)}
        >
            <FaRegThumbsDown color="success" size={20} />
        </Button>
    )
}