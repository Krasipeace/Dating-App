"use client";

import { MemberImageProps } from "@/types/memberImageProps";
import { CldImage } from "next-cloudinary";
import { Button, Image } from "@nextui-org/react";
import { useRole } from "@/hooks/useRole";
import { TbPhotoCancel, TbPhotoCheck } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { Photo } from "@prisma/client";

export default function MemberImage({ photo }: MemberImageProps) {
    const role = useRole();
    const router = useRouter();

    if (!photo) return null;

    const approve = async (photoId: string) => {
        try {
            await approvePhoto(photoId);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const reject = async (photo: Photo) => {
        try {
            await rejectPhoto(photo);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div>
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
                    <Button
                        onClick={() => approve(photo.id)}
                        color="success"
                        variant="light"
                        fullWidth
                    >
                        <TbPhotoCheck size={20} />
                    </Button>
                    <Button
                        onClick={() => reject(photo)}
                        color="danger"
                        variant="light"
                        fullWidth
                    >
                        <TbPhotoCancel size={20} />
                    </Button>
                </div>
            )}
        </div>
    )
}