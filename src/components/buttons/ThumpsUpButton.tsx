"use client";

import { declineReportedMessage } from "@/app/actions/adminActions";
import { ThumbsUpButtonProps } from "@/types/thumbsUpButtonProps";
import { Button } from "@nextui-org/react";
import { FaRegThumbsUp } from "react-icons/fa";

export default function ThumpsUpButton({ message }: ThumbsUpButtonProps) {
    return (
        <Button
            color="success"
            onClick={() => declineReportedMessage(message)}
        >
            <FaRegThumbsUp color="success" size={20} />
        </Button>
    )
}