"use client";

import { UploadImageButtonProps } from "@/types/buttonProps";
import { Tooltip } from "@nextui-org/react";
import { CldUploadButton } from "next-cloudinary";
import { MdAddPhotoAlternate } from "react-icons/md";

/**
 * UploadImageButton component
 * @param {UploadImageButtonProps} { onUploadImage }
 * @returns {JSX.Element} UploadImageButton component
 * @description UploadImageButton component to upload an image
 * @example
 *   <UploadImageButton onUploadImage={onUploadImage} />
 * @see UploadImageButtonProps
 */
export default function UploadImageButton({ onUploadImage }: UploadImageButtonProps) {
    return (
        <Tooltip content="Upload image" placement="top" aria-live="polite">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={onUploadImage}
                signatureEndpoint="/api/sign-image"
                uploadPreset="heartboundPreset"
                className="flex items-center gap-2 border-2 border-secondary text-secondary rounded-xl py-2 px-4 hover:bg-secondary/5"
                aria-label="Upload image button"
                data-testid="CldUploadButton"
            >
                <MdAddPhotoAlternate size={30} aria-hidden="true" />
                Upload image
            </CldUploadButton>
        </Tooltip>
    )
}