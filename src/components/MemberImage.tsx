"use client";

import { CldImage } from "next-cloudinary";
import { Image, useDisclosure } from "@nextui-org/react";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import { MemberImageProps } from "@/types/memberProps";
import ApproveButton from "./buttons/ApprovePhotoButton";
import RejectButton from "./buttons/RejectPhotoButton";

/**
 * MemberImage component
 * @param {MemberImageProps} { photo }
 * @returns {JSX.Element} MemberImage component
 * @description MemberImage component to display a member image
 * @example
 *   <MemberImage photo={photo} />
 * @see MemberImageProps
 */
export default function MemberImage({ photo }: MemberImageProps) {
    const role = useRole();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!photo) return null;

    return (
        <div className="cursor-pointer" onClick={onOpen}>
            {photo?.publicId ? (
                <CldImage
                    alt="User Image"
                    src={photo.publicId}
                    width={300}
                    height={300}
                    crop="fill"
                    gravity="faces"
                    className={`${!photo.isApproved && role !== "ADMIN" ? "opacity-50 rounded-2xl" : "rounded-2xl"}`}
                    priority
                />
            ) : (
                <Image
                    width={300}
                    height={300}
                    src={photo?.url || "/images/user.png"}
                    alt="User Image"
                />
            )}
            {!photo?.isApproved && role !== "ADMIN" && (
                <div className="absolute bottom-2 w-full bg-slate-200 p-1">
                    <div className="flex justify-center text-warning-600 font-semibold">
                        Awaiting approval...
                    </div>
                </div>
            )}
            {role === "ADMIN" && (
                <div className="flex flex-row gap-2 mt-2">
                    <ApproveButton photoId={photo.id} />
                    <RejectButton photo={photo} />
                </div>
            )}
            <ModalWrapper
                image={true}
                isOpen={isOpen}
                onClose={onClose}
                body={
                    <>
                        {photo?.publicId ? (
                            <CldImage
                                alt="User Image"
                                src={photo.publicId}
                                width={600}
                                height={600}
                                className={`${!photo.isApproved && role !== "ADMIN" ? "opacity-50 rounded-2xl" : "rounded-2xl"}`}
                                priority
                            />
                        ) : (
                            <Image
                                width={600}
                                height={600}
                                src={photo?.url || "/images/user.png"}
                                alt="User Image"
                            />
                        )}
                    </>
                }
            />
        </div>
    )
}