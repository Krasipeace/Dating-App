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
                    className="rounded-xl"
                />
            ) : (
                <Image
                    width={220}
                    height={220}
                    src={photo?.url || "/images/user.png"}
                    alt="User Image"
                />
            )}
        </div>
    )
}