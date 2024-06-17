"use client";

import { addImage } from "@/app/actions/userActions";
import UploadImageButton from "@/components/UploadImageButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MemberPhotoUpload() {
    const router = useRouter();
    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === "object") {
            await addImage(result.info.secure_url, result.info.public_id);
            toast.success("Image uploaded");
            router.refresh();
        } else {
            toast.error("Problem occurred! Image has not been uploaded");
        }
    }

    return (
        <div>
            <UploadImageButton onUploadImage={onAddImage} />
        </div>
    )
}