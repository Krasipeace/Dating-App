"use client";

import { declineReportedMessage } from "@/app/actions/adminActions";
import { ThumbsButtonProps } from "@/types/buttonProps";
import { Button } from "@nextui-org/react";
import { FaRegThumbsUp } from "react-icons/fa";

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