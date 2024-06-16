"use client";

import { UploadImageButtonProps } from "@/types/uploadImageButtonProps";
import { CldUploadButton } from "next-cloudinary";
import { MdAddPhotoAlternate } from "react-icons/md";

export default function UploadImageButton({ onUploadImage }: UploadImageButtonProps) {
    return (
        <CldUploadButton
            options={{ maxFiles: 1 }}
            onSuccess={onUploadImage}
            signatureEndpoint="/api/sign-image"
            uploadPreset="heartboundPreset"
            className="flex items-center gap-2 border-2 border-secondary text-secondary rounded-xl py-2 px-4 hover:bg-secondary/5"
        >
            <MdAddPhotoAlternate size={30} />
            Upload image
        </CldUploadButton>
    )
}