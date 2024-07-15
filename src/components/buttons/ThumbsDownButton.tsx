"use client";

import { deleteMessage } from "@/app/actions/messageActions";
import { ThumbsButtonProps } from "@/types/buttonProps";
import { Button } from "@nextui-org/react";
import { FaRegThumbsDown } from "react-icons/fa";

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