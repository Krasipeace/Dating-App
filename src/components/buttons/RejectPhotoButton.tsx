"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { TbPhotoCancel } from "react-icons/tb";
import { toast } from "react-toastify";
import { rejectPhoto } from "@/app/actions/adminActions";
import { useRouter } from "next/navigation";
import { RejectButtonProps } from "@/types/buttonProps";

/**
 * RejectButton component
 * @param {RejectButtonProps} { photo }
 * @returns {JSX.Element} RejectButton component
 * @description RejectButton component to reject a photo
 * @example
 *   <RejectButton photo={photo} />
 * @see RejectButtonProps
 */
export default function RejectButton({ photo }: RejectButtonProps) {
    const router = useRouter();

    const reject = async () => {
        try {
            await rejectPhoto(photo);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <Tooltip content="Reject photo" placement="top" aria-live="polite">
            <Button
                onClick={reject}
                color="danger"
                variant="light"
                fullWidth
                aria-label="Reject photo button"
            >
                <TbPhotoCancel size={20} aria-hidden="true" />
            </Button>
        </Tooltip>
    );
}
