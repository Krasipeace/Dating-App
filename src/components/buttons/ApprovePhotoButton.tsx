"use client";

import { Button } from "@nextui-org/react";
import { TbPhotoCheck } from "react-icons/tb";
import { toast } from "react-toastify";
import { approvePhoto } from "@/app/actions/adminActions";
import { useRouter } from "next/navigation";
import { ApprovePhotoProps } from "@/types/buttonProps";


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
        <Button
            onClick={approve}
            color="success"
            variant="light"
            fullWidth
        >
            <TbPhotoCheck size={20} />
        </Button>
    );
}
