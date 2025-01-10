"use client";

import { addImage } from "@/app/actions/userActions";
import UploadImageButton from "@/components/buttons/UploadImageButton";
import { IMAGE_NOT_UPLOADED_MESSAGE, IMAGE_UPLOADED_MESSAGE } from "@/constants/actionConstants";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MemberPhotoUpload() {
    const router = useRouter();
    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === "object") {
            await addImage(result.info.secure_url, result.info.public_id);
            toast.success(IMAGE_UPLOADED_MESSAGE);
            router.refresh();
        } else {
            toast.error(IMAGE_NOT_UPLOADED_MESSAGE);
        }
    }

    return (
        <div>
            <UploadImageButton onUploadImage={onAddImage} />
        </div>
    )
}