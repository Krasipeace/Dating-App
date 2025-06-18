"use client";

import { Button, Tooltip } from "@heroui/react";
import { TbPhotoCheck } from "react-icons/tb";
import { toast } from "react-toastify";
import { approvePhoto } from "@/app/actions/adminActions";
import { useRouter } from "next/navigation";
import { ApprovePhotoProps } from "@/types/buttonProps";

/**
 * ApproveButton component
 * @param {ApprovePhotoProps} { photoId }
 * @returns {JSX.Element} ApproveButton component
 * @description ApproveButton component to approve a photo
 * @example
 *   <ApproveButton photoId={photoId} />
 * @see ApprovePhotoProps
 */
export default function ApproveButton({ photoId }: ApprovePhotoProps) {
    const router = useRouter();

    const approve = async () => {
        try {
            await approvePhoto(photoId);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <Tooltip content="Approve photo" placement="top" aria-live="polite">
            <Button
                onClick={approve}
                color="success"
                variant="light"
                fullWidth
                aria-label="Approve photo button"
            >
                <TbPhotoCheck size={20} aria-hidden="true" />
            </Button>
        </Tooltip>
    );
}
