"use client";

import { MemberImageProps } from "@/types/memberImageProps";
import { CldImage } from "next-cloudinary";
import { Image } from "@nextui-org/react";

export default function MemberImage({ photo }: MemberImageProps) {
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
                    className={`${!photo.isApproved}` ? "opacity-50 rounded-2xl" : "rounded-2xl"}
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
            {!photo?.isApproved && (
                <div className="absolute bottom-2 w-full bg-slate-200 p-1">
                    <div className="flex justify-center text-danger-600 font-semibold">
                        Awaiting approval...
                    </div>
                </div>
            )}
        </div>
    )
}