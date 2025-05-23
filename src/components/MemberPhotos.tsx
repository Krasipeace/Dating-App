"use client";

import DeleteButton from "./buttons/DeleteButton";
import MemberImage from "./MemberImage";
import StarButton from "./buttons/StarButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Photo } from "@prisma/client";
import { removeImage, setMainImage } from "@/app/actions/userActions";
import { toast } from "react-toastify";
import { MemberPhotosProps } from "@/types/memberProps";

/**
 * MemberPhotos component
 * @param {MemberPhotosProps} { photos, editing, mainImageUrl }
 * @returns {JSX.Element} MemberPhotos component
 * @description MemberPhotos component to display member photos
 * @example
 *   <MemberPhotos photos={photos} editing={editing} mainImageUrl={mainImageUrl} />
 * @see MemberPhotosProps
 */
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
        try {
            router.refresh();
            await setMainImage(photo);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading({
                isLoading: false,
                id: photo.id,
                type: "main"
            });
        }
    }

    const onDelete = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null;

        setLoading({
            isLoading: true,
            id: photo.id,
            type: "delete"
        });

        await removeImage(photo);
        router.refresh();

        setLoading({
            isLoading: false,
            id: "",
            type: ""
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
                            <div onClick={() => onDelete(photo)} className="absolute top-3 right-3 z-50">
                                <DeleteButton
                                    loading={loading.isLoading && loading.type === "delete" && loading.id === photo.id}
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}