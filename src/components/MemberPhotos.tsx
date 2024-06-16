"use client";

import { MemberPhotosProps } from "@/types/memberPhotosProps";
import DeleteButton from "./DeleteButton";
import MemberImage from "./MemberImage";
import StarButton from "./StarButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Photo } from "@prisma/client";
import { setMainImage } from "@/app/actions/userActions";

export default function MemberPhotos({ photos, editing, mainImageUrl }: MemberPhotosProps) {
    const router = useRouter();
    const [loading, setLoading] = useState({
        type: "",
        isLoading: false,
        id: ""
    });
    const onSetMain = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null;

        setLoading({
            isLoading: true,
            id: photo.id,
            type: "main"
        });

        await setMainImage(photo);
        router.refresh();

        setLoading({
            isLoading: false,
            id: photo.id,
            type: "main"
        });
    }

    return (
        <div className="grid grid-cols-5 gap-3 p-5">
            {photos && photos.map(photo => (
                <div key={photo.id} className="relative">
                    <MemberImage photo={photo} />
                    {editing && (
                        <>
                            <div onClick={() => onSetMain(photo)} className="absolute top-3 left-3 z-50">
                                <StarButton
                                    selected={photo.url === mainImageUrl}
                                    loading={loading.isLoading && loading.type === "main" && loading.id === photo.id}
                                />
                            </div>
                            <div className="absolute top-3 right-3 z-50">
                                <DeleteButton loading={false} />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}