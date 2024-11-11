"use client";

import { Button } from "@nextui-org/react";
import { TbPhotoCancel } from "react-icons/tb";
import { toast } from "react-toastify";
import { rejectPhoto } from "@/app/actions/adminActions";
import { useRouter } from "next/navigation";
import { RejectButtonProps } from "@/types/buttonProps";

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
        <Button
            onClick={reject}
            color="danger"
            variant="light"
            fullWidth
        >
            <TbPhotoCancel size={20} />
        </Button>
    );
}
